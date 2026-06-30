"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdOutlineGroups,
  MdPublic,
  MdOutlineSavings,
  MdOutlineHandshake,
  MdOutlinePolicy,
  MdOutlineCampaign,
  MdOutlineHub,
  MdOutlineVerified,
  MdOutlineArrowForward,
} from "react-icons/md";
import styles from "./page.module.css";

const intro =
  "ERA-LGBTI Equal Rights Association for the Western Balkans and Türkiye is a regional network of civil society organisations dedicated to advancing human rights, equality, and social justice for LGBTIQ people across the Western Balkans and Türkiye.";

const countries = [
  "Albania",
  "Bosnia and Herzegovina",
  "Kosovo",
  "Montenegro",
  "North Macedonia",
  "Serbia",
  "Türkiye",
];

const stats = [
  { value: "7", label: "Countries connected" },
  { value: "80+", label: "Member organisations" },
  { value: "Regional", label: "Coordinated action" },
  { value: "10+", label: "Years of impact" },
];

const sections = [
  {
    id: "regional-platform",
    index: "01",
    kicker: "Regional action",
    title: "A coordinated platform",
    icon: MdPublic,
    text: "Operating in a region marked by democratic fragility, uneven progress, and structural inequalities, ERA serves as a platform for coordinated regional action. We connect organisations from Albania, Bosnia and Herzegovina, Kosovo, Montenegro, North Macedonia, Serbia, and Türkiye, strengthening cooperation, aligning strategies, and enabling collective impact beyond national borders.",
    showCountries: true,
  },
  {
    id: "programmes",
    index: "02",
    kicker: "Resource mobilisation",
    title: "Regional programmes",
    icon: MdOutlineSavings,
    text: "A central pillar of ERA's work is the development and management of regional programmes designed to redistribute resources where they are most needed. We actively mobilise international funding, design multi-country initiatives, and channel financial and technical support to grassroots and emerging organisations that often lack direct access to funding mechanisms.",
  },
  {
    id: "empowerment",
    index: "03",
    kicker: "Capacity building",
    title: "Equal actors in the movement",
    icon: MdOutlineHandshake,
    text: "Through this model, ERA ensures that smaller, under-resourced organisations are not left behind, but are instead positioned as equal actors within the regional movement. We combine grant-making with capacity-building, mentorship, and strategic guidance while supporting our members not only to implement projects, but to grow sustainably and increase their long-term impact.",
  },
  {
    id: "policy",
    index: "04",
    kicker: "Evidence & advocacy",
    title: "Policy, research, and movement-building",
    icon: MdOutlinePolicy,
    text: "ERA operates at the intersection of policy, research, and movement-building. We translate lived experiences into evidence-based advocacy, contribute to the development of inclusive policies, and engage with national, regional, and European institutions to ensure that LGBTIQ rights remain integral to democratic and rule of law frameworks.",
  },
  {
    id: "narratives",
    index: "05",
    kicker: "Public discourse",
    title: "Shaping informed narratives",
    icon: MdOutlineCampaign,
    text: "We also play a key role in shaping public and policy narratives. In environments where LGBTIQ issues are frequently marginalised or instrumentalised, ERA works to ensure that discussions are informed, evidence-based, and anchored in fundamental rights.",
  },
  {
    id: "integrated",
    index: "06",
    kicker: "Holistic approach",
    title: "Integrated regional initiatives",
    icon: MdOutlineHub,
    text: "Our regional initiatives reflect this integrated approach, combining research, policy development, subgranting, and advocacy to address systemic barriers and promote inclusive societies.",
  },
];

const valuesQuote =
  "Our work is grounded in European values, international human rights standards, and a strong commitment to accountability, transparency, and results.";

const visionText =
  "ERA contributes to building a regional ecosystem in which equality is not symbolic, but operational and reflected in access to resources, institutional accountability, and the ability to advance LGBTIQ rights as inseparable from strengthening democracy, safeguarding human dignity, and upholding the core values of the European Union.";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function WhoWeAreView() {
  return (
    <main className={styles.who_we_are_page}>
      <div className={styles.who_we_are_glow} aria-hidden />

      <header className={styles.who_we_are_hero}>
        <motion.div className={styles.who_we_are_hero_content} {...fadeUp}>
          <p className={styles.who_we_are_kicker}>
            <MdOutlineGroups aria-hidden />
            About ERA
          </p>
          <h1 className={styles.who_we_are_title}>
            <span className="title-accent">Who We Are</span>
          </h1>
          <p className={styles.who_we_are_intro}>{intro}</p>
          <Link
            href="/about-us/member-organizations"
            className={styles.who_we_are_cta}
          >
            Explore member organisations
            <MdOutlineArrowForward aria-hidden />
          </Link>
        </motion.div>
      </header>

      <motion.div
        className={styles.who_we_are_stats}
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className={styles.who_we_are_stat}>
            <span className={styles.who_we_are_stat_value}>{stat.value}</span>
            <span className={styles.who_we_are_stat_label}>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <div className={styles.who_we_are_sections}>
        {sections.map((section, i) => {
          const Icon = section.icon;
          const isWide = section.showCountries;

          return (
            <motion.article
              key={section.id}
              id={section.id}
              className={`${styles.who_we_are_card} ${isWide ? styles.who_we_are_card_wide : ""}`}
              {...fadeUp}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.06,
                ease: "easeOut",
              }}
            >
              <div className={styles.who_we_are_card_top}>
                <span className={styles.who_we_are_card_index} aria-hidden>
                  {section.index}
                </span>
                <div className={styles.who_we_are_card_icon} aria-hidden>
                  <Icon />
                </div>
              </div>
              <div className={styles.who_we_are_card_body}>
                <p className={styles.who_we_are_card_kicker}>
                  {section.kicker}
                </p>
                <h2 className={styles.who_we_are_card_title}>
                  {section.title}
                </h2>
                <p className={styles.who_we_are_card_text}>{section.text}</p>
                {section.showCountries && (
                  <ul className={styles.who_we_are_countries}>
                    {countries.map((country) => (
                      <li key={country}>
                        <span className={styles.who_we_are_country_chip}>
                          {country}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          );
        })}

        <motion.blockquote className={styles.who_we_are_values} {...fadeUp}>
          <div className={styles.who_we_are_values_icon} aria-hidden>
            <MdOutlineVerified />
          </div>
          <p className={styles.who_we_are_values_kicker}>Our foundation</p>
          <p className={styles.who_we_are_values_quote}>{valuesQuote}</p>
        </motion.blockquote>
      </div>

      <motion.article className={styles.who_we_are_vision} {...fadeUp}>
        <p className={styles.who_we_are_vision_kicker}>Looking ahead</p>
        <p className={styles.who_we_are_vision_text}>{visionText}</p>
      </motion.article>
    </main>
  );
}
