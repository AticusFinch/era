import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Work from "./components/work";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Work />
    </>
  );
}
