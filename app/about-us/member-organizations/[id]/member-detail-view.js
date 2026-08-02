"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBluesky,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaLink,
} from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineGroups, MdOutlineArrowForward } from "react-icons/md";
import {
  encodePublicImagePath,
  getMemberDescriptionParagraphs,
} from "@/lib/data/members";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const SOCIAL_LINKS = [
  { key: "website", Icon: FaGlobe, label: "Website" },
  { key: "facebook", Icon: FaFacebook, label: "Facebook" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram" },
  { key: "twitter", Icon: FaSquareXTwitter, label: "X" },
  { key: "linkedin", Icon: FaLinkedin, label: "LinkedIn" },
  { key: "bluesky", Icon: FaBluesky, label: "Bluesky" },
  { key: "youtube", Icon: FaYoutube, label: "YouTube" },
  { key: "tiktok", Icon: FaTiktok, label: "TikTok" },
  { key: "linktr", Icon: FaLink, label: "Linktree" },
];

function isPlaceholderWebsite(url) {
  if (!url || typeof url !== "string") return true;
  const trimmed = url.trim();
  if (!trimmed) return true;
  return (
    trimmed === "https://example.org" ||
    trimmed === "http://example.org" ||
    trimmed === "example.org"
  );
}

function normalizeWebsiteUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed || isPlaceholderWebsite(trimmed)) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function resolveWebsite(member) {
  const fromSocial = normalizeWebsiteUrl(member?.social?.website);
  if (fromSocial) return fromSocial;
  return normalizeWebsiteUrl(member?.website);
}

function displayWebsite(url) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function getSocialItems(member) {
  const social = member?.social && typeof member.social === "object" ? member.social : {};
  const website = resolveWebsite(member);
  const items = [];

  if (website) {
    items.push({
      key: "website",
      Icon: FaGlobe,
      label: "Website",
      href: website,
    });
  }

  for (const { key, Icon, label } of SOCIAL_LINKS) {
    if (key === "website") continue;
    const value = social[key];
    if (typeof value !== "string" || value.trim() === "") continue;
    items.push({ key, Icon, label, href: value.trim() });
  }

  return items;
}

export default function MemberDetailView({
  member,
  countryName,
  countryCode,
  relatedMembers = [],
}) {
  const src = encodePublicImagePath(member.logo);
  const paragraphs = getMemberDescriptionParagraphs(member.description);
  const website = resolveWebsite(member);
  const socialItems = getSocialItems(member);

  return (
    <main className={styles.mop_detail_page}>
      <motion.div {...fadeUp}>
        <Link
          href="/about-us/member-organizations"
          className={styles.mop_detail_back}
        >
          <IoIosArrowBack aria-hidden />
          Member organizations
        </Link>
      </motion.div>

      <article className={styles.mop_detail_layout}>
        <motion.aside className={styles.mop_detail_sidebar} {...fadeUp}>
          <div className={styles.mop_detail_logo}>
            <Image
              src={src}
              alt={member.name}
              width={320}
              height={200}
              className={styles.mop_detail_img}
              sizes="(max-width: 900px) 100vw, 22rem"
              unoptimized
              priority
            />
          </div>

          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mop_detail_primary}
            >
              <FaGlobe aria-hidden />
              Visit website
            </a>
          ) : null}

          {socialItems.length > 0 ? (
            <div className={styles.mop_detail_social_block}>
              <p className={styles.mop_detail_social_label}>Connect</p>
              <ul className={styles.mop_detail_social}>
                {socialItems.map(({ key, Icon, label, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mop_detail_social_link}
                    >
                      <span className={styles.mop_detail_social_icon} aria-hidden>
                        <Icon />
                      </span>
                      <span className={styles.mop_detail_social_text}>
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.aside>

        <motion.div className={styles.mop_detail_content} {...fadeUp}>
          <p className={styles.mop_detail_kicker}>
            <MdOutlineGroups aria-hidden />
            Member organization
          </p>
          <p className={styles.mop_detail_country}>{countryName}</p>
          <h1 className={styles.mop_detail_title}>{member.name}</h1>

          {website ? (
            <p className={styles.mop_detail_web_hint}>
              <FaGlobe aria-hidden />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {displayWebsite(website)}
              </a>
            </p>
          ) : null}

          <div className={styles.mop_detail_desc}>
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </article>

      {relatedMembers.length > 0 ? (
        <motion.section
          className={styles.mop_detail_related}
          aria-labelledby="related-members-heading"
          {...fadeUp}
        >
          <div className={styles.mop_detail_related_header}>
            <div>
              <p className={styles.mop_detail_related_kicker}>
                Also in {countryName}
              </p>
              <h2
                id="related-members-heading"
                className={styles.mop_detail_related_title}
              >
                Other member organizations
              </h2>
            </div>
            <Link
              href="/about-us/member-organizations"
              className={styles.mop_detail_related_all}
            >
              View all
              <MdOutlineArrowForward aria-hidden />
            </Link>
          </div>

          <ul className={styles.mop_detail_related_grid}>
            {relatedMembers.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/about-us/member-organizations/${related.id}`}
                  className={styles.mop_detail_related_card}
                >
                  <span className={styles.mop_detail_related_logo}>
                    <Image
                      src={encodePublicImagePath(related.logo)}
                      alt=""
                      width={120}
                      height={72}
                      className={styles.mop_detail_related_img}
                      sizes="120px"
                      unoptimized
                    />
                  </span>
                  <span className={styles.mop_detail_related_name}>
                    {related.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      ) : null}

      <motion.section className={styles.mop_detail_cta} {...fadeUp}>
        <p className={styles.mop_detail_cta_kicker}>ERA network</p>
        <h2 className={styles.mop_detail_cta_title}>
          Discover more of the regional movement
        </h2>
        <p className={styles.mop_detail_cta_text}>
          Explore member organizations across the Western Balkans and Türkiye,
          or get in touch with ERA about membership, partnerships, and regional
          cooperation.
        </p>
        <div className={styles.mop_detail_cta_actions}>
          <Link
            href="/about-us/member-organizations"
            className={styles.mop_detail_cta_btn}
          >
            All member organizations
          </Link>
          <Link href="/contact" className={styles.mop_detail_cta_btn_alt}>
            Contact ERA
          </Link>
        </div>
        {countryCode ? (
          <p className={styles.mop_detail_cta_note}>
            Currently viewing a member from {countryName} ({countryCode}).
          </p>
        ) : null}
      </motion.section>
    </main>
  );
}
