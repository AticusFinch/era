"use client";

import styles from "./publications.module.css";
import Container from "@/app/components/container";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/button";
import Link from "next/link";

import { BsDownload } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const publicationsItems = [
  {
    type: "Book",
    title: "A Guide to the LGBT Community",
    author: "John Doe, Jane Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "Knowledge and Awareness Building for the LGBT Community",
    author: "Jane Doe, John Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "Identity, Diversity, and Inclusion in the LGBT Community",
    author: "John Doe, Jane Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "LGBT Rights and Legal Protections",
    author: "Jane Doe, John Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "LGBT Health and Well-being",
    author: "John Doe, Jane Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "LGBT and the Media",
    author: "Jane Doe, John Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "LGBT and the Workplace",
    author: "John Doe, Jane Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
  {
    type: "Book",
    title: "LGBT and the Education System",
    author: "Jane Doe, John Doe, Kelly Doe, John Doe, Jane Doe, Kelly Doe",
    image: "/img/hero/lgbt.jpg",
  },
];

const Publications = () => {
  return (
    <div className={styles.publications}>
      <Container>
        <motion.h2
          className={`${styles.publications_title} title`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="title-accent">Publications</span>
        </motion.h2>
        <motion.div
          className={styles.publications_items}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {publicationsItems.map((item, index) => (
            <div key={index} className={styles.publications_item}>
              <div className={styles.publications_item_image}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Link
                  href="/publications/a-guide-to-the-lgbt-community"
                  className={styles.publications_item_download}
                >
                  <BsDownload />
                </Link>
              </div>
              <div className={styles.publications_item_text}>
                <span className={styles.publications_item_type}>
                  {item.type}
                </span>
                <div className={styles.publications_item_title_author}>
                  <h3 className={styles.publications_item_title}>
                    {item.title}
                  </h3>
                  <div className={styles.publications_item_authors}>
                    {item.author
                      .split(",")
                      .slice(0, 3)
                      .map((author, authorIndex) => (
                        <p
                          key={authorIndex}
                          className={styles.publications_item_author}
                        >
                          {author.trim()}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          className={styles.publications_button_container}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button href="/publications" className={styles.publications_button}>
            Discover More{" "}
            <IoIosArrowForward className={styles.publications_button_icon} />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default Publications;
