import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Container from "../../components/container";
import WhoWeAreView from "./who-we-are-view";

export const metadata = {
  title: "Who We Are | ERA LGBTI",
  description:
    "ERA-LGBTI is a regional network of civil society organisations advancing human rights, equality, and social justice for LGBTIQ people across the Western Balkans and Türkiye.",
};

export default function WhoWeArePage() {
  return (
    <>
      <Navbar />
      <Container>
        <WhoWeAreView />
      </Container>
      <Footer />
    </>
  );
}
