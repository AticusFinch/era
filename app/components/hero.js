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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            >
              Building the regional infrastructure for{" "}
              <span className="title-accent">LGBTIQ+</span> equality across the
              Western Balkans and Türkiye.
            </motion.h1>
            <motion.h5
              className={styles.hero_subtitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
            >
              ERA connects, strengthens, funds, and represents LGBTIQ+
              organisations and communities across the region, turning local
              struggles into regional and international power, evidence,
              advocacy, and action.
            </motion.h5>
            <motion.div
              className={styles.hero_buttons}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
            >
              <Button
                href="/about-us/member-organizations"
                className={styles.hero_button_member}
              >
                Member Organizations
              </Button>
              <Button href="/about-us" className={styles.hero_button_about}>
                About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
      <div className={styles.hero_image_container}>
        <Image
          src="/img/hero/flag.png"
          alt="LGBTQIA+ Equality"
          fill
          className={styles.hero_image}
          sizes="(min-width: 1280px) 60vw, (min-width: 768px) 55vw, 0vw"
          priority
          fetchPriority="high"
          loading="eager"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Hero;
