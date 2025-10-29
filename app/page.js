import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.test}>
        <h1>Hello World</h1>
      </div>
    </>
  );
}
