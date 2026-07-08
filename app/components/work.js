"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MdOutlineArrowForward, MdOutlineWorkOutline } from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Container from "@/app/components/container";
import Button from "@/app/components/button";
import { ourWorkSubnavLinks } from "@/lib/data/our-work-nav";
import styles from "./work.module.css";

const workItems = [
  {
    ...ourWorkSubnavLinks[0],
    description:
      "Ongoing initiatives and collaborative programmes across the region.",
  },
  {
    ...ourWorkSubnavLinks[1],
    description:
      "Educational resources and capacity-building for movement leadership.",
  },
  {
    ...ourWorkSubnavLinks[2],
    description:
      "Spaces supporting women who love women and trans communities.",
  },
  {
    ...ourWorkSubnavLinks[3],
    description: "Services, solidarity, and resources for community members.",
  },
  {
    ...ourWorkSubnavLinks[4],
    description: "Policy work and rights-based initiatives at every level.",
  },
  {
    ...ourWorkSubnavLinks[5],
    description:
      "Evidence and insights on LGBTIQ+ realities across the region.",
  },
  {
    ...ourWorkSubnavLinks[6],
    description: "Conferences, workshops, and community gatherings.",
  },
];

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

const carouselStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

function getSlideVariants(y) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
}

function WorkCard({ item, index, variants }) {
  const Icon = item.Icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article className={styles.work_card} variants={variants}>
      <Link href={item.href} className={styles.work_card_link}>
        <div className={styles.work_card_top}>
          <span className={styles.work_card_index} aria-hidden>
            {number}
          </span>
          <div className={styles.work_card_icon} aria-hidden>
            <Icon />
          </div>
        </div>
        <div className={styles.work_card_body}>
          <h3 className={styles.work_card_title}>{item.label}</h3>
          <p className={styles.work_card_description}>{item.description}</p>
          <span className={styles.work_card_cta}>
            Explore
            <MdOutlineArrowForward aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

const Work = () => {
  const prefersReducedMotion = useReducedMotion();
  const y = prefersReducedMotion ? 0 : 24;
  const fadeUp = getFadeUpVariants(y);
  const slideVariants = getSlideVariants(prefersReducedMotion ? 0 : 20);

  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 4000,
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

  useEffect(() => {
    if (!emblaApi) return;

    const lockCarouselHeight = () => {
      const viewport = emblaApi.rootNode();
      const slides = emblaApi.slideNodes();
      if (!viewport || !slides.length) return;

      viewport.style.minHeight = "";
      const maxHeight = Math.max(
        ...slides.map((slide) => slide.getBoundingClientRect().height),
      );

      if (maxHeight > 0) {
        viewport.style.minHeight = `${Math.ceil(maxHeight)}px`;
      }
    };

    lockCarouselHeight();
    emblaApi.on("reInit", lockCarouselHeight);

    const resizeObserver = new ResizeObserver(lockCarouselHeight);
    emblaApi.slideNodes().forEach((slide) => resizeObserver.observe(slide));

    return () => {
      emblaApi.off("reInit", lockCarouselHeight);
      resizeObserver.disconnect();
    };
  }, [emblaApi]);

  return (
    <section className={styles.work} aria-labelledby="our-work-heading">
      <Container>
        <div className={styles.work_container}>
          <header className={styles.work_header}>
            <motion.div
              className={styles.work_header_main}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
            >
              <h2
                id="our-work-heading"
                className={`${styles.work_title} title`}
              >
                <span className="title-accent">Our Work</span>
              </h2>
              <p className={styles.work_description}>
                Advancing LGBTI+ rights, equality, and inclusion across the
                Western Balkans and Türkiye through advocacy, capacity building,
                research, public awareness, and international engagement.
              </p>
            </motion.div>
          </header>

          <div className={styles.work_carousel_wrapper}>
            <div className={styles.work_carousel} ref={emblaRef}>
              <motion.div
                className={styles.work_slider}
                variants={carouselStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              >
                {workItems.map((item, index) => (
                  <div key={item.href} className={styles.work_slide}>
                    <WorkCard
                      item={item}
                      index={index}
                      variants={slideVariants}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {scrollSnaps.length > 1 && (
              <div
                className="carousel-pagination"
                aria-label="Our work areas pagination"
              >
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`carousel-dot ${
                      index === selectedIndex ? "carousel-dot-active" : ""
                    }`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === selectedIndex ? "true" : "false"}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            className={styles.work_button_container}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: 0.1 }}
          >
            <Button href="/our-work" className={styles.work_button}>
              Explore Our Work
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Work;
