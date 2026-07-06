"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  memo,
} from "react";
import styles from "./page.module.css";
import carouselStyles from "../components/resources.module.css";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { IoMdArrowDropright } from "react-icons/io";
import {
  FaGavel,
  FaPeopleGroup,
  FaMicroscope,
  FaBullhorn,
  FaEarthEurope,
} from "react-icons/fa6";

const pillars = [
  {
    id: "advocacy-policy",
    title: "Advocacy and Policy Influence",
    paragraphs: [
      "Advocacy and Policy Influence lie at the heart of our mission. We work closely with national governments, EU institutions, and international organizations to promote stronger anti-discrimination legislation, legal protections, and inclusive policies. Through direct engagement with policymakers, we ensure that LGBTI+ rights remain a priority on political agendas, influencing decision-making at local, national, and regional levels.",
      "Our advocacy efforts are backed by rigorous research, legal expertise, and strategic campaigns, ensuring that we address the systemic barriers and challenges faced by LGBTI+ communities. As a recognized stakeholder in the EU enlargement process, we actively contribute to policy discussions, monitoring the implementation of human rights standards and reforms in the region.",
    ],
    Icon: FaGavel,
  },
  {
    id: "capacity-building",
    title: "Capacity Building and Movement Strengthening",
    paragraphs: [
      "Strengthening the capacities of LGBTI+ organizations and activists is a key component of our work. We provide tailored training, mentorship, and leadership development to ensure that organizations and individuals have the skills, knowledge, and resources needed to advocate effectively and build sustainable movements.",
      "Through strategic networking opportunities, we foster cross-border cooperation and peer learning, helping our members adapt to complex political environments, respond to crises, and amplify their impact. We also support grassroots initiatives by providing access to funding opportunities, capacity-strengthening programs, and expert guidance to enhance their operational resilience.",
    ],
    Icon: FaPeopleGroup,
  },
  {
    id: "research",
    title: "Research and Evidence-Based Advocacy",
    paragraphs: [
      "Research is a fundamental tool in our approach, enabling us to document realities, highlight gaps in protection, and inform advocacy strategies. ERA conducts regional studies on discrimination, hate crimes, social attitudes, and policy frameworks, producing evidence-based reports that strengthen the case for legal and institutional reforms.",
      "ERA continuously supports its member organizations in their national advocacy efforts by different means. Our evidence-based approach and the data we produce not only shape our own strategies but also serve as essential resources for policymakers, civil society organizations, and international bodies. By continuously monitoring trends, challenges, and progress, we ensure that our work remains relevant and responsive to the evolving needs of LGBTI+ communities.",
    ],
    Icon: FaMicroscope,
  },
  {
    id: "public-awareness",
    title: "Public Awareness and Social Change",
    paragraphs: [
      "Our public awareness and social change initiatives seek to transform societal perceptions and challenge deep-seated prejudices against LGBTI+ people. We use innovative communication strategies, storytelling, education programs, and media engagement to counter misinformation, foster empathy, and create inclusive narratives.",
      "Through national and regional campaigns, we work to break stereotypes, increase public support for LGBTI+ rights, and encourage active allyship.",
    ],
    Icon: FaBullhorn,
  },
  {
    id: "international-eu",
    title: "International and EU-Level Advocacy",
    paragraphs: [
      "On an international level, ERA plays a critical role in advancing LGBTI+ rights within the EU integration process and global human rights frameworks. We work closely with the European Commission, European Parliament, and international institutions to ensure that LGBTI+ issues are prioritized in policy discussions, funding mechanisms, and human rights reports.",
      "Our engagement in EU advocacy includes monitoring accession processes, ensuring alignment with human rights standards, and advocating for the inclusion of LGBTI+ indicators in EU programs. Beyond the EU, we collaborate with UN agencies, international human rights organizations, and global LGBTI+ networks, reinforcing the importance of intersectional and regionally specific approaches in addressing human rights violations.",
    ],
    Icon: FaEarthEurope,
  },
];

