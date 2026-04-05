"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/app/components/container";
import { membersByCountry } from "@/lib/data/members";
import styles from "./page.module.css";

const ALL_CODE = "ALL";

/**
 * Encode each path segment so filenames with spaces, Unicode (e.g. İ, đ, ş),
 * and combining characters work in the browser and with next/image.
 */
function publicImageSrc(path) {
  if (!path || typeof path !== "string") return path;
  return `/${path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function MemberCard({ member, showCountry }) {
  const src = publicImageSrc(member.logo);

  return (
    <>
      <div className={styles.mop_card_logo}>
        <Image
          src={src}
          alt={member.name}
          width={200}
          height={120}
          className={styles.mop_card_img}
          sizes="(max-width: 768px) 50vw, 200px"
          unoptimized
        />
      </div>
      {showCountry && member.countryName ? (
        <p className={styles.mop_card_country}>{member.countryName}</p>
      ) : null}
      <h3 className={styles.mop_card_name}>{member.name}</h3>
      <p className={styles.mop_card_desc}>{member.description}</p>
      <p className={styles.mop_card_email}>
        <a href={`mailto:${member.email}`}>{member.email}</a>
      </p>
      <p className={styles.mop_card_web}>
        <Link
          href={member.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Website
        </Link>
      </p>
    </>
  );
}

export default function MemberOrganizationsView() {
  const [activeCode, setActiveCode] = useState(ALL_CODE);

  const activeCountry = useMemo(() => {
    if (activeCode === ALL_CODE) return null;
    return (
      membersByCountry.find((c) => c.countryCode === activeCode) ??
      membersByCountry[0]
    );
  }, [activeCode]);

  const members = activeCountry?.members ?? [];

  const membersSorted = useMemo(
    () =>
      [...members].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    [members],
  );

  const allMembersSorted = useMemo(() => {
    const flat = membersByCountry.flatMap((country) =>
      country.members.map((m) => ({
        ...m,
        countryName: country.countryName,
        countryCode: country.countryCode,
      })),
    );
    return flat.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
  }, []);

  return (
    <main className={styles.mop_page}>
      <Container>
        <header className={styles.mop_header}>
          <h1 className={styles.mop_title}>
            <span className={`title ${styles.mop_title_inner}`}>
              <span className="title-accent">Member Organizations</span>
            </span>
          </h1>
          <p className={styles.mop_intro}>
            ERA brings together LGBTI+ organizations across the region.{" "}
            <strong>All organizations</strong> lists everyone in alphabetical
            order; choose a country to see only that country&apos;s members.
          </p>
        </header>

        <div
          className={styles.mop_country_buttons}
          role="tablist"
          aria-label="Filter by country"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCode === ALL_CODE}
            className={
              activeCode === ALL_CODE
                ? `${styles.mop_country_btn} ${styles.mop_country_btn_active}`
                : styles.mop_country_btn
            }
            onClick={() => setActiveCode(ALL_CODE)}
          >
            All organizations
          </button>
          {membersByCountry.map((country) => (
            <button
              key={country.countryCode}
              type="button"
              role="tab"
              aria-selected={activeCode === country.countryCode}
              className={
                activeCode === country.countryCode
                  ? `${styles.mop_country_btn} ${styles.mop_country_btn_active}`
                  : styles.mop_country_btn
              }
              onClick={() => setActiveCode(country.countryCode)}
            >
              {country.countryName}
            </button>
          ))}
        </div>

        {activeCode === ALL_CODE ? (
          <section
            className={styles.mop_section}
            aria-labelledby="mop-all-heading"
          >
            <h2 id="mop-all-heading" className={styles.mop_section_title}>
              All organizations (A–Z)
            </h2>
            <ul className={`${styles.mop_grid} ${styles.mop_grid_all}`}>
              {allMembersSorted.map((member) => (
                <li key={member.id} className={styles.mop_card}>
                  <MemberCard member={member} showCountry />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section
            className={styles.mop_section}
            aria-labelledby="mop-country-heading"
          >
            <h2 id="mop-country-heading" className={styles.mop_section_title}>
              {activeCountry?.countryName}
            </h2>
            <ul className={`${styles.mop_grid} ${styles.mop_grid_all}`}>
              {membersSorted.map((member) => (
                <li key={member.id} className={styles.mop_card}>
                  <MemberCard member={member} showCountry={false} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </main>
  );
}
