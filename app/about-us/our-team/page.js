import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import OurTeamView from "./our-team-view";
import styles from "./page.module.css";

export const metadata = {
  title: "Our Team | ERA LGBTI",
  description:
    "Meet the ERA secretariat and Board — regional leaders advancing LGBTIQ equality through coordinated action, evidence-based approaches, and policy engagement.",
};

export default function OurTeamPage() {
  return (
    <>
      <div className={styles.team_page_background}>
        <Navbar />
        <Container>
          <OurTeamView />
        </Container>
        <Footer />
      </div>
    </>
  );
}