const MOTION_EASE = [0.22, 1, 0.36, 1];
const MOTION_DURATION = 0.45;
const PILLAR_COUNT = pillars.length;
const loopPillars = [...pillars, ...pillars];

const PillarCard = memo(function PillarCard({ pillar, index }) {
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;

  const innerRef = useRef(null);
  const [heights, setHeights] = useState({
    collapsed: null,
    expanded: null,
  });

  const Icon = pillar.Icon;

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      el.classList.remove(styles.our_work_body_inner_collapsed);
      const expandedH = el.scrollHeight;
      el.classList.add(styles.our_work_body_inner_collapsed);
      const collapsedH = el.scrollHeight;
      setHeights({ collapsed: collapsedH, expanded: expandedH });
      if (expandedRef.current) {
        el.classList.remove(styles.our_work_body_inner_collapsed);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pillar.id]);

  const hCollapsed = heights.collapsed ?? 96;
  const hExpanded = heights.expanded ?? hCollapsed;

  return (
    <article className={styles.our_work_card}>
      <div className={styles.our_work_card_top}>
        <span className={styles.our_work_card_index} aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className={styles.our_work_card_icon} aria-hidden>
          <Icon />
        </div>
      </div>
      <div className={styles.our_work_card_body}>
        <h2 className={styles.our_work_card_title}>{pillar.title}</h2>
        <motion.div
          className={styles.our_work_card_intro_motion}
          initial={false}
          animate={{ height: expanded ? hExpanded : hCollapsed }}
          transition={{ duration: MOTION_DURATION, ease: MOTION_EASE }}
          onAnimationStart={() => {
            const el = innerRef.current;
            if (!el) return;
            if (expandedRef.current) {
              el.classList.remove(styles.our_work_body_inner_collapsed);
            }
          }}
          onAnimationComplete={() => {
            const el = innerRef.current;
            if (!el) return;
            if (!expandedRef.current) {
              el.classList.add(styles.our_work_body_inner_collapsed);
            }
          }}
        >
          <div
            ref={innerRef}
            className={`${styles.our_work_text_stack} ${styles.our_work_card_intro} ${!expanded ? styles.our_work_body_inner_collapsed : ""}`}
          >
            {pillar.paragraphs.map((text, i) => (
              <p key={i} className={styles.our_work_section_body}>
                {text}
              </p>
            ))}
          </div>
        </motion.div>
        <button
          type="button"
          className={styles.our_work_read_more}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
          <IoMdArrowDropright
            className={expanded ? styles.our_work_read_more_chevron_open : ""}
            aria-hidden
          />
        </button>
      </div>
    </article>
  );
});

const CarouselPagination = memo(function CarouselPagination({
  scrollSnaps,
  selectedIndex,
  onSelect,
}) {
  if (scrollSnaps.length <= 1) return null;

  return (
    <div
      className={`${carouselStyles.resources_carousel_pagination} ${styles.our_work_carousel_pagination}`}
      role="tablist"
      aria-label="Pillar carousel"
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          className={`${carouselStyles.resources_carousel_dot} ${
            index === selectedIndex
              ? carouselStyles.resources_carousel_dot_active
              : ""
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Go to pillar ${index + 1}`}
          aria-selected={index === selectedIndex}
        />
      ))}
    </div>
  );
});

export default function OurWorkPillars() {
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
      dragFree: false,
      loop: false,
    },
    [autoplayPlugin],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (i) => {
      if (emblaApi) emblaApi.scrollTo(i);
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

  return (
    <div className={styles.our_work_sections}>
      <div className={styles.our_work_carousel_shell}>
        <div
          ref={emblaRef}
          className={`${carouselStyles.resources_carousel} ${styles.our_work_carousel_viewport}`}
        >
          <div className={carouselStyles.resources_slider}>
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className={`${carouselStyles.resources_slide} ${styles.our_work_pillars_slide}`}
              >
                <div className={styles.our_work_carousel_slide}>
                  <PillarCard pillar={pillar} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <CarouselPagination
          scrollSnaps={scrollSnaps}
          selectedIndex={selectedIndex}
          onSelect={scrollTo}
        />
      </div>
    </div>
  );
}
