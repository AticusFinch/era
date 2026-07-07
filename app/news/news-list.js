"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { IoReaderOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";
import styles from "./page.module.css";
import ListPagination from "@/app/components/list-pagination";
import { useGridPagination } from "@/lib/hooks/use-grid-pagination";

const ALL_SLUG = "ALL";

const FILTER_CONFIG = [
  {
    key: "topics",
    label: "Topic",
    allLabel: "All topics",
  },
  {
    key: "postYears",
    label: "Year",
    allLabel: "All years",
  },
  {
    key: "geographies",
    label: "Geography",
    allLabel: "All regions",
  },
];

function matchesTaxonomy(terms, selectedSlug) {
  if (selectedSlug === ALL_SLUG) return true;
  if (!Array.isArray(terms) || terms.length === 0) return false;
  return terms.some((term) => term.slug === selectedSlug);
}

function FilterDropdown({
  filterKey,
  label,
  allLabel,
  options,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const labelId = `news-filter-${filterKey}-label`;
  const listId = `news-filter-${filterKey}-list`;
  const triggerTextId = `news-filter-${filterKey}-trigger`;

  const displayLabel = useMemo(() => {
    if (value === ALL_SLUG) return allLabel;
    return options.find((opt) => opt.slug === value)?.name ?? allLabel;
  }, [value, options, allLabel]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (slug) => {
    onChange(slug);
    setOpen(false);
  };

  if (!options.length) return null;

  return (
    <div className={styles.news_filter_wrap} ref={rootRef}>
      <span id={labelId} className={styles.news_filter_label}>
        {label}
      </span>
      <button
        type="button"
        className={styles.news_filter_trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${triggerTextId}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span id={triggerTextId} className={styles.news_filter_trigger_text}>
          {displayLabel}
        </span>
        <FaChevronDown
          className={`${styles.news_filter_chevron} ${open ? styles.news_filter_chevron_open : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className={styles.news_filter_list}
        >
          <li role="none" className={styles.news_filter_item}>
            <button
              type="button"
              role="option"
              aria-selected={value === ALL_SLUG}
              className={`${styles.news_filter_option} ${value === ALL_SLUG ? styles.news_filter_option_active : ""}`}
              onClick={() => choose(ALL_SLUG)}
            >
              {allLabel}
            </button>
          </li>
          {options.map((option) => (
            <li
              key={option.slug}
              role="none"
              className={styles.news_filter_item}
            >
              <button
                type="button"
                role="option"
                aria-selected={value === option.slug}
                className={`${styles.news_filter_option} ${value === option.slug ? styles.news_filter_option_active : ""}`}
                onClick={() => choose(option.slug)}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function NewsCard({ item, featured = false }) {
  if (featured) {
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
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.news_featured_body}>
            {item.topicsLabel ? (
              <span className={styles.news_card_topic}>{item.topicsLabel}</span>
            ) : null}
            <h2 className={styles.news_featured_title}>{item.title}</h2>
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

  return (
    <article className={styles.news_card}>
      <Link
        href={`/news/${item.slug}`}
        className={styles.news_card_link}
        aria-label={`Read ${item.title}`}
      >
        <div className={styles.news_card_media}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.news_card_body}>
          {item.topicsLabel ? (
            <span className={styles.news_card_topic}>{item.topicsLabel}</span>
          ) : null}
          <h2 className={styles.news_card_title}>{item.title}</h2>
          {item.excerpt && (
            <p className={styles.news_card_excerpt}>{item.excerpt}</p>
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

const NewsList = ({ items = [], filterOptions = {} }) => {
  const [activeFilters, setActiveFilters] = useState({
    topics: ALL_SLUG,
    postYears: ALL_SLUG,
    geographies: ALL_SLUG,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const sortedFilterOptions = useMemo(() => {
    const sortByName = (list) =>
      [...(list ?? [])].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "", undefined, {
          sensitivity: "base",
        }),
      );

    const sortYears = (list) =>
      [...(list ?? [])].sort((a, b) => {
        const yearA = parseInt(String(a.name ?? ""), 10);
        const yearB = parseInt(String(b.name ?? ""), 10);
        if (!Number.isNaN(yearA) && !Number.isNaN(yearB)) {
          return yearB - yearA;
        }
        return (b.name ?? "").localeCompare(a.name ?? "", undefined, {
          sensitivity: "base",
        });
      });

    return {
      topics: sortByName(filterOptions.topics),
      postYears: sortYears(filterOptions.postYears),
      geographies: sortByName(filterOptions.geographies),
    };
  }, [filterOptions]);

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some((slug) => slug !== ALL_SLUG),
    [activeFilters],
  );

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const tax = item.taxonomies ?? {};
      return FILTER_CONFIG.every(({ key }) =>
        matchesTaxonomy(tax[key], activeFilters[key]),
      );
    });

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          (typeof item.title === "string" &&
            item.title.toLowerCase().includes(term)) ||
          (typeof item.excerpt === "string" &&
            item.excerpt.toLowerCase().includes(term)),
      );
    }

    return result;
  }, [items, activeFilters, searchTerm]);

  const pinFeatured =
    !searchTerm.trim() && !hasActiveFilters && filteredItems.length > 0;

  const gridSource = useMemo(
    () => (pinFeatured ? filteredItems.slice(1) : filteredItems),
    [filteredItems, pinFeatured],
  );

  const {
    currentPage,
    setCurrentPage,
    pageItems: gridItems,
    totalPages,
  } = useGridPagination("news", gridSource, {
    resetDeps: [activeFilters, items.length, searchTerm],
  });

  const featuredItem =
    pinFeatured && currentPage === 1 ? filteredItems[0] : null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFilterChange = (key, slug) => {
    setActiveFilters((prev) => ({ ...prev, [key]: slug }));
  };

  const clearFilters = () => {
    setActiveFilters({
      topics: ALL_SLUG,
      postYears: ALL_SLUG,
      geographies: ALL_SLUG,
    });
  };

  const visibleFilters = FILTER_CONFIG.filter(
    ({ key }) => sortedFilterOptions[key]?.length > 0,
  );

  return (
    <section className={styles.news_content} aria-label="News articles">
      <div className={styles.news_toolbar}>
        {visibleFilters.length > 0 && (
          <div className={styles.news_filters_row}>
            <div
              className={styles.news_filters}
              role="group"
              aria-label="Filter news"
            >
              {visibleFilters.map(({ key, label, allLabel }) => (
                <FilterDropdown
                  key={key}
                  filterKey={key}
                  label={label}
                  allLabel={allLabel}
                  options={sortedFilterOptions[key]}
                  value={activeFilters[key]}
                  onChange={(slug) => handleFilterChange(key, slug)}
                />
              ))}
            </div>
            {hasActiveFilters ? (
              <button
                type="button"
                className={styles.news_clear_filters}
                onClick={clearFilters}
              >
                <FiX className={styles.news_clear_filters_icon} aria-hidden />
                <span>Clear filters</span>
              </button>
            ) : null}
          </div>
        )}

        <div className={styles.news_search_row}>
          <div className={styles.news_search}>
            <FiSearch className={styles.news_search_icon} aria-hidden />
            <input
              type="search"
              className={styles.news_search_input}
              placeholder="Search by title or description…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search news"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {featuredItem || gridItems.length > 0 ? (
        <>
          {featuredItem && <NewsCard item={featuredItem} featured />}

          {gridItems.length > 0 && (
            <div className={styles.news_grid}>
              {gridItems.map((item) => (
                <NewsCard key={item.id || item.slug} item={item} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className={styles.news_empty} role="status">
          {items.length === 0
            ? "No news available at the moment."
            : "No news match your filters. Try different options or clear the filters."}
        </p>
      )}

      {filteredItems.length > 0 && totalPages > 1 ? (
        <ListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          ariaLabel="News list pages"
        />
      ) : null}
    </section>
  );
};

export default NewsList;
