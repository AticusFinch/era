import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";

import { IoIosArrowForward } from "react-icons/io";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const newsItems = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    image: "/img/hero/lgbt.jpg",
    category: "Category",
    date: "2025-01-01",
    readingTime: "10 min read",
  },
];

const News = () => {
  return (
    <div className={styles.news}>
      <Container>
        <h2 className={`${styles.news_title} title`}>
          <span className="title-accent">News</span>
        </h2>
        <div className={styles.news_items}>
          {newsItems.map((item, index) => (
            <div key={index} className={styles.news_item}>
              <div className={`${styles.news_item_text} text`}>
                <span className={styles.news_item_category}>
                  {item.category}
                </span>
                <h3 className={styles.news_item_title}>{item.title}</h3>
                <div className={styles.news_item_info}>
                  <span className={styles.news_item_date}>
                    <CiCalendarDate />
                    {item.date}
                  </span>
                  <span className={styles.news_item_readingTime}>
                    <IoReaderOutline />
                    {item.readingTime}
                  </span>
                </div>
              </div>
              <div className={styles.news_item_image}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={4000}
                  height={6000}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.news_button_container}>
          <Button href="/news" className={styles.news_button}>
            Read More <IoIosArrowForward className={styles.news_button_icon} />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default News;
