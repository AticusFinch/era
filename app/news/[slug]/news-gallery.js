"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import styles from "./news-gallery.module.css";

export default function NewsGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [portalMounted, setPortalMounted] = useState(false);

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length,
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, images.length]);

  if (!images.length) return null;

  const lightbox =
    selectedIndex !== null && portalMounted
      ? createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              type="button"
              className={styles.lightbox_close}
              onClick={() => setSelectedIndex(null)}
              aria-label="Close preview"
            >
              <FiX aria-hidden />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.lightbox_nav} ${styles.lightbox_nav_prev}`}
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + images.length) % images.length,
                    )
                  }
                  aria-label="Previous image"
                >
                  <FiChevronLeft aria-hidden />
                </button>
                <button
                  type="button"
                  className={`${styles.lightbox_nav} ${styles.lightbox_nav_next}`}
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % images.length)
                  }
                  aria-label="Next image"
                >
                  <FiChevronRight aria-hidden />
                </button>
              </>
            )}
            <div className={styles.lightbox_media}>
              <Image
                src={images[selectedIndex].src}
                alt={
                  images[selectedIndex].alt ||
                  `Gallery image ${selectedIndex + 1}`
                }
                width={images[selectedIndex].width}
                height={images[selectedIndex].height}
                className={styles.lightbox_image}
                sizes="100vw"
                priority
              />
            </div>
            <p className={styles.lightbox_counter}>
              {selectedIndex + 1} / {images.length}
            </p>
          </div>,
          document.body,
        )
      : null;

  return (
    <section className={styles.gallery} aria-label="Photo gallery">
      <div className={styles.gallery_header}>
        <h2 className={styles.gallery_title}>Gallery</h2>
        {images.length > 1 && (
          <div className={styles.gallery_controls}>
            <button
              type="button"
              className={styles.gallery_control}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous image"
            >
              <FiChevronLeft aria-hidden />
            </button>
            <button
              type="button"
              className={styles.gallery_control}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next image"
            >
              <FiChevronRight aria-hidden />
            </button>
          </div>
        )}
      </div>

      <div className={styles.gallery_viewport} ref={emblaRef}>
        <div className={styles.gallery_track}>
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={styles.gallery_slide}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 320px, 70vw"
                className={styles.gallery_image}
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox}
    </section>
  );
}
