import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import PartnersAndDonorsView from "./partners-and-donors-view";

export const metadata = {
  title: "Donors and Partners | ERA LGBTI",
  description:
    "With gratitude for support since 2015 — organisations and institutions that have supported, partnered, or cooperated with ERA across the Western Balkans and Türkiye.",
};

export default function PartnersAndDonorsPage() {
  return (
    <>
      <Navbar />
      <Container>
        <PartnersAndDonorsView />
      </Container>
      <Footer />
    </>
  );
}
