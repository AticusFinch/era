"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/app/components/container";
import { encodePublicImagePath, membersByCountry } from "@/lib/data/members";
import styles from "./page.module.css";
import {
  FaBluesky,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaChevronDown,
} from "react-icons/fa6";

import { IoMdArrowDropright } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const ALL_CODE = "ALL";

const SOCIAL_LINKS = [
  { key: "website", Icon: FaGlobe, label: "Website" },
  { key: "facebook", Icon: FaFacebook, label: "Facebook" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram" },
  { key: "twitter", Icon: FaSquareXTwitter, label: "X" },
  { key: "linkedin", Icon: FaLinkedin, label: "LinkedIn" },
  { key: "bluesky", Icon: FaBluesky, label: "Bluesky" },
  { key: "youtube", Icon: FaYoutube, label: "YouTube" },
  { key: "tiktok", Icon: FaTiktok, label: "TikTok" },
];

function MemberCardSocial({ social, orgName }) {
  if (!social || typeof social !== "object") return null;
  const items = SOCIAL_LINKS.filter(
    (c) => typeof social[c.key] === "string" && social[c.key].trim() !== "",
  );
  if (items.length === 0) return null;
  return (
    <div className={styles.mop_card_social}>
      {items.map(({ key, Icon, label }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mop_card_social_link}
          aria-label={`${orgName} on ${label}`}
        >
          <Icon aria-hidden />
        </a>
      ))}
    </div>
  );
}

function MemberCard({ member, showCountry }) {
  const src = encodePublicImagePath(member.logo);

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
      <div className={styles.mop_card_intro}>
        <p
          className={`${styles.mop_card_desc} ${styles.mop_card_desc_clamped}`}
        >
          {member.description}
        </p>
        <Link
          href={`/about-us/member-organizations/${member.id}`}
          className={styles.mop_card_read_more}
        >
          Read more
          <IoMdArrowDropright />
        </Link>
      </div>
      <MemberCardSocial social={member.social} orgName={member.name} />
    </>
  );
}

