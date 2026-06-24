"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import styles from "./page.module.css";

function getFlagSrc(countryCode) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

export default function ResourceLanguageDownloads({ downloads }) {
  const [selectedKey, setSelectedKey] = useState(downloads[0]?.key ?? "");
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected =
    downloads.find((item) => item.key === selectedKey) ?? downloads[0];

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!downloads?.length || !selected) return null;

  function handleDownload() {
    if (!selected?.url) return;
    window.open(selected.url, "_blank", "noopener,noreferrer");
  }

  function choose(key) {
    setSelectedKey(key);
    setOpen(false);
  }

  return (
    <div className={styles.resource_downloads}>
      <div className={styles.resource_downloads_row}>
        <div className={styles.resource_downloads_dropdown} ref={rootRef}>
          <button
            type="button"
            className={styles.resource_downloads_trigger}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Selected language: ${selected.label}`}
            onClick={() => setOpen((value) => !value)}
          >
            <Image
              src={getFlagSrc(selected.countryCode)}
              alt=""
              width={24}
              height={18}
              className={styles.resource_downloads_flag}
              unoptimized
            />
            <span className={styles.resource_downloads_trigger_text}>
              {selected.label}
            </span>
            <FaChevronDown
              className={`${styles.resource_downloads_chevron} ${open ? styles.resource_downloads_chevron_open : ""}`}
              aria-hidden
            />
          </button>

          {open ? (
            <ul
              className={styles.resource_downloads_menu}
              role="listbox"
              aria-label="Select language"
            >
              {downloads.map((item) => (
                <li
                  key={item.key}
                  role="option"
                  aria-selected={item.key === selectedKey}
                >
                  <button
                    type="button"
                    className={`${styles.resource_downloads_option} ${
                      item.key === selectedKey
                        ? styles.resource_downloads_option_active
                        : ""
                    }`}
                    onClick={() => choose(item.key)}
                  >
                    <Image
                      src={getFlagSrc(item.countryCode)}
                      alt=""
                      width={24}
                      height={18}
                      className={styles.resource_downloads_flag}
                      unoptimized
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className={styles.resource_downloads_action}
          onClick={handleDownload}
        >
          <FiDownload aria-hidden />
          Download
        </button>
      </div>
    </div>
  );
}
