"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdOutlineGroups,
  MdOutlineHub,
  MdOutlineHandshake,
  MdOutlineAnalytics,
  MdOutlineCampaign,
  MdOutlineSavings,
  MdOutlineVisibility,
  MdOutlinePeople,
  MdOutlineCorporateFare,
  MdOutlineVolunteerActivism,
  MdOutlineArrowForward,
  MdOutlineInfo,
} from "react-icons/md";
import Button from "../components/button";
import styles from "./page.module.css";

const countries = [
  "Albania",
  "Bosnia and Herzegovina",
  "Croatia",
  "Kosovo",
  "Montenegro",
  "North Macedonia",
  "Serbia",
  "Slovenia",
  "Türkiye",
];

const rolePillars = [
  {
    id: "connecting",
    index: "01",
    kicker: "Solidarity",
    title: "Connecting the movement",
    icon: MdOutlineHub,
    text: "We create regional spaces where LGBTIQ+ organisations and activists can exchange knowledge, coordinate strategies, build solidarity, and respond collectively to shared challenges.",
  },
  {
    id: "strengthening",
    index: "02",
    kicker: "Capacity",
    title: "Strengthening organisations",
    icon: MdOutlineHandshake,
    text: "We provide capacity-building, training, mentoring, tools and resources that help organisations grow, adapt, advocate, communicate and sustain their work.",
  },
  {
    id: "evidence",
    index: "03",
    kicker: "Research",
    title: "Producing evidence",
    icon: MdOutlineAnalytics,
    text: "Through research, policy analysis and community-based knowledge, ERA documents the lived realities of LGBTIQ+ people and supports advocacy rooted in evidence and experience.",
  },
  {
    id: "advocacy",
    index: "04",
    kicker: "Policy",
    title: "Supporting advocacy",
    icon: MdOutlineCampaign,
    text: "ERA engages with regional, European and international institutions to ensure that the voices and priorities of LGBTIQ+ communities from the Western Balkans and Türkiye are visible and heard.",
  },
  {
    id: "resources",
    index: "05",
    kicker: "Grant-making",
    title: "Moving resources",
    icon: MdOutlineSavings,
    text: "Through grant-making and partnership support, ERA helps channel resources toward organisations and initiatives working directly with communities on the ground.",
  },
  {
    id: "visibility",
    index: "06",
    kicker: "Communications",
    title: "Building visibility",
    icon: MdOutlineVisibility,
    text: "We support communications, campaigns, storytelling and public visibility that challenge harmful narratives, strengthen representation and bring community realities into public and policy conversations.",
  },
];