function MobileCountryFilter({ activeCode, setActiveCode }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const displayLabel = useMemo(() => {
    if (activeCode === ALL_CODE) return "All organizations";
    return (
      membersByCountry.find((c) => c.countryCode === activeCode)?.countryName ??
      "Country"
    );
  }, [activeCode]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (code) => {
    setActiveCode(code);
    setOpen(false);
  };

  return (
    <div className={styles.mop_country_mobile_wrap} ref={rootRef}>
      <span
        id="mop-country-filter-label"
        className={styles.mop_country_select_label}
      >
        Country
      </span>
      <button
        type="button"
        className={styles.mop_country_dropdown_trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="mop-country-dropdown-list"
        aria-labelledby="mop-country-filter-label mop-country-trigger-text"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          id="mop-country-trigger-text"
          className={styles.mop_country_dropdown_trigger_text}
        >
          {displayLabel}
        </span>
        <FaChevronDown
          className={`${styles.mop_country_dropdown_chevron} ${open ? styles.mop_country_dropdown_chevron_open : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id="mop-country-dropdown-list"
          role="listbox"
          aria-labelledby="mop-country-filter-label"
          className={styles.mop_country_dropdown_list}
        >
          <li role="none" className={styles.mop_country_dropdown_item}>
            <button
              type="button"
              role="option"
              aria-selected={activeCode === ALL_CODE}
              className={`${styles.mop_country_dropdown_option} ${activeCode === ALL_CODE ? styles.mop_country_dropdown_option_active : ""}`}
              onClick={() => choose(ALL_CODE)}
            >
              All organizations
            </button>
          </li>
          {membersByCountry.map((country) => (
            <li
              key={country.countryCode}
              role="none"
              className={styles.mop_country_dropdown_item}
            >
              <button
                type="button"
                role="option"
                aria-selected={activeCode === country.countryCode}
                className={`${styles.mop_country_dropdown_option} ${activeCode === country.countryCode ? styles.mop_country_dropdown_option_active : ""}`}
                onClick={() => choose(country.countryCode)}
              >
                {country.countryName}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function MemberOrganizationsView() {
  const [activeCode, setActiveCode] = useState(ALL_CODE);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePageSize = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setPageSize(isDesktop ? 12 : 8);
      setCurrentPage(1);
    };

    updatePageSize();
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", updatePageSize);
    return () => mediaQuery.removeEventListener("change", updatePageSize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCode, searchTerm]);

  const membersForGrid = useMemo(
    () => (activeCode === ALL_CODE ? allMembersSorted : membersSorted),
    [activeCode, allMembersSorted, membersSorted],
  );

  const membersMatched = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return membersForGrid;
    const fallbackCountry =
      activeCode !== ALL_CODE ? (activeCountry?.countryName ?? "") : "";
    return membersForGrid.filter((m) => {
      const name = (m.name ?? "").toLowerCase();
      const desc = (m.description ?? "").toLowerCase();
      const country = (m.countryName ?? fallbackCountry).toLowerCase();
      return name.includes(q) || desc.includes(q) || country.includes(q);
    });
  }, [membersForGrid, searchTerm, activeCode, activeCountry?.countryName]);

  const totalPages = useMemo(
    () =>
      pageSize > 0
        ? Math.max(1, Math.ceil(membersMatched.length / pageSize))
        : 1,
    [membersMatched.length, pageSize],
  );

  const paginatedMembers = useMemo(() => {
    if (pageSize <= 0) return membersMatched;
    const start = (currentPage - 1) * pageSize;
    return membersMatched.slice(start, start + pageSize);
  }, [membersMatched, currentPage, pageSize]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPaginationPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    const addPage = (p) => {
      if (!pages.includes(p)) pages.push(p);
    };
    addPage(1);
    addPage(totalPages);
    addPage(currentPage);
    addPage(currentPage - 1);
    addPage(currentPage + 1);
    return pages.filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  };

  const isAll = activeCode === ALL_CODE;
  const sectionHeadingId = isAll ? "mop-all-heading" : "mop-country-heading";
  const sectionTitle = isAll
    ? "All organizations (A–Z)"
    : (activeCountry?.countryName ?? "");

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

        <div className={styles.mop_country_filter}>
          <MobileCountryFilter
            activeCode={activeCode}
            setActiveCode={setActiveCode}
          />

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

          <div className={styles.mop_search}>
            <FiSearch className={styles.mop_search_icon} aria-hidden />
            <input
              type="search"
              className={styles.mop_search_input}
              placeholder="Search by organization name, description, or country…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search member organizations"
              autoComplete="off"
            />
          </div>
        </div>

        <section
          className={styles.mop_section}
          aria-labelledby={sectionHeadingId}
        >
          <h2 id={sectionHeadingId} className={styles.mop_section_title}>
            {sectionTitle}
          </h2>
          {membersMatched.length === 0 ? (
            <p className={styles.mop_empty} role="status">
              {membersForGrid.length === 0
                ? "No organizations to show."
                : "No organizations match your search. Try different words or clear the search."}
            </p>
          ) : (
            <ul className={styles.mop_grid}>
              {paginatedMembers.map((member) => (
                <li key={member.id} className={styles.mop_card}>
                  <MemberCard member={member} showCountry={isAll} />
                </li>
              ))}
            </ul>
          )}

          {membersMatched.length > 0 && totalPages > 1 && (
            <div
              className={styles.mop_pagination}
              role="navigation"
              aria-label="Member list pages"
            >
              <button
                type="button"
                className={styles.mop_pagination_button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className={styles.mop_pagination_pages}>
                {(() => {
                  const sequence = [];
                  const pages = getPaginationPages();
                  for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    const prev = pages[i - 1];
                    if (i > 0 && page - prev > 1) {
                      sequence.push(`ellipsis-${page}-${prev}`);
                    }
                    sequence.push(page);
                  }
                  return sequence.map((item) => {
                    if (
                      typeof item === "string" &&
                      item.startsWith("ellipsis-")
                    ) {
                      return (
                        <span
                          key={item}
                          className={styles.mop_pagination_ellipsis}
                        >
                          …
                        </span>
                      );
                    }
                    const page = item;
                    return (
                      <button
                        key={page}
                        type="button"
                        className={`${styles.mop_pagination_page} ${
                          page === currentPage
                            ? styles.mop_pagination_page_active
                            : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}
              </div>

              <button
                type="button"
                className={styles.mop_pagination_button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
