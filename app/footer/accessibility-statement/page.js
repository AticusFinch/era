import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import LegalContactButton from "@/app/components/legal-contact-button";
import styles from "../legal-page.module.css";
import { MdAccessibility, MdGavel, MdVerified } from "react-icons/md";
import { HiOutlineScale, HiOutlineDocumentText } from "react-icons/hi2";

const LAST_UPDATED = "June 24, 2026";

const STANDARDS = [
  {
    icon: HiOutlineScale,
    label: "EU Directive 2016/2102 on website and mobile app accessibility",
  },
  {
    icon: HiOutlineDocumentText,
    label: "Berne Convention",
  },
  {
    icon: MdVerified,
    label: "Web Content Accessibility Guidelines (WCAG) 2.1, Level AA",
  },
];

const TOC = [
  { id: "scope", label: "Scope of Application" },
  { id: "commitment", label: "Commitment to Accessibility" },
  { id: "measures", label: "Accessibility Measures" },
  { id: "publications", label: "Publications & Visual Content" },
  { id: "improvements", label: "Ongoing Improvements" },
  { id: "limitations", label: "Known Limitations" },
  { id: "feedback", label: "Feedback & Contact" },
  { id: "enforcement", label: "Enforcement Procedure" },
  { id: "compatibility", label: "Compatibility" },
  { id: "updates", label: "Updates to This Statement" },
];

export const metadata = {
  title: "Accessibility Statement | ERA LGBTI",
  description:
    "ERA's commitment to digital accessibility, aligned with EU Directive 2016/2102 and WCAG 2.1 Level AA.",
};

function LegalSection({ id, number, title, children, variant }) {
  return (
    <section
      id={id}
      className={`${styles.legal_section} ${variant ? styles[`legal_section_${variant}`] : ""}`}
      aria-labelledby={id}
    >
      <div className={styles.legal_section_header}>
        <span className={styles.legal_section_number} aria-hidden>
          {number}
        </span>
        <h2 id={id} className={styles.legal_section_title}>
          {title}
        </h2>
      </div>
      <div className={styles.legal_section_body}>{children}</div>
    </section>
  );
}

