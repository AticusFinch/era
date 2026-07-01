"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MdOutlineArrowForward, MdClose } from "react-icons/md";
import carouselStyles from "../../components/resources.module.css";
import styles from "./page.module.css";

const DESKTOP_GRID_QUERY = "(min-width: 1024px)";

function useDesktopGrid() {
  const [isDesktopGrid, setIsDesktopGrid] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_GRID_QUERY);
    const update = () => setIsDesktopGrid(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktopGrid;
}

function normalizeBioParagraphs(bio) {
  if (!bio) return [];
  const items = Array.isArray(bio) ? bio : [bio];
  return items
    .map((paragraph) =>
      String(paragraph)
        .replace(/\[Text Wrapping Break\]/gi, " ")
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function hasBio(bio) {
  return normalizeBioParagraphs(bio).length > 0;
}

function MemberBio({ bio }) {
  const paragraphs = normalizeBioParagraphs(bio);

  return (
    <div className={styles.team_card_dialog_bio}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.team_card_dialog_bio_p}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function MemberCard({ member, variant = "team" }) {
  const dialogRef = useRef(null);

  const openBio = () => dialogRef.current?.showModal();
  const closeBio = () => dialogRef.current?.close();

  return (
    <>
      <article
        className={`${styles.team_card} ${variant === "board" ? styles.team_card_board : ""}`}
      >
        <div className={styles.team_card_image_wrap}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 12vw, (min-width: 640px) 42vw, 78vw"
            className={styles.team_card_image}
          />
        </div>
        <div className={styles.team_card_body}>
          <p className={styles.team_card_role}>{member.role}</p>
          <h3 className={styles.team_card_name}>{member.name}</h3>
          {hasBio(member.bio) ? (
            <button
              type="button"
              className={styles.team_card_know_btn}
              onClick={openBio}
            >
              Learn more about me
              <MdOutlineArrowForward aria-hidden />
            </button>
          ) : (
            member.organization && (
              <p className={styles.team_card_org}>{member.organization}</p>
            )
          )}
        </div>
      </article>
      {hasBio(member.bio) && (
        <dialog
          ref={dialogRef}
          className={styles.team_card_dialog}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeBio();
          }}
        >
          <div className={styles.team_card_dialog_inner}>
            <button
              type="button"
              className={styles.team_card_dialog_close}
              onClick={closeBio}
              aria-label="Close"
            >
              <MdClose aria-hidden />
            </button>
            <div className={styles.team_card_dialog_layout}>
              <div
                className={`${styles.team_card_dialog_media} ${variant === "board" ? styles.team_card_dialog_media_board : ""}`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 560px) 13rem, 100vw"
                  className={styles.team_card_dialog_image}
                />
              </div>
              <div className={styles.team_card_dialog_content}>
                <div className={styles.team_card_dialog_header}>
                  <p className={styles.team_card_dialog_role}>{member.role}</p>
                  <h3 className={styles.team_card_dialog_name}>
                    {member.name}
                  </h3>
                  {member.organization?.trim() && (
                    <p className={styles.team_card_dialog_org}>
                      {member.organization}
                    </p>
                  )}
                </div>
                <MemberBio bio={member.bio} />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

function MemberRow({ members, variant }) {
  return (
    <div className={styles.team_carousel_breakout}>
      <div
        className={styles.team_members_row}
        data-member-count={members.length}
      >
        {members.map((member) => (
          <MemberCard key={member.id} member={member} variant={variant} />
        ))}
      </div>
    </div>
  );
}

const CarouselPagination = memo(function CarouselPagination({
  scrollSnaps,
  selectedIndex,
  onSelect,
  label,
}) {
  if (scrollSnaps.length <= 1) return null;

  return (
    <div
      className={`${carouselStyles.resources_carousel_pagination} ${styles.team_carousel_pagination}`}
      role="tablist"
      aria-label={label}
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
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={index === selectedIndex}
        />
      ))}
    </div>
  );
});

function MemberCarousel({ members, variant, ariaLabel }) {
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
      loop: true,
      dragFree: false,
      slidesToScroll: 1,
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

  return (
    <div className={styles.team_carousel_breakout}>
      <div
        className={styles.team_carousel_shell}
        data-member-count={members.length}
      >
        <div
          ref={emblaRef}
          className={`${carouselStyles.resources_carousel} ${styles.team_carousel_viewport}`}
        >
          <div className={carouselStyles.resources_slider}>
            {members.map((member) => (
              <div
                key={member.id}
                className={`${carouselStyles.resources_slide} ${styles.team_carousel_slide}`}
              >
                <div className={styles.team_carousel_slide_inner}>
                  <MemberCard member={member} variant={variant} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <CarouselPagination
          scrollSnaps={scrollSnaps}
          selectedIndex={selectedIndex}
          onSelect={scrollTo}
          label={ariaLabel}
        />
      </div>
    </div>
  );
}

export default function OurTeamCarousel({
  members,
  variant = "team",
  ariaLabel = "Team members carousel",
}) {
  const isDesktopGrid = useDesktopGrid();

  if (isDesktopGrid) {
    return <MemberRow members={members} variant={variant} />;
  }

  return (
    <MemberCarousel members={members} variant={variant} ariaLabel={ariaLabel} />
  );
}
