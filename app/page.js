import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Work from "./components/work";
import NewsWrapper from "./components/news-wrapper";
import PublicationsWrapper from "./components/publications-wrapper";
import Counter from "./components/counter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Work />
      <NewsWrapper />
      <PublicationsWrapper />
      <Counter />
      <Footer />
    </>
  );
}
