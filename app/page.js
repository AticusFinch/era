import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Work from "./components/work";
import NewsWrapper from "./components/news-wrapper";
import ResourcesWrapper from "./components/resources-wrapper";
import Counter from "./components/counter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Work /> */}
      <NewsWrapper />
      <ResourcesWrapper />
      <Counter />
      <Footer />
    </>
  );
}
