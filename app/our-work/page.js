import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import OurWorkView from "./our-work-view";

export const metadata = {
  title: "Our Work | ERA LGBTI",
  description:
    "ERA's advocacy, capacity building, research, public awareness, and international engagement across the Western Balkans and Türkiye.",
};

export default function OurWork() {
  return (
    <>
      <Navbar />
      <Container>
        <OurWorkView />
      </Container>
      <Footer />
    </>
  );
}
