import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import ContactView from "./contact-view";

export const metadata = {
  title: "Contact | ERA LGBTI",
  description:
    "Get in touch with ERA LGBTI. Send us a message about partnerships, media inquiries, membership, or general questions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Container>
        <ContactView />
      </Container>
      <Footer />
    </>
  );
}
