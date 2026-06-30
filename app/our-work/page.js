import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";
import OurWorkPillars from "./our-work-pillars";
import { ourWorkSubnavLinks } from "@/lib/data/our-work-nav";
import { MdOutlineWorkOutline } from "react-icons/md";

export const metadata = {
  title: "Our Work | ERA LGBTI",
  description:
    "ERA's advocacy, capacity building, research, public awareness, and international engagement across the Western Balkans and Türkiye.",
};

export default function OurWork() {
  return (
    <>
      <Navbar />
      <main className={styles.our_work_page}>
        <Container>
          <header className={styles.our_work_header}>
            <div className={styles.our_work_header_main}>
              <p className={styles.our_work_kicker}>
                <MdOutlineWorkOutline aria-hidden />
                What we do
              </p>
              <h1 className={styles.our_work_title}>
                <span className="title-accent">Our Work</span>
              </h1>
            </div>
            <p className={styles.our_work_intro}>
              At ERA, we are dedicated to advancing LGBTI+ rights, equality,
              and inclusion across the Western Balkans and Türkiye through a
              comprehensive approach that combines advocacy, capacity building,
              research, public awareness, and international engagement. Our work
              is deeply rooted in the belief that a strong, well-connected, and
              strategically empowered movement is essential for achieving
              meaningful and sustainable change.
            </p>
          </header>

          <section
            className={styles.our_work_pillars_section}
            aria-labelledby="our-work-pillars-heading"
          >
            <div className={styles.our_work_section_intro}>
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
            </div>
            <OurWorkPillars />
          </section>

          <nav
            className={styles.our_work_roadmap_nav}
            aria-label="Our work areas"
          >
            <div className={styles.our_work_roadmap_intro}>
              <p className={styles.our_work_roadmap_kicker}>Explore further</p>
              <p className={styles.our_work_roadmap_heading}>
                Our work is focused on the following areas
              </p>
            </div>
            <div className={styles.our_work_roadmap_track}>
              <ol className={styles.our_work_roadmap}>
                {ourWorkSubnavLinks.map(({ href, label, Icon }, index) => (
                  <li key={href} className={styles.our_work_roadmap_step}>
                    <Link href={href} className={styles.our_work_roadmap_link}>
                      <span
                        className={styles.our_work_roadmap_index}
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {Icon ? (
                        <span
                          className={styles.our_work_roadmap_icon}
                          aria-hidden
                        >
                          <Icon />
                        </span>
                      ) : null}
                      <span className={styles.our_work_roadmap_label}>
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