const exploreLinks = [
  {
    title: "Who We Are",
    description:
      "Learn more about ERA's mission, history, values and regional approach.",
    href: "/about-us/who-we-are",
    button: "Who We Are",
    icon: MdOutlineInfo,
  },
  {
    title: "Our Team",
    description:
      "Meet the people coordinating ERA's work across advocacy, research, communications, programmes and organisational support.",
    href: "/about-us/our-team",
    button: "Meet the Team",
    icon: MdOutlinePeople,
  },
  {
    title: "Member Organizations",
    description:
      "Explore ERA's network of member organisations across the Western Balkans and Türkiye.",
    href: "/about-us/member-organizations",
    button: "View Members",
    icon: MdOutlineCorporateFare,
  },
  {
    title: "Partners & Donors",
    description:
      "Learn more about the partners and donors who support ERA's regional work.",
    href: "/about-us/partners-and-donors",
    button: "Partners & Donors",
    icon: MdOutlineVolunteerActivism,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function AboutUsView() {
  return (
    <main className={styles.about_page}>
      <header className={styles.about_hero}>
        <motion.div {...fadeUp}>
          <p className={styles.about_kicker}>
            <MdOutlineGroups aria-hidden />
            About Us
          </p>
          <h1 className={styles.about_title}>
            Building regional power for{" "}
            <span className="title-accent">LGBTIQ+ equality</span>
          </h1>
          <div className={styles.about_lead}>
            <p>
              ERA – LGBTI Equal Rights Association for the Western Balkans and
              Türkiye is a regional umbrella network of 80+ LGBTIQ+
              organisations working together to advance equality, human rights,
              social inclusion, and community-led change.
            </p>
            <p>
              Across Albania, Bosnia and Herzegovina, Croatia, Kosovo,
              Montenegro, North Macedonia, Serbia, Slovenia and Türkiye, ERA
              connects organisations, activists, communities, institutions,
              donors and international partners — turning local realities into
              regional knowledge, advocacy, visibility and action.
            </p>
            <p>
              We believe that stronger movements are built through solidarity,
              shared resources, evidence, long-term cooperation and the
              leadership of the communities most affected by discrimination and
              exclusion.
            </p>
          </div>
          <ul
            className={styles.about_countries}
            aria-label="Countries in ERA's network"
          >
            {countries.map((country) => (
              <li key={country}>
                <span className={styles.about_country_chip}>{country}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </header>

      <motion.section className={styles.about_section} {...fadeUp}>
        <p className={styles.about_section_kicker}>Our work</p>
        <h2 className={styles.about_section_title}>What ERA does</h2>
        <div className={styles.about_prose}>
          <p>
            ERA strengthens the LGBTIQ+ movement across the region by supporting
            organisations, amplifying community voices, and creating spaces for
            regional cooperation, learning and collective action.
          </p>
          <p>
            Our work brings together advocacy, research, capacity building,
            grant-making, communications, visibility, and movement convening.
            Through conferences, consultations, caucuses, trainings, public
            campaigns and community-led spaces, ERA helps connect grassroots
            experiences with regional and international advocacy processes.
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.about_section} {...fadeUp}>
        <p className={styles.about_section_kicker}>Regional bridge</p>
        <h2 className={styles.about_section_title}>Our role in the region</h2>
        <p className={styles.about_section_intro}>
          ERA works as a bridge between local struggles and broader policy,
          funding, research and visibility processes. We support member
          organisations and partners by:
        </p>

        <div className={styles.about_pillars}>
          {rolePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.id}
                className={styles.about_pillar_card}
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.06,
                  ease: "easeOut",
                }}
              >
                <div className={styles.about_pillar_top}>
                  <span className={styles.about_pillar_index} aria-hidden>
                    {pillar.index}
                  </span>
                  <div className={styles.about_pillar_icon} aria-hidden>
                    <Icon />
                  </div>
                </div>
                <div className={styles.about_pillar_body}>
                  <p className={styles.about_pillar_kicker}>{pillar.kicker}</p>
                  <h3 className={styles.about_pillar_title}>{pillar.title}</h3>
                  <p className={styles.about_pillar_text}>{pillar.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section className={styles.about_section} {...fadeUp}>
        <p className={styles.about_section_kicker}>Our network</p>
        <h2 className={styles.about_section_title}>
          A community-led regional network
        </h2>
        <div className={styles.about_prose}>
          <p>
            ERA&apos;s strength comes from its members. Our network brings
            together organisations working in different political, social and
            legal contexts, but connected by a shared commitment to dignity,
            equality, freedom, safety and justice for LGBTIQ+ people.
          </p>
          <p>
            We work with and for communities that are often pushed to the
            margins, including lesbian, bisexual and queer women, trans,
            non-binary and intersex people, young people, people living with
            HIV, refugees, migrants, Roma LGBTIQ+ people, sex workers, and
            others facing multiple forms of discrimination.
          </p>
          <p>
            By working regionally, ERA helps make visible what is often treated
            as isolated or local: shared patterns of exclusion, weak
            implementation of rights, institutional mistrust, shrinking civic
            space, anti-gender and anti-LGBTIQ+ movements, violence, hate
            speech, and barriers to social and economic participation.
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.about_section} {...fadeUp}>
        <p className={styles.about_section_kicker}>Our approach</p>
        <h2 className={styles.about_section_title}>How we work</h2>
        <div className={`${styles.about_prose} ${styles.about_prose_panel}`}>
          <p>
            ERA&apos;s approach is rooted in solidarity, accountability and
            long-term movement building.
          </p>
          <p>
            We do not see equality as only a question of laws or policies. Legal
            protection matters, but real change also requires implementation,
            trust, resources, representation, safety, and the ability of
            communities to organise and participate fully in public life.
          </p>
          <p>
            That is why ERA combines policy work with grassroots support,
            research with storytelling, capacity building with advocacy, and
            regional coordination with local knowledge.
          </p>
          <p>
            Our work is shaped by the realities, expertise and demands of
            LGBTIQ+ communities across the region.
          </p>
        </div>
      </motion.section>

      <motion.section className={styles.about_section} {...fadeUp}>
        <p className={styles.about_section_kicker}>Discover ERA</p>
        <h2 className={styles.about_section_title}>Explore ERA</h2>
        <div className={styles.about_explore_grid}>
          {exploreLinks.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.href} className={styles.about_explore_card}>
                <div className={styles.about_explore_icon} aria-hidden>
                  <Icon />
                </div>
                <h3 className={styles.about_explore_title}>{item.title}</h3>
                <p className={styles.about_explore_text}>{item.description}</p>
                <Link href={item.href} className={styles.about_explore_link}>
                  {item.button}
                  <MdOutlineArrowForward aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section className={styles.about_cta} {...fadeUp}>
        <p className={styles.about_cta_kicker}>Get involved</p>
        <h2 className={styles.about_cta_title}>
          Join us in building what comes next
        </h2>
        <p className={styles.about_cta_text}>
          Whether you are an LGBTIQ+ organisation, community initiative, donor,
          institution, researcher, journalist, activist or ally, there are many
          ways to connect with ERA&apos;s work. Together, we can strengthen
          regional solidarity, support community-led organising, and build
          societies where LGBTIQ+ people can live freely, safely and equally.
        </p>
        <div className={styles.about_cta_actions}>
          <Button href="/become-a-member">Become a Member</Button>
          <Button href="/get-involved/partner-with-us">Partner With Us</Button>
          <Button href="/donate">Donate</Button>
        </div>
      </motion.section>
    </main>
  );
}
