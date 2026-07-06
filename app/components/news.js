"use client";

import styles from "./news.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/button";
import { motion, useReducedMotion } from "framer-motion";
import { MdOutlineArrowForward } from "react-icons/md";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const MAX_GRID_ITEMS = 4;

function getFadeUpVariants(y) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

const gridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function CarouselCard({ item }) {
  return (
    <article className={styles.news_carousel_card}>
      <Link
        href={`/news/${item.slug}`}
        className={styles.news_carousel_card_link}
        aria-label={`Read ${item.title}`}
      >
        <div className={styles.news_carousel_card_media}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="85vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.news_carousel_card_body}>
          <span className={styles.news_card_category}>{item.category}</span>
          <h3 className={styles.news_carousel_card_title}>{item.title}</h3>
          {item.excerpt && (
            <p className={styles.news_carousel_card_excerpt}>{item.excerpt}</p>
          )}
          <div className={styles.news_card_meta}>
            <span>
              <CiCalendarDate aria-hidden />
              {item.date}
            </span>
            <span>
              <IoReaderOutline aria-hidden />
              {item.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function FeaturedCard({ item }) {
  return (
    <article className={styles.news_featured}>
      <Link
        href={`/news/${item.slug}`}
        className={styles.news_featured_link}
        aria-label={item.title}
      >
        <div className={styles.news_featured_media}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className={styles.news_featured_body}>
          <span className={styles.news_card_category}>{item.category}</span>
          <h3 className={styles.news_featured_title}>{item.title}</h3>
          {item.excerpt && (
            <p className={styles.news_featured_excerpt}>{item.excerpt}</p>
          )}
          <div className={styles.news_card_meta}>
            <span>
              <CiCalendarDate aria-hidden />
              {item.date}
            </span>
            <span>
              <IoReaderOutline aria-hidden />
              {item.readingTime}
            </span>
          </div>
          <span className={styles.news_featured_cta}>
            Read article
            <MdOutlineArrowForward aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

function GridCard({ item }) {
  return (
    <motion.div className={styles.news_card} variants={gridItem}>
      <Link
        href={`/news/${item.slug}`}
        className={styles.news_card_link}
        aria-label={`Read ${item.title}`}
      >
        <div className={styles.news_card_media}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 220px, 45vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.news_card_body}>
          <span className={styles.news_card_category}>{item.category}</span>
          <h3 className={styles.news_card_title}>{item.title}</h3>
          {item.excerpt && (
            <p className={styles.news_card_excerpt}>{item.excerpt}</p>
          )}
          <div className={styles.news_card_meta}>
            <span>
              <CiCalendarDate aria-hidden />
              {item.date}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const News = ({ newsItems = [], debugInfo = null }) => {
  const prefersReducedMotion = useReducedMotion();
  const y = prefersReducedMotion ? 0 : 24;
  const fadeUp = getFadeUpVariants(y);

  const newsItemsList = newsItems.length > 0 ? newsItems : [];
  const featuredItem = newsItemsList[0] ?? null;
  const gridItems = newsItemsList.slice(1, 1 + MAX_GRID_ITEMS);

  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      dragFree: false,
      loop: false,
    },
    [autoplayPlugin],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [emblaApi]);

  return (
    <section className={styles.news} aria-labelledby="latest-news-heading">
      <Container>
        <div className={styles.news_container}>
          <header className={styles.news_header}>
            <motion.div
              className={styles.news_header_main}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
            >
              <div className={styles.news_title_row}>
                <h2
                  id="latest-news-heading"
                  className={`${styles.news_title} title`}
                >
                  <span className="title-accent">Latest News</span>
                </h2>
              </div>
              <p className={styles.news_description}>
                Regional advocacy, programme highlights, and perspectives from
                across the Western Balkans and Türkiye.
              </p>
            </motion.div>
          </header>

          {newsItemsList.length > 0 ? (
            <div className={styles.news_body}>
              <div className={styles.news_carousel_wrapper}>
                <div className={styles.news_carousel} ref={emblaRef}>
                  <div className={styles.news_slider}>
                    {newsItemsList.map((item, index) => (
                      <div
                        key={item.id || index}
                        className={styles.news_slide}
                      >
                        <CarouselCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
                {scrollSnaps.length > 1 && (
                  <div
                    className={styles.news_carousel_pagination}
                    aria-label="News carousel pagination"
                  >
                    {scrollSnaps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.news_carousel_dot} ${
                          index === selectedIndex
                            ? styles.news_carousel_dot_active
                            : ""
                        }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to article ${index + 1}`}
                        aria-current={
                          index === selectedIndex ? "true" : "false"
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.news_desktop}>
                {featuredItem && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-6% 0px" }}
                    transition={{ delay: 0.05 }}
                  >
                    <FeaturedCard item={featuredItem} />
                  </motion.div>
                )}

                {gridItems.length > 0 && (
                  <motion.div
                    className={styles.news_grid}
                    variants={gridStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-6% 0px" }}
                  >
                    {gridItems.map((item, index) => (
                      <GridCard key={item.id || index} item={item} />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.news_empty}>
              <p>No news available at the moment.</p>
              {debugInfo && (
                <pre className={styles.news_debug}>
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              )}
            </div>
          )}

          <motion.div
            className={styles.news_button_container}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: 0.1 }}
          >
            <Button href="/news" className={styles.news_button}>
              Read more
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default News;
