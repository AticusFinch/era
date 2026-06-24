import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import LegalContactButton from "@/app/components/legal-contact-button";
import styles from "../legal-page.module.css";
import {
  MdGavel,
  MdOutlineCopyright,
  MdPolicy,
} from "react-icons/md";
import { HiOutlineDocumentText, HiOutlineScale } from "react-icons/hi2";
import { FiAlertTriangle } from "react-icons/fi";

const LAST_UPDATED = "June 24, 2026";

const FRAMEWORKS = [
  {
    icon: HiOutlineDocumentText,
    label: "Governs access to and use of the ERA website",
  },
  {
    icon: HiOutlineScale,
    label: "Applicable national legislation and relevant EU legal frameworks",
  },
  {
    icon: MdOutlineCopyright,
    label: "Protects ERA intellectual property and visual identity",
  },
];

const TOC = [
  { id: "purpose", label: "Purpose of the Website" },
  { id: "acceptance", label: "Acceptance and Scope" },
  { id: "acceptable-use", label: "Acceptable Use & Restrictions" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "content-use", label: "Use of Content & Publications" },
  { id: "no-affiliation", label: "No Affiliation or Endorsement" },
  { id: "user-content", label: "User-Provided Content" },
  { id: "misuse", label: "Protection Against Misuse" },
  { id: "media", label: "Media and Public Use" },
  { id: "sensitive", label: "Sensitive Content" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "security", label: "Security and Integrity" },
  { id: "data-protection", label: "Data Protection" },
  { id: "availability", label: "Availability & Modifications" },
  { id: "enforcement", label: "Enforcement and Discretion" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact" },
];

export const metadata = {
  title: "Terms of Use | ERA LGBTI",
  description:
    "Terms governing access to and use of the ERA website, including acceptable use and intellectual property.",
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

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <main className={styles.legal_page}>
        <Container>
          <header className={styles.legal_hero}>
            <div className={styles.legal_hero_main}>
              <p className={styles.legal_kicker}>
                <MdPolicy aria-hidden />
                Website terms
              </p>
              <h1 className={styles.legal_title}>
                <span className="title-accent">Terms of Use</span>
              </h1>
              <p className={styles.legal_lead}>
                These Terms of Use (&ldquo;Terms&rdquo;) govern access to and use
                of the website operated by ERA-LGBTI Equal Rights Association
                for the Western Balkans and Türkiye (&ldquo;ERA&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
              </p>
              <p className={styles.legal_lead}>
                By accessing or using this website, you (&ldquo;user&rdquo;,
                &ldquo;you&rdquo;, &ldquo;your&rdquo;) acknowledge that you have
                read, understood, and agree to be legally bound by these Terms.
                If you do not agree, you must immediately discontinue use of the
                website.
              </p>
            </div>
            <div className={styles.legal_hero_meta}>
              <span className={styles.legal_updated_badge}>
                Last updated: {LAST_UPDATED}
              </span>
            </div>
          </header>

          <div className={styles.legal_standards_panel}>
            <p className={styles.legal_standards_heading}>In summary</p>
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
              <LegalSection id="purpose" number="01" title="Purpose of the Website">
                <p>
                  This website provides information regarding ERA&rsquo;s work,
                  including but not limited to:
                </p>
                <ul className={styles.legal_list}>
                  <li>Advocacy and policy initiatives</li>
                  <li>Research, publications, and analytical outputs</li>
                  <li>Events, trainings, and activities</li>
                  <li>Regional cooperation and partnerships</li>
                </ul>
                <p>
                  All content is provided strictly for informational,
                  educational, and non-commercial purposes.
                </p>
                <p>
                  Nothing on this website constitutes legal, political, or
                  professional advice, nor should it be interpreted as such.
                </p>
              </LegalSection>

              <LegalSection id="acceptance" number="02" title="Acceptance and Scope">
                <p>
                  These Terms apply to all users, regardless of location or
                  method of access.
                </p>
                <p>
                  ERA reserves the right to impose additional terms for specific
                  services, tools, or sections of the website. In case of
                  conflict, such specific terms shall prevail.
                </p>
              </LegalSection>

              <LegalSection
                id="acceptable-use"
                number="03"
                title="Acceptable Use and Restrictions"
              >
                <p>
                  You agree to use the website in compliance with applicable
                  laws and in a manner consistent with its intended purpose.
                </p>
                <p>You expressly agree not to:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Use the website for unlawful, harmful, fraudulent, or
                    misleading purposes
                  </li>
                  <li>
                    Attempt to gain unauthorized access to systems, servers, or
                    data
                  </li>
                  <li>
                    Circumvent, disable, or interfere with security-related
                    features
                  </li>
                  <li>
                    Introduce malicious code, including viruses, scripts, or
                    automated exploits
                  </li>
                  <li>
                    Engage in data mining, scraping, harvesting, or automated
                    extraction of content without prior written consent
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of
                    the website
                  </li>
                  <li>
                    Use content in a way that misrepresents ERA&rsquo;s
                    positions, activities, partnerships, or funding
                  </li>
                  <li>
                    Use the website or its content to harass, defame, or harm
                    ERA, its partners, or third parties
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="intellectual-property"
                number="04"
                title="Intellectual Property, Visual Identity, and Use of Materials"
              >
                <p>
                  All content available on this website constitutes the
                  intellectual property of ERA-LGBTI Equal Rights Association for
                  the Western Balkans and Türkiye (&ldquo;ERA&rdquo;), unless
                  otherwise stated, and is protected under applicable
                  intellectual property laws, including copyright and unfair
                  competition principles, as well as relevant EU legal
                  frameworks.
                </p>
                <p>This includes, but is not limited to:</p>
                <ul className={styles.legal_list}>
                  <li>Text, publications, reports, and written content</li>
                  <li>Logos, trademarks, and branding elements</li>
                  <li>
                    Visual identity systems (including typography, color schemes,
                    layout structures, and design logic)
                  </li>
                  <li>
                    Campaign visuals, social media content, and communication
                    materials
                  </li>
                  <li>Infographics, illustrations, and visual storytelling formats</li>
                  <li>Event materials, promotional assets, and digital content</li>
                  <li>
                    Designed publications (including layout, composition, and
                    structure)
                  </li>
                  <li>Databases, website structure, and overall design</li>
                </ul>

                <h3 className={styles.legal_subsection_title}>
                  4.1 Protection of Visual Identity
                </h3>
                <p>ERA&rsquo;s visual identity constitutes a distinct and protected system.</p>
                <p>Users are strictly prohibited from:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Reproducing, imitating, or creating derivative works based on
                    ERA&rsquo;s visual identity
                  </li>
                  <li>
                    Using similar or adapted visual elements that may create
                    confusion or imply association with ERA
                  </li>
                  <li>
                    Using ERA&rsquo;s branding, design systems, or stylistic
                    elements in a way that suggests endorsement, partnership, or
                    affiliation
                  </li>
                  <li>
                    Using ERA visual identity in political, commercial, or
                    advocacy contexts without explicit written authorization
                  </li>
                </ul>

                <h3 className={styles.legal_subsection_title}>
                  4.2 Use of Visual Materials and Designed Content
                </h3>
                <p>
                  All visual materials produced by ERA are protected intellectual
                  property.
                </p>
                <p>Users are strictly prohibited from:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Reusing, republishing, or redistributing ERA visual materials,
                    in whole or in part, without prior written permission
                  </li>
                  <li>
                    Editing, adapting, translating, or modifying visual materials
                    in any form
                  </li>
                  <li>
                    Using ERA visuals within other projects, campaigns, or
                    communications not led or explicitly approved by ERA
                  </li>
                  <li>
                    Removing, altering, or obscuring logos, branding elements, or
                    disclaimers
                  </li>
                  <li>
                    Extracting or reusing individual elements (e.g. layouts, icons,
                    illustrations, templates) for independent use
                  </li>
                </ul>

                <h3 className={styles.legal_subsection_title}>
                  4.3 Permitted Use (Limited Exception)
                </h3>
                <p>
                  Limited use of ERA content is permitted only where all of the
                  following conditions are met:
                </p>
                <ul className={styles.legal_list}>
                  <li>The material is shared in its original, unmodified form</li>
                  <li>ERA is clearly and visibly credited as the source</li>
                  <li>
                    All disclaimers (including EU funding disclaimers, where
                    applicable) are retained in full
                  </li>
                  <li>
                    No implication of endorsement, partnership, or affiliation is
                    created
                  </li>
                </ul>
                <p>Any other use requires prior written authorization.</p>

                <h3 className={styles.legal_subsection_title}>
                  4.4 Prohibition of Misuse and Context Distortion
                </h3>
                <p>ERA content must not be used in a manner that:</p>
                <ul className={styles.legal_list}>
                  <li>Alters its meaning, intent, or context</li>
                  <li>
                    Selectively extracts or reframes content to mislead or
                    manipulate interpretation
                  </li>
                  <li>
                    Creates confusion regarding authorship, ownership, or
                    responsibility
                  </li>
                </ul>

                <h3 className={styles.legal_subsection_title}>4.5 Enforcement</h3>
                <p>
                  Any unauthorized use of ERA&rsquo;s intellectual property,
                  including visual identity and materials, may constitute:
                </p>
                <ul className={styles.legal_list}>
                  <li>Copyright infringement</li>
                  <li>Misrepresentation</li>
                  <li>Unfair competition</li>
                </ul>
                <p>ERA reserves the right to:</p>
                <ul className={styles.legal_list}>
                  <li>Request immediate removal of infringing content</li>
                  <li>Issue formal notices</li>
                  <li>Publicly clarify misuse</li>
                  <li>Pursue legal action where necessary</li>
                </ul>
                <p>
                  ERA actively monitors the use of its materials and visual
                  identity.
                </p>

                <h3 className={styles.legal_subsection_title}>
                  4.6 Interpretation Clause
                </h3>
                <p>
                  The absence of an explicit restriction on a specific use shall
                  not be interpreted as permission.
                </p>
              </LegalSection>

              <LegalSection
                id="content-use"
                number="05"
                title="Use of Content, Publications, and Donor Visibility"
              >
                <p>
                  Users may access and download content solely for personal,
                  educational, and non-commercial use, provided that:
                </p>
                <ul className={styles.legal_list}>
                  <li>ERA is clearly and visibly credited</li>
                  <li>Content is used in its original context and meaning</li>
                  <li>
                    No implication of endorsement, partnership, or affiliation is
                    created
                  </li>
                  <li>
                    All disclaimers, including donor funding disclaimers, are
                    retained in full
                  </li>
                </ul>
                <p>
                  Where content includes references to donor-funded activities,
                  users must not:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    Reuse donor visual identity elements (including the donor
                    emblem) in a misleading way
                  </li>
                  <li>
                    Suggest donor endorsement or funding where none exists
                  </li>
                  <li>
                    Modify or remove required donor visibility elements
                  </li>
                </ul>
                <p>
                  Use of ERA publications must respect academic and professional
                  standards, including accurate citation and faithful
                  representation of findings. Misuse of donor-related elements
                  may result in removal requests and further action.
                </p>
              </LegalSection>

              <LegalSection
                id="no-affiliation"
                number="06"
                title="No Affiliation or Endorsement"
              >
                <p>
                  Use of this website or its content does not grant any right to:
                </p>
                <ul className={styles.legal_list}>
                  <li>
                    Present oneself as affiliated with, endorsed by, or
                    representing ERA
                  </li>
                  <li>
                    Suggest partnership, collaboration, or formal association
                    without explicit written agreement
                  </li>
                </ul>
                <p>
                  ERA reserves the right to publicly clarify or contest any false
                  representation.
                </p>
              </LegalSection>

              <LegalSection
                id="user-content"
                number="07"
                title="User-Provided Content"
              >
                <p>Where users submit content, you warrant that:</p>
                <ul className={styles.legal_list}>
                  <li>You have the legal right to provide such content</li>
                  <li>The content is accurate, lawful, and not misleading</li>
                  <li>
                    The content does not infringe intellectual property, privacy,
                    or other rights
                  </li>
                </ul>
                <p>
                  You grant ERA a non-exclusive, royalty-free right to process
                  such content for operational purposes.
                </p>
                <p>ERA reserves the right to:</p>
                <ul className={styles.legal_list}>
                  <li>Remove, edit, or disregard any submitted content</li>
                  <li>Refuse engagement or publication without justification</li>
                  <li>
                    Retain records where necessary for legal, administrative, or
                    security purposes
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="misuse"
                number="08"
                title="Protection Against Misuse and Misrepresentation"
                variant="muted"
              >
                <p>Users must not use ERA content in a manner that:</p>
                <ul className={styles.legal_list}>
                  <li>Alters its meaning, intent, or context</li>
                  <li>
                    Selectively extracts information to mislead or manipulate
                    interpretation
                  </li>
                  <li>
                    Supports narratives that contradict the original purpose of
                    the content
                  </li>
                </ul>
                <p className={styles.legal_callout}>
                  <FiAlertTriangle aria-hidden />
                  <span>
                    ERA reserves the right to request removal, issue corrections,
                    or take further action in response to misuse.
                  </span>
                </p>
              </LegalSection>

              <LegalSection id="media" number="09" title="Media and Public Use">
                <p>
                  Content from this website may be referenced publicly, including
                  by media, provided that:
                </p>
                <ul className={styles.legal_list}>
                  <li>It is quoted accurately and in full context</li>
                  <li>ERA is clearly identified as the source</li>
                  <li>No misleading framing or reinterpretation is introduced</li>
                </ul>
                <p>
                  ERA reserves the right to respond to or correct any public
                  misrepresentation.
                </p>
              </LegalSection>

              <LegalSection
                id="sensitive"
                number="10"
                title="Sensitive Content and Risk Awareness"
              >
                <p>
                  Given the political and social context of the Western Balkans
                  and Türkiye, certain content may carry heightened sensitivity.
                </p>
                <p>Users must not:</p>
                <ul className={styles.legal_list}>
                  <li>
                    Reproduce or distribute content that may expose individuals
                    or organisations to risk
                  </li>
                  <li>
                    Use information in a way that may endanger activists,
                    communities, or partners
                  </li>
                </ul>
                <p>
                  ERA reserves the right to restrict access to content where
                  safety concerns arise.
                </p>
              </LegalSection>

              <LegalSection id="disclaimer" number="11" title="Disclaimer">
                <p>
                  All content is provided on an &ldquo;as is&rdquo; and &ldquo;as
                  available&rdquo; basis.
                </p>
                <p>ERA does not guarantee that:</p>
                <ul className={styles.legal_list}>
                  <li>Content is complete, accurate, or up to date</li>
                  <li>The website will be uninterrupted, secure, or error-free</li>
                </ul>
                <p>
                  Users assume full responsibility for any reliance placed on the
                  content.
                </p>
              </LegalSection>

              <LegalSection
                id="liability"
                number="12"
                title="Limitation of Liability"
              >
                <p>To the fullest extent permitted by law, ERA shall not be liable for:</p>
                <ul className={styles.legal_list}>
                  <li>Any direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of data, revenue, opportunity, or reputation</li>
                  <li>Misuse or misinterpretation of website content</li>
                  <li>
                    Unauthorized access, cyber incidents, or technical failures
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="third-party"
                number="13"
                title="Third-Party Content and Links"
              >
                <p>This website may include links to third-party platforms.</p>
                <p>ERA:</p>
                <ul className={styles.legal_list}>
                  <li>Does not control or verify third-party content</li>
                  <li>Does not endorse or assume responsibility for such content</li>
                </ul>
                <p>Access to third-party content is at the user&rsquo;s own risk.</p>
              </LegalSection>

              <LegalSection
                id="security"
                number="14"
                title="Security and Integrity"
              >
                <p>Users must not:</p>
                <ul className={styles.legal_list}>
                  <li>Probe, scan, or test system vulnerabilities</li>
                  <li>Breach authentication measures</li>
                  <li>Interfere with system operations</li>
                </ul>
                <p className={styles.legal_callout}>
                  <MdGavel aria-hidden />
                  <span>
                    ERA reserves the right to take appropriate legal action in
                    response to such activities.
                  </span>
                </p>
              </LegalSection>

              <LegalSection
                id="data-protection"
                number="15"
                title="Data Protection"
              >
                <p>Processing of personal data is governed by ERA.</p>
                <p>
                  Users must not misuse or unlawfully process personal data
                  obtained through the website.
                </p>
              </LegalSection>

              <LegalSection
                id="availability"
                number="16"
                title="Availability and Modifications"
              >
                <p>ERA reserves the right, at its sole discretion, to:</p>
                <ul className={styles.legal_list}>
                  <li>Modify, suspend, or discontinue any part of the website</li>
                  <li>Update or remove content without prior notice</li>
                </ul>
                <p>No guarantee is given regarding continuous availability.</p>
              </LegalSection>

              <LegalSection
                id="enforcement"
                number="17"
                title="Enforcement and Discretion"
              >
                <p>ERA retains full discretion to:</p>
                <ul className={styles.legal_list}>
                  <li>Interpret these Terms</li>
                  <li>Determine whether a violation has occurred</li>
                  <li>Decide on appropriate measures</li>
                </ul>
                <p>
                  Such measures may include content removal, access restriction,
                  public clarification, or legal action.
                </p>
                <p>
                  ERA is not obligated to provide prior notice or justification
                  for enforcement actions.
                </p>
                <p>
                  Failure to enforce any provision does not constitute a waiver
                  of rights.
                </p>
              </LegalSection>

              <LegalSection
                id="governing-law"
                number="18"
                title="Governing Law and Jurisdiction"
              >
                <p>
                  These Terms are governed by applicable national legislation
                  and relevant European Union legal frameworks.
                </p>
                <p>
                  Any disputes shall fall under the jurisdiction of competent
                  courts as determined by ERA&rsquo;s place of registration.
                </p>
              </LegalSection>

              <LegalSection
                id="contact"
                number="19"
                title="Contact"
                variant="highlight"
              >
                <p>For questions regarding these Terms, please contact us.</p>
                <LegalContactButton
                  subject="ERA Terms of Use inquiry"
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
