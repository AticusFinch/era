import styles from "./hero.module.css";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>
              Advancing LGBTQIA+ Equality across the Western Balkans & Türkiye
              since 2015.
            </h1>
            <h2 className={styles.hero_subtitle}>
              We connect, empower, and advocate for LGBQIA+ organizations to
              create a region where every person is free, safe, and equal.
            </h2>
            <div className={styles.hero_buttons}>
              <Button
                href="/member-organizations"
                className={styles.hero_button_member}
              >
                Member Organizations
              </Button>
              <Button href="/about-us" className={styles.hero_button_about}>
                About Us
              </Button>
            </div>
          </div>
          <div className={styles.hero_image_container}>
            <div className={styles.hero_image}>
              <Image
                src="/img/hero/lgbt.jpg"
                alt="LGBTQIA+ Equality"
                width={6000}
                height={4000}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
