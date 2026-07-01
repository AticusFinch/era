"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdOutlineGroups,
  MdOutlineWorkOutline,
  MdOutlineAccountBalance,
  MdOutlineVerified,
  MdOutlineArrowForward,
} from "react-icons/md";
import { boardMembers, teamMembers } from "./our-team-data";
import OurTeamCarousel from "./our-team-carousel";
import styles from "./page.module.css";

const stats = [
  { value: String(teamMembers.length), label: "ERA staff members" },
  { value: String(boardMembers.length), label: "Board members" },
  { value: "Regional", label: "Leadership network" },
  { value: "6", label: "Countries represented" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function TeamSection({
  id,
  kicker,
  title,
  description,
  icon: Icon,
  members,
  variant = "team",
  carouselLabel,
}) {
  return (
    <section
      id={id}
      className={styles.team_section}
      aria-labelledby={`${id}-heading`}
    >
      <div className={styles.team_section_intro}>
        <div className={styles.team_section_icon} aria-hidden>
          <Icon />
        </div>
        <div>
          <p className={styles.team_section_kicker}>{kicker}</p>
          <h2 id={`${id}-heading`} className={styles.team_section_title}>
            <span className="title-accent">{title}</span>
          </h2>
          {description && (
            <p className={styles.team_section_description}>{description}</p>
          )}
        </div>
      </div>
      <OurTeamCarousel
        members={members}
        variant={variant}
        ariaLabel={carouselLabel}
      />
    </section>
  );
}

export default function OurTeamView() {
  return (
    <main className={styles.team_page}>
      <div className={styles.team_glow} aria-hidden />

      <header className={styles.team_hero}>
        <motion.div className={styles.team_hero_content} {...fadeUp}>
          <p className={styles.team_kicker}>
            <MdOutlineGroups aria-hidden />
            People behind ERA
          </p>
          <h1 className={styles.team_title}>
            <span className="title-accent">Our Team</span>
          </h1>
          <div className={styles.team_intro}>
            <p>
              We are a{" "}
              <strong>
                regional platform advancing LGBTIQ equality through coordinated
                action, evidence-based approaches, and policy engagement
              </strong>
              .
            </p>
            <p>
              Our governance brings together leaders from across the region. The
              Board ensures that our strategic priorities and direction are
              grounded in lived realities, while reflecting diverse national
              contexts and maintaining a coherent regional approach.
            </p>
          </div>
          <Link href="/about-us/who-we-are" className={styles.team_cta}>
            Learn about ERA
            <MdOutlineArrowForward aria-hidden />
          </Link>
        </motion.div>
      </header>

      <motion.div className={styles.team_stats} {...fadeUp}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.team_stat}>
            <span className={styles.team_stat_value}>{stat.value}</span>
            <span className={styles.team_stat_label}>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.blockquote className={styles.team_governance} {...fadeUp}>
        <div className={styles.team_governance_icon} aria-hidden>
          <MdOutlineVerified />
        </div>
        <p className={styles.team_governance_kicker}>How we work</p>
        <p className={styles.team_governance_quote}>
          The ERA team translates regional strategy into action — designing
          initiatives and programmes, building partnerships, supporting
          organisations and advocacy processes, and positioning regional issues
          within European spaces.
        </p>
      </motion.blockquote>

      <TeamSection
        id="era-team"
        kicker="our team"
        title="Team Members"
        description="The ERA team drives regional programmes, partnerships, and advocacy across the Western Balkans and Türkiye."
        icon={MdOutlineWorkOutline}
        members={teamMembers}
        carouselLabel="ERA team carousel"
      />

      <TeamSection
        id="era-board"
        kicker="Governance"
        title="Board Members"
        description="ERA's Board brings together experienced leaders from member organisations, guiding our strategic direction with regional perspective."
        icon={MdOutlineAccountBalance}
        members={boardMembers}
        variant="board"
        carouselLabel="ERA board carousel"
      />
    </main>
  );
}
