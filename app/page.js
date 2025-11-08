import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Work from "./components/work";
import News from "./components/news";
import Publications from "./components/publications";
import Counter from "./components/counter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Work />
      <News />
      <Publications />
      <Counter />
      <Footer />
    </>
  );
}
