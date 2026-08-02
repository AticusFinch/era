"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineHandshake, MdFavoriteBorder } from "react-icons/md";
import Button from "@/app/components/button";
import { encodePublicImagePath } from "@/lib/data/members";
import { donors, partners } from "@/lib/data/partners-and-donors";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const gridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const introParagraphs = [
  "Since ERA was founded, our work has grown through the support, trust and cooperation of many donors, institutions, partner organisations and allies.",
  "We are grateful to everyone who has contributed to ERA’s journey in different ways: by supporting projects, strengthening advocacy, enabling research and visibility, creating spaces for exchange and learning, or helping sustain regional movement-building through core-grant support.",
  "The organisations and institutions listed below have been part of this journey at different moments over the years. Their support has helped ERA connect communities, strengthen LGBTIQ+ organisations, and advance equality, human rights and social inclusion across the region.",
];

function LogoCard({ item }) {
  const src = encodePublicImagePath(item.photo);
  const content = (
    <>
      <span className={styles.pd_logo_frame}>
        <Image
          src={src}
          alt=""
          width={180}
          height={100}
          className={styles.pd_logo_img}
          sizes="(max-width: 600px) 40vw, 180px"
          unoptimized
        />
      </span>
      <span className={styles.pd_logo_name}>{item.name}</span>
    </>
  );

  if (item.website) {
    return (
      <a
        href={item.website}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.pd_logo_card}
        aria-label={`${item.name} (opens in a new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={styles.pd_logo_card} aria-label={item.name}>
      {content}
    </div>
  );
}

function LogoGrid({ items, label }) {
  return (
    <motion.ul
      className={styles.pd_grid}
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      aria-label={label}
    >
      {items.map((item) => (
        <motion.li key={item.name} variants={gridItem}>
          <LogoCard item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function PartnersAndDonorsView() {
  return (
    <main className={styles.pd_page}>
      <header className={styles.pd_hero}>
        <motion.div {...fadeUp}>
          <p className={styles.pd_kicker}>
            <MdOutlineHandshake aria-hidden />
            About ERA
          </p>
          <h1 className={styles.pd_title}>
            <span className="title-accent">Donors and Partners</span>
          </h1>
          <p className={styles.pd_subtitle}>
            With Gratitude for Support Since 2015
          </p>
          <div className={styles.pd_intro}>
            {introParagraphs.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>
        </motion.div>
      </header>

      <motion.section
        className={styles.pd_section}
        aria-labelledby="donors-heading"
        {...fadeUp}
      >
        <p className={styles.pd_section_kicker}>Support since 2015</p>
        <h2 id="donors-heading" className={styles.pd_section_title}>
          Donors
        </h2>
        <LogoGrid items={donors} label="ERA donors" />
      </motion.section>

      <motion.section
        className={styles.pd_section}
        aria-labelledby="partners-heading"
        {...fadeUp}
      >
        <p className={styles.pd_section_kicker}>Regional cooperation</p>
        <h2 id="partners-heading" className={styles.pd_section_title}>
          Partners
        </h2>
        <LogoGrid items={partners} label="ERA partners" />
      </motion.section>

      <motion.section className={styles.pd_cta} {...fadeUp}>
        <p className={styles.pd_cta_kicker}>
          <MdFavoriteBorder aria-hidden />
          Get involved
        </p>
        <h2 className={styles.pd_cta_title}>Be Part of ERA’s Ongoing Work</h2>
        <div className={styles.pd_cta_text}>
          <p>
            Every partnership and contribution helps strengthen regional
            solidarity, community-led action and the fight for LGBTIQ+ equality
            across the Western Balkans and Türkiye.
          </p>
          <p>
            If you share ERA’s commitment to equality, human rights and social
            justice, we invite you to connect with us, partner with us, or
            support our work.
          </p>
        </div>
        <div className={styles.pd_cta_actions}>
          <Button href="/get-involved/partner-with-us">Partner With Us</Button>
          <Button href="/donate">Donate</Button>
        </div>
      </motion.section>

      <motion.aside className={styles.pd_disclaimer} {...fadeUp}>
        <p>
          The inclusion of logos on this page reflects past or present support,
          partnership or cooperation with ERA since 2015. It does not
          necessarily indicate current funding, active partnership or
          endorsement of all ERA activities.
        </p>
        <p>
          For information about ERA’s current projects, donors and active
          support, please visit our current{" "}
          <Link href="/our-work/projects">Projects</Link> page.
        </p>
      </motion.aside>

      <motion.aside className={styles.pd_disclaimer_fine} {...fadeUp}>
        <h3 className={styles.pd_disclaimer_fine_title}>
          Help Us Keep This Page Updated
        </h3>
        <p>
          This page brings together organisations and institutions that have
          supported, partnered or cooperated with ERA at different moments
          since 2015.
        </p>
        <p>
          We make every effort to keep the information and logos displayed here
          accurate. However, we understand that organisational names, visual
          identities and partnerships may change over time.
        </p>
        <p>
          If you notice that a logo is outdated, missing, incorrectly displayed,
          or should be updated or removed, please{" "}
          <Link href="/contact">get in touch with us</Link>. We will gladly
          review and correct it.
        </p>
      </motion.aside>
    </main>
  );
}