export default function AccessibilityStatementPage() {
  return (
    <>
      <Navbar />
      <main className={styles.legal_page}>
        <Container>
          <header className={styles.legal_hero}>
            <div className={styles.legal_hero_main}>
              <p className={styles.legal_kicker}>
                <MdAccessibility aria-hidden />
                Inclusion &amp; access
              </p>
              <h1 className={styles.legal_title}>
                <span className={styles.legal_title_inner}>
                  <span className="title-accent">Accessibility Statement</span>
                </span>
              </h1>
              <p className={styles.legal_lead}>
                ERA-LGBTI Equal Rights Association for the Western Balkans and
                Türkiye (&ldquo;ERA&rdquo;) is committed to ensuring that its
                digital content and services are accessible, inclusive, and
                usable for all individuals, including persons with disabilities.
              </p>
            </div>
            <div className={styles.legal_hero_meta}>
              <span className={styles.legal_updated_badge}>
                Last updated: {LAST_UPDATED}
              </span>
            </div>
          </header>

          <div className={styles.legal_standards_panel}>
            <p className={styles.legal_standards_heading}>
              This statement is aligned with
            </p>
            <ul className={styles.legal_standards_grid}>
              {STANDARDS.map(({ icon: Icon, label }) => (
                <li key={label} className={styles.legal_standards_item}>
                  <span className={styles.legal_standards_icon} aria-hidden>
                    <Icon />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.legal_layout}>
            <nav className={styles.legal_toc} aria-label="On this page">
              <p className={styles.legal_toc_heading}>On this page</p>
              <ol className={styles.legal_toc_list}>
                {TOC.map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} className={styles.legal_toc_link}>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.legal_sections}>
              <LegalSection id="scope" number="01" title="Scope of Application">
                <p>
                  This Accessibility Statement applies to the ERA website and all
                  publicly available digital content hosted on it.
                </p>
              </LegalSection>

              <LegalSection
                id="commitment"
                number="02"
                title="Commitment to Accessibility"
              >
                <p>
                  ERA is committed to ensuring that digital accessibility is
                  integrated into its communication and visibility practices,
                  including within EU-funded projects.
                </p>
                <p>We aim to ensure that all users can:</p>
                <ul className={styles.legal_list}>
                  <li>Access information without barriers</li>
                  <li>Navigate content easily</li>
                  <li>Interact with digital materials in an inclusive way</li>
                </ul>
              </LegalSection>

              <LegalSection
                id="measures"
                number="03"
                title="Accessibility Measures Implemented"
              >
                <p>To support accessibility, ERA takes the following measures:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Structuring content with clear headings and logical hierarchy
                  </li>
                  <li>
                    Providing alternative text for images and non-text content
                    where feasible
                  </li>
                  <li>
                    Ensuring sufficient contrast between text and background
                  </li>
                  <li>Supporting keyboard navigation across key elements</li>
                  <li>
                    Avoiding overly complex layouts or inaccessible design
                    patterns
                  </li>
                  <li>Using clear and understandable language</li>
                </ul>
              </LegalSection>

              <LegalSection
                id="publications"
                number="04"
                title="Accessibility in Publications and Visual Content"
              >
                <p>ERA produces a range of materials, including:</p>
                <ul className={styles.legal_list}>
                  <li>Policy papers</li>
                  <li>Research reports</li>
                  <li>Social media content</li>
                  <li>Event materials</li>
                </ul>
                <p>We strive to ensure that these materials:</p>
                <ul className={styles.legal_list}>
                  <li>Follow accessible design principles</li>
                  <li>Use readable typography and contrast</li>
                  <li>
                    Are provided in formats that can be accessed across devices
                  </li>
                </ul>
                <p>
                  Where full accessibility is not yet possible (e.g. legacy PDFs),
                  we are working towards improvement.
                </p>
              </LegalSection>

              <LegalSection
                id="improvements"
                number="05"
                title="Ongoing Improvements"
              >
                <p>Accessibility is an ongoing process.</p>
                <p>ERA is committed to:</p>
                <ul className={styles.legal_list}>
                  <li>Regularly reviewing website accessibility</li>
                  <li>Improving content and design standards</li>
                  <li>Aligning with evolving EU accessibility requirements</li>
                </ul>
              </LegalSection>

              <LegalSection
                id="limitations"
                number="06"
                title="Known Limitations"
                variant="muted"
              >
                <p>
                  Despite our efforts, some areas of the website may not yet
                  fully meet accessibility standards.
                </p>
                <p>This may include:</p>
                <ul className={styles.legal_list}>
                  <li>Older documents not optimized for accessibility</li>
                  <li>Third-party embedded content</li>
                  <li>Certain visual materials</li>
                </ul>
                <p>We are actively working to address these limitations.</p>
              </LegalSection>

              <LegalSection
                id="feedback"
                number="07"
                title="Feedback and Contact"
                variant="highlight"
              >
                <p>
                  If you encounter accessibility barriers or require content in an
                  alternative format, please get in touch. ERA will make
                  reasonable efforts to respond and provide a solution in a
                  timely manner.
                </p>
                <p>Please include:</p>
                <ul className={styles.legal_list}>
                  <li>A description of the issue</li>
                  <li>The page or content concerned</li>
                </ul>
                <LegalContactButton
                  subject="ERA Accessibility Statement inquiry"
                  className={styles.legal_contact_button}
                />
              </LegalSection>

              <LegalSection
                id="enforcement"
                number="08"
                title="Enforcement Procedure"
              >
                <p className={styles.legal_callout}>
                  <MdGavel aria-hidden />
                  <span>
                    If you are not satisfied with our response, you have the
                    right to contact the relevant national authority responsible
                    for monitoring compliance with accessibility requirements.
                  </span>
                </p>
              </LegalSection>

              <LegalSection id="compatibility" number="09" title="Compatibility">
                <p>This website is designed to be compatible with:</p>
                <ul className={styles.legal_list}>
                  <li>Modern web browsers</li>
                  <li>Assistive technologies where reasonably supported</li>
                </ul>
              </LegalSection>

              <LegalSection
                id="updates"
                number="10"
                title="Updates to This Statement"
              >
                <p>
                  This Accessibility Statement may be updated periodically to
                  reflect improvements or changes in legal requirements.
                </p>
              </LegalSection>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
