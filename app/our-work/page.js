import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";
import OurWorkPillars from "./our-work-pillars";
import { ourWorkSubnavLinks } from "@/lib/data/our-work-nav";

export default function OurWork() {
  return (
    <>
      <Navbar />
      <main className={styles.our_work_page}>
        <div className={styles.our_work_hero}>
          <Container>
            <header className={styles.our_work_header}>
              <div className={styles.our_work_header_row}>
                <h1 className={`${styles.our_work_title} title`}>
                  <span className="title-accent">Our Work</span>
                </h1>
                <p className={styles.our_work_intro}>
                  At ERA, we are dedicated to advancing LGBTI+ rights, equality,
                  and inclusion across the Western Balkans and Türkiye through a
                  comprehensive approach that combines advocacy, capacity
                  building, research, public awareness, and international
                  engagement. Our work is deeply rooted in the belief that a
                  strong, well-connected, and strategically empowered movement
                  is essential for achieving meaningful and sustainable change.
                </p>
              </div>
            </header>
            <nav
              className={styles.our_work_roadmap_nav}
              aria-label="Our work areas"
            >
              <p className={styles.our_work_roadmap_heading}>
                Our work roadmap
              </p>
              <div className={styles.our_work_roadmap_track}>
                <ol className={styles.our_work_roadmap}>
                  {ourWorkSubnavLinks.map(({ href, label }, index) => (
                    <li key={href} className={styles.our_work_roadmap_step}>
                      <Link
                        href={href}
                        className={styles.our_work_roadmap_link}
                      >
                        <span
                          className={styles.our_work_roadmap_index}
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
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
        </div>

        <Container>
          <OurWorkPillars />
        </Container>
      </main>
      <Footer />
    </>
  );
}
