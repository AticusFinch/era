import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import LegalContactButton from "@/app/components/legal-contact-button";
import styles from "../legal-page.module.css";
import { MdPolicy, MdSecurity, MdVerified } from "react-icons/md";
import { HiOutlineScale, HiOutlineDocumentText } from "react-icons/hi2";
import { FiAlertTriangle } from "react-icons/fi";

const LAST_UPDATED = "June 24, 2026";

const FRAMEWORKS = [
  {
    icon: HiOutlineScale,
    label:
      "Regulation (EU) 2016/679 — General Data Protection Regulation (GDPR)",
  },
  {
    icon: HiOutlineDocumentText,
    label: "Applicable national data protection legislation",
  },
  {
    icon: MdVerified,
    label: "ERA acts as data controller for personal data on this website",
  },
];

const TOC = [
  { id: "controller", label: "Data Controller" },
  { id: "scope", label: "Scope of Application" },
  { id: "categories", label: "Categories of Personal Data" },
  { id: "legal-basis", label: "Legal Basis for Processing" },
  { id: "purpose", label: "Purpose of Processing" },
  { id: "sharing", label: "Data Sharing & Recipients" },
  { id: "transfers", label: "International Data Transfers" },
  { id: "retention", label: "Data Retention" },
  { id: "rights", label: "Data Subject Rights" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "security", label: "Data Security" },
  { id: "misuse", label: "Protection Against Misuse" },
  { id: "amendments", label: "Amendments" },
  { id: "contact", label: "Contact & Complaints" },
];

