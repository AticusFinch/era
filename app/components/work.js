"use client";
import styles from "./work.module.css";
import Container from "@/app/components/container";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFolderOpen,
  FaGraduationCap,
  FaUsers,
  FaHandsHelping,
  FaGavel,
  FaMicroscope,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { IoIosArrowBack } from "react-icons/io";

const workItems = [
  {
    title: "Projects",
    description: "Our ongoing initiatives and collaborative programs",
    href: "/our-work/projects",
    icon: FaFolderOpen,
  },
  {
    title: "Training Hub",
    description: "Educational resources and capacity building programs",
    href: "/our-work/publications",
    icon: FaGraduationCap,
  },
  {
    title: "WLW & TNBI Caucuses",
    description: "Supporting women who love women and trans communities",
    href: "/our-work/publications",
    icon: FaUsers,
  },
  {
    title: "Community Support",
    description: "Services and resources for our community members",
    href: "/our-work/publications",
    icon: FaHandsHelping,
  },
  {
    title: "Advocacy",
    description: "Policy work and rights-based initiatives",
    href: "/our-work/publications",
    icon: FaGavel,
  },
  {
    title: "Research",
    description: "Studies and insights on LGBTQI+ issues",
    href: "/our-work/publications",
    icon: FaMicroscope,
  },
  {
    title: "Events",
    description: "Conferences, workshops, and community gatherings",
    href: "/our-work/publications",
    icon: FaCalendarAlt,
  },
];

const Work = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.work}>
      <Container>
        <div className={styles.work_container}>
          <div className={styles.work_text}>
            <motion.h2
              className={`${styles.work_title} title`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="title-accent">Our Work</span>
            </motion.h2>
            <motion.p
              className={`${styles.work_subtitle} text`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </motion.p>
          </div>
          <div className={styles.work_carousel_wrapper}>
            <div className={styles.work_carousel} ref={emblaRef}>
              <div className={styles.work_links}>
                {workItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.title} className={styles.work_slide}>
                      <motion.div
                        className={styles.work_link}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <Link
                          href={item.href}
                          className={styles.work_link_content}
                        >
                          <div className={styles.work_link_icon}>
                            <IconComponent />
                          </div>
                          <div className={styles.work_link_text}>
                            <h5 className={styles.work_link_title}>
                              {item.title}
                            </h5>
                            <p className={styles.work_link_description}>
                              {item.description}
                            </p>
                          </div>
                          <div className={styles.work_link_arrow}>
                            <IoIosArrowForward />
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            {scrollSnaps.length > 1 && (
              <div className={styles.work_carousel_buttons}>
                <button
                  className={`${styles.work_carousel_button} ${styles.work_carousel_button_prev}`}
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  aria-label="Previous slide"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  className={`${styles.work_carousel_button} ${styles.work_carousel_button_next}`}
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  aria-label="Next slide"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Work;
