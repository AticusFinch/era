"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineWorkOutline } from "react-icons/md";
import OurWorkPillars from "./our-work-pillars";
import { ourWorkSubnavLinks } from "@/lib/data/our-work-nav";
import styles from "./page.module.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function OurWorkView() {
  return (
    <main className={styles.our_work_page}>
      <div className={styles.our_work_glow} aria-hidden />

      <header className={styles.our_work_header}>
        <motion.div className={styles.our_work_header_main} {...fadeUp}>
          <p className={styles.our_work_kicker}>
            <MdOutlineWorkOutline aria-hidden />
            What we do
          </p>
          <h1 className={styles.our_work_title}>
            <span className="title-accent">Our Work</span>
          </h1>
        </motion.div>
        <motion.p
          className={styles.our_work_intro}
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          At ERA, we are dedicated to advancing LGBTI+ rights, equality, and
          inclusion across the Western Balkans and Türkiye through a
          comprehensive approach that combines advocacy, capacity building,
          research, public awareness, and international engagement. Our work is
          deeply rooted in the belief that a strong, well-connected, and
          strategically empowered movement is essential for achieving meaningful
          and sustainable change.
        </motion.p>
      </header>

      <section
        className={styles.our_work_pillars_section}
        aria-labelledby="our-work-pillars-heading"
      >
        <motion.div className={styles.our_work_section_intro} {...fadeUp}>
          <p className={styles.our_work_section_kicker}>Core pillars</p>
          <h2
            id="our-work-pillars-heading"
            className={styles.our_work_section_heading}
          >
            How we drive change
          </h2>
          <p className={styles.our_work_section_description}>
            ERA&rsquo;s approach combines policy influence, movement
            strengthening, evidence-based advocacy, public awareness, and
            international engagement.
          </p>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        >
          <OurWorkPillars />
        </motion.div>
      </section>

      <nav
        className={styles.our_work_roadmap_nav}
        aria-label="Our work areas"
      >
        <motion.div
          className={styles.our_work_roadmap_intro}
          {...fadeUp}
        >
          <p className={styles.our_work_roadmap_kicker}>Explore further</p>
          <p className={styles.our_work_roadmap_heading}>
            Our work is focused on the following areas
          </p>
        </motion.div>
        <div className={styles.our_work_roadmap_track}>
          <ol className={styles.our_work_roadmap}>
            {ourWorkSubnavLinks.map(({ href, label, Icon }, index) => (
              <motion.li
                key={href}
                className={styles.our_work_roadmap_step}
                {...fadeUp}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link href={href} className={styles.our_work_roadmap_link}>
                  <span className={styles.our_work_roadmap_index} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {Icon ? (
                    <span className={styles.our_work_roadmap_icon} aria-hidden>
                      <Icon />
                    </span>
                  ) : null}
                  <span className={styles.our_work_roadmap_label}>{label}</span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </nav>
    </main>
  );
}
