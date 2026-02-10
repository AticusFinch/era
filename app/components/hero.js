"use client";
import styles from "./hero.module.css";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  // Preload gradient image early
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/img/hero/hero-gradient.jpg";
    link.fetchPriority = "high";
    document.head.appendChild(link);

    // Also preload via Image API
    const img = new window.Image();
    img.src = "/img/hero/hero-gradient.jpg";
  }, []);

  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <motion.h1
              className={styles.hero_title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Advancing{" "}
              <span className={styles.hero_title_accent}>LGBTIQA+</span>{" "}
              Equality across the Western Balkans & Türkiye since 2015.
            </motion.h1>
            <motion.h5
              className={styles.hero_subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We connect, empower, and advocate for LGBTIQA+ organizations to
              create a region where every person is free, safe, and equal.
            </motion.h5>
            <motion.div
              className={styles.hero_buttons}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                href="/become-a-member"
                className={styles.hero_button_member}
              >
                Member Organizations
              </Button>
              <Button href="/about-us" className={styles.hero_button_about}>
                About Us
              </Button>
            </motion.div>
          </div>
          <div className={styles.hero_image_container}>
            <Image
              src="/img/hero/hero.png"
              alt="LGBTQIA+ Equality"
              width={2400}
              height={2400}
              priority
              fetchPriority="high"
              loading="eager"
              quality={100}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
