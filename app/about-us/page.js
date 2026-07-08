import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import AboutUsView from "./about-us-view";
import styles from "./page.module.css";

export const metadata = {
  title: "About Us | ERA LGBTI",
  description:
    "ERA is a regional umbrella network of 80+ LGBTIQ+ organisations advancing equality, human rights, and community-led change across the Western Balkans and Türkiye.",
};

export default function AboutUsPage() {
  return (
    <>
      <div className={styles.about_page_background}>
        <Navbar />
        <Container>
          <AboutUsView />
        </Container>
        <Footer />
      </div>
    </>
  );
}
