"use client";

import { useEffect, useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { HiOutlineQueueList } from "react-icons/hi2";
import styles from "../footer/legal-page.module.css";

const DESKTOP_MQ = "(min-width: 900px)";

export default function LegalToc({ items = [] }) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(DESKTOP_MQ);
    const update = () => {
      const desktop = mediaQuery.matches;
      setIsDesktop(desktop);
      if (desktop) setOpen(true);
      else setOpen(false);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const expanded = isDesktop || open;

  const handleLinkClick = () => {
    if (!isDesktop) setOpen(false);
  };

  return (
    <nav
      className={`${styles.legal_toc} ${expanded ? styles.legal_toc_open : ""}`}
      aria-label="On this page"
    >
      <button
        type="button"
        className={styles.legal_toc_toggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={expanded}
        aria-controls={listId}
      >
        <span className={styles.legal_toc_toggle_main}>
          <HiOutlineQueueList
            className={styles.legal_toc_toggle_icon}
            aria-hidden
          />
          <span className={styles.legal_toc_toggle_copy}>
            <span className={styles.legal_toc_toggle_label}>On this page</span>
            <span className={styles.legal_toc_toggle_hint}>
              {items.length} sections — tap to jump
            </span>
          </span>
        </span>
        <FaChevronDown
          className={`${styles.legal_toc_chevron} ${
            expanded ? styles.legal_toc_chevron_open : ""
          }`}
          aria-hidden
        />
      </button>

      <p className={styles.legal_toc_heading}>On this page</p>

      <ol
        id={listId}
        className={styles.legal_toc_list}
        hidden={!expanded}
      >
        {items.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={styles.legal_toc_link}
              onClick={handleLinkClick}
            >
              <span className={styles.legal_toc_link_index} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
