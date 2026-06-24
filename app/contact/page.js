import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import ContactForm from "./contact-form";
import styles from "./page.module.css";
import { MdEmail } from "react-icons/md";
import PageUnderConstruction from "../components/pageUnderConstruction";

export const metadata = {
  title: "Contact | ERA LGBTI",
  description:
    "Get in touch with ERA LGBTI. Send us a message about partnerships, media inquiries, membership, or general questions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageUnderConstruction />
      {/* <main className={styles.contact_page}>
        <Container>
          <header className={styles.contact_header}>
            <h1 className={styles.contact_title}>
              <span className="title-accent">Contact</span>
            </h1>
            <p className={styles.contact_intro}>
              Whether you have a question about our work, want to explore a
              partnership, or need to reach our team, we would love to hear
              from you. Fill out the form and we will respond as soon as we
              can.
            </p>
          </header>

          <div className={styles.contact_layout}>
            <aside className={styles.contact_aside}>
              <div className={styles.contact_info_card}>
                <p className={styles.contact_info_label}>Email</p>
                <p className={styles.contact_info_text}>
                  For direct correspondence, you can reach us at:
                </p>
                <Link
                  href="mailto:office@lgbti-era.org"
                  className={styles.contact_email_link}
                >
                  <MdEmail aria-hidden />
                  office@lgbti-era.org
                </Link>
              </div>

              <div className={styles.contact_info_card}>
                <p className={styles.contact_info_label}>Response time</p>
                <p className={styles.contact_info_text}>
                  We aim to reply to all inquiries within a few business days.
                  Thank you for your patience.
                </p>
              </div>
            </aside>

            <ContactForm />
          </div>
        </Container>
      </main> */}
      <Footer />
    </>
  );
}
