"use client";

import styles from "./donate.module.css";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import { motion } from "framer-motion";

const Donate = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <motion.div
            className={`${styles.half} ${styles.half_member}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <h2 className={styles.title}>Become a member</h2>
            <p className={styles.description}>
              Join ERA and help us promote equality and inclusion for all.
            </p>
            <div>
              <Button href="/become-a-member">Become a member</Button>
            </div>
          </motion.div>
          <motion.div
            className={`${styles.half} ${styles.half_donate}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            <h2 className={styles.title}>Donate to ERA</h2>
            <p className={styles.description}>
              Your support helps us continue our work in promoting equality and
              inclusion for all.
            </p>
            <div>
              <Button href="/donate" className={styles.button_donate}>
                Donate
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Donate;