export const metadata = {
  title: "Privacy Policy | ERA LGBTI",
  description:
    "How ERA collects, processes, and protects personal data in accordance with the GDPR.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.legal_page}>
        <Container>
          <header className={styles.legal_hero}>
            <div className={styles.legal_hero_main}>
              <p className={styles.legal_kicker}>
                <MdPolicy aria-hidden />
                Privacy &amp; data protection
              </p>
              <h1 className={styles.legal_title}>
                <span className={styles.legal_title_inner}>
                  <span className="title-accent">Privacy Policy</span>
                </span>
              </h1>
              <p className={styles.legal_lead}>
                ERA-LGBTI Equal Rights Association for the Western Balkans and
                Türkiye (&ldquo;ERA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) is committed to ensuring a high level of
                protection of personal data and respecting the privacy of all
                individuals who interact with our website.
              </p>
              <p className={styles.legal_lead}>
                This Privacy Policy outlines the principles governing the
                collection, processing, and protection of personal data. ERA
                acts as a data controller, meaning that it determines the
                purposes and means of processing personal data.
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
              This policy is adopted in accordance with
            </p>
            <ul className={styles.legal_standards_grid}>
              {FRAMEWORKS.map(({ icon: Icon, label }) => (
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
              <LegalSection
                id="controller"
                number="01"
                title="Data Controller"
                variant="highlight"
              >
                <p className={styles.legal_org_name}>
                  ERA-LGBTI Equal Rights Association for the Western Balkans and
                  Türkiye
                </p>
                <p>
                  ERA acts as the data controller, determining the purposes and
                  means of processing personal data in accordance with
                  applicable data protection legislation.
                </p>
              </LegalSection>

              <LegalSection id="scope" number="02" title="Scope of Application">
                <p>
                  This Privacy Policy applies to all visitors and users of the
                  ERA website and governs all personal data processing
                  activities carried out through digital interaction with the
                  platform.
                </p>
                <p>
                  This Policy does not apply to third-party platforms or
                  websites that may be accessed via external links.
                </p>
              </LegalSection>

              <LegalSection
                id="categories"
                number="03"
                title="Categories of Personal Data"
              >
                <p>
                  Depending on your interaction with the website, ERA may
                  collect and process the following categories of personal data:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    <strong>Identification and contact data</strong> — name,
                    email address, and other information voluntarily provided
                  </li>
                  <li>
                    <strong>Technical data</strong> — IP address, browser type
                    and version, device identifiers, operating system
                  </li>
                  <li>
                    <strong>Usage data</strong> — navigation paths, session
                    duration, interaction patterns
                  </li>
                  <li>
                    <strong>Communication data</strong> — records of
                    correspondence and inquiries
                  </li>
                </ul>
                <p>
                  ERA does not intentionally collect special categories of
                  personal data (Article 9 GDPR).
                </p>
                <p>
                  Where such data is voluntarily provided, it will be processed
                  only where strictly necessary and subject to appropriate
                  safeguards in accordance with applicable law.
                </p>
              </LegalSection>

              <LegalSection
                id="legal-basis"
                number="04"
                title="Legal Basis for Processing"
              >
                <p>
                  Personal data is processed in accordance with Article 6 of the
                  GDPR on the following legal grounds:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    <strong>Consent (Article 6(1)(a))</strong> — where the data
                    subject has given explicit consent
                  </li>
                  <li>
                    <strong>Legitimate interests (Article 6(1)(f))</strong> —
                    including ensuring website security, functionality, and
                    improvement. When relying on this legal basis, ERA ensures
                    that such interests are not overridden by the rights and
                    freedoms of the data subject and conducts an appropriate
                    balancing assessment
                  </li>
                  <li>
                    <strong>Legal obligations (Article 6(1)(c))</strong> — where
                    processing is necessary for compliance with applicable legal
                    obligations
                  </li>
                  <li>
                    <strong>
                      Performance of a contract or pre-contractual steps
                      (Article 6(1)(b))
                    </strong>{" "}
                    — where processing is necessary to respond to user inquiries
                    or to take steps prior to entering into a contractual
                    relationship
                  </li>
                </ul>
                <p>
                  Where processing is based on consent, such consent may be
                  withdrawn at any time, without affecting the lawfulness of
                  processing carried out prior to its withdrawal.
                </p>
              </LegalSection>

              <LegalSection
                id="purpose"
                number="05"
                title="Purpose of Processing"
              >
                <p>
                  ERA processes personal data for specific, explicit, and
                  legitimate purposes, including:
                </p>
                <ul className={styles.legal_list}>
                  <li>Responding to inquiries and maintaining communication</li>
                  <li>
                    Ensuring the proper functioning, security, and integrity of
                    the website
                  </li>
                  <li>
                    Monitoring, analyzing, and improving website performance and
                    user experience
                  </li>
                  <li>
                    Preventing misuse, unauthorized access, or security
                    incidents
                  </li>
                  <li>Complying with legal and regulatory obligations</li>
                  <li>
                    Ensuring transparency and accountability in ERA&rsquo;s work
                  </li>
                </ul>
                <p>
                  Personal data will not be further processed in a manner that
                  is incompatible with these purposes.
                </p>
                <p>
                  ERA may process personal data for internal research and
                  statistical purposes, in accordance with Article 5(1)(b) and
                  Recital 50 GDPR. Such processing is limited to what is
                  necessary and proportionate, and, where feasible, is carried
                  out using anonymized or aggregated data. These activities are
                  designed to support evidence-based advocacy, program
                  development, and public policy engagement, and do not result
                  in decisions affecting individual users.
                </p>
              </LegalSection>

              <LegalSection
                id="sharing"
                number="06"
                title="Data Sharing and Recipients"
              >
                <p>
                  ERA does not sell, rent, or otherwise disclose personal data
                  for commercial purposes.
                </p>
                <p>
                  Personal data may be shared only where necessary and
                  proportionate with:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    Authorized service providers (e.g. hosting, IT, analytics),
                    acting as data processors under binding contractual
                    arrangements
                  </li>
                  <li>
                    Public authorities where disclosure is required by
                    applicable law
                  </li>
                </ul>
                <p>
                  All third-party processors are engaged in accordance with
                  Article 28 GDPR and are required to implement appropriate
                  technical and organizational safeguards.
                </p>
              </LegalSection>

              <LegalSection
                id="transfers"
                number="07"
                title="International Data Transfers"
              >
                <p>
                  Where personal data is transferred outside the European Union
                  or European Economic Area (EU/EEA), ERA ensures that such
                  transfers are subject to appropriate safeguards, including:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    Standard Contractual Clauses (SCCs) adopted by the European
                    Commission
                  </li>
                  <li>
                    Other legally recognized transfer mechanisms under
                    applicable data protection law
                  </li>
                </ul>
              </LegalSection>

              <LegalSection id="retention" number="08" title="Data Retention">
                <p>
                  Personal data is retained only for as long as necessary to
                  fulfill the purposes for which it was collected, unless a
                  longer retention period is required or permitted by law.
                </p>
                <p>
                  ERA applies the principles of data minimization and storage
                  limitation in all processing activities and periodically
                  reviews retention periods.
                </p>
              </LegalSection>

              <LegalSection id="rights" number="09" title="Data Subject Rights">
                <p>
                  In accordance with the GDPR, individuals have the right to:
                </p>
                <ul className={styles.legal_list}>
                  <li>Request access to their personal data</li>
                  <li>
                    Request rectification of inaccurate or incomplete data
                  </li>
                  <li>Request erasure (&ldquo;right to be forgotten&rdquo;)</li>
                  <li>Request restriction of processing</li>
                  <li>Object to processing based on legitimate interests</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  ERA may request verification of identity prior to responding
                  to such requests, in order to ensure data security.
                </p>
                <p>
                  Requests can be submitted using the contact details provided
                  below.
                </p>
              </LegalSection>

              <LegalSection
                id="cookies"
                number="10"
                title="Cookies and Tracking Technologies"
              >
                <p>This website uses cookies and similar technologies to:</p>
                <ul className={styles.legal_list}>
                  <li>Ensure proper functionality and performance</li>
                  <li>Improve user experience</li>
                  <li>Analyze usage patterns and website performance</li>
                </ul>
                <p>
                  Users may manage or disable cookies through their browser
                  settings.
                </p>
                <p>
                  Where required, additional information will be provided
                  through a dedicated Cookie Notice.
                </p>
              </LegalSection>

              <LegalSection id="security" number="11" title="Data Security">
                <p>
                  ERA implements appropriate technical and organizational
                  measures to ensure a level of security appropriate to the
                  risk, including:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    Protection against unauthorized or unlawful processing
                  </li>
                  <li>Prevention of accidental loss, destruction, or damage</li>
                  <li>Controlled and limited access to personal data</li>
                </ul>
                <p className={styles.legal_callout}>
                  <MdSecurity aria-hidden />
                  <span>
                    Despite these measures, no system can be guaranteed to be
                    fully secure.
                  </span>
                </p>
              </LegalSection>

              <LegalSection
                id="misuse"
                number="12"
                title="Protection Against Misuse"
                variant="muted"
              >
                <p>Users must not:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Attempt to access or process personal data of other users
                    without authorization
                  </li>
                  <li>
                    Use any data obtained through the website for unlawful or
                    harmful purposes
                  </li>
                  <li>
                    Engage in activities that may compromise the security or
                    integrity of the system
                  </li>
                </ul>
                <p className={styles.legal_callout}>
                  <FiAlertTriangle aria-hidden />
                  <span>
                    ERA reserves the right to take appropriate action in
                    response to such activities.
                  </span>
                </p>
              </LegalSection>

              <LegalSection id="amendments" number="13" title="Amendments">
                <p>
                  ERA reserves the right to amend this Privacy Policy to reflect
                  legal, technical, or operational developments.
                </p>
                <p>
                  Updated versions will be published on this page. Continued use
                  of the website constitutes acceptance of the updated Policy.
                </p>
              </LegalSection>

              <LegalSection
                id="contact"
                number="14"
                title="Contact and Complaints"
                variant="highlight"
              >
                <p>
                  For any questions or requests regarding personal data, please
                  contact us. We will respond to your inquiry in accordance with
                  applicable data protection law.
                </p>
                <LegalContactButton
                  subject="ERA Privacy Policy inquiry"
                  className={styles.legal_contact_button}
                />
              </LegalSection>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
