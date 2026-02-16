"use client";

import styles from "./counter.module.css";
import Container from "@/app/components/container";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const counterItems = [
  {
    end: 80,
    suffix: "+",
    label: "Member Organizations",
  },
  {
    end: 9,
    suffix: "",
    label: "Operating Countries",
  },
  {
    end: 10,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    end: 50,
    suffix: "+",
    label: "Projects Completed",
  },
];

export default function Counter() {
  return (
    <div className={styles.counter}>
      <Container>
        <motion.h2
          className={`${styles.counter_title} title`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Let's talk in <span className="title-accent">numbers</span>
        </motion.h2>
        <motion.div
          className={styles.counter_items}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {counterItems.map((item, index) => (
            <motion.div
              key={index}
              className={styles.counter_item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <CountUp
                start={0}
                end={item.end}
                duration={2.5}
                separator=","
                suffix={item.suffix}
                enableScrollSpy={true}
                scrollSpyOnce={true}
              >
                {({ countUpRef }) => (
                  <h3
                    className={`${styles.counter_number} title-accent-secondary`}
                    ref={countUpRef}
                  />
                )}
              </CountUp>
              <p className={styles.counter_label}>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
      <div className={styles.counter_wave} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z"
            fill="var(--color-font-primary)"
          />
        </svg>
      </div>
    </div>
  );
}
