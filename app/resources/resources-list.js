"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import styles from "./page.module.css";
import cardStyles from "../components/resources.module.css";
import {
  formatResourceTypeLabel,
  RESOURCE_TYPE_PLACEHOLDER,
} from "@/lib/utils/resource-taxonomies";

const ALL_SLUG = "ALL";

const FILTER_CONFIG = [
  {
    key: "formats",
    label: "Format",
    allLabel: "All",
  },
  {
    key: "geographies",
    label: "Geographical Area",
    allLabel: "All",
  },
  {
    key: "thematicAreas",
    label: "Thematic area",
    allLabel: "All",
  },
  {
    key: "resourcesTypes",
    label: "Resource type",
    allLabel: "All",
  },
];

function matchesTaxonomy(resourceTerms, selectedSlug) {
  if (selectedSlug === ALL_SLUG) return true;
  if (!Array.isArray(resourceTerms) || resourceTerms.length === 0) return false;
  return resourceTerms.some((term) => term.slug === selectedSlug);
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
  const labelId = `resources-filter-${filterKey}-label`;
  const listId = `resources-filter-${filterKey}-list`;
  const triggerTextId = `resources-filter-${filterKey}-trigger`;

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
    <div className={styles.resources_filter_wrap} ref={rootRef}>
      <span id={labelId} className={styles.resources_filter_label}>
        {label}
      </span>
      <button
        type="button"
        className={styles.resources_filter_trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${triggerTextId}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          id={triggerTextId}
          className={styles.resources_filter_trigger_text}
        >
          {displayLabel}
        </span>
        <FaChevronDown
          className={`${styles.resources_filter_chevron} ${open ? styles.resources_filter_chevron_open : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className={styles.resources_filter_list}
        >
          <li role="none" className={styles.resources_filter_item}>
            <button
              type="button"
              role="option"
              aria-selected={value === ALL_SLUG}
              className={`${styles.resources_filter_option} ${value === ALL_SLUG ? styles.resources_filter_option_active : ""}`}
              onClick={() => choose(ALL_SLUG)}
            >
              {allLabel}
            </button>
          </li>
          {options.map((option) => (
            <li
              key={option.slug}
              role="none"
              className={styles.resources_filter_item}
            >
              <button
                type="button"
                role="option"
                aria-selected={value === option.slug}
                className={`${styles.resources_filter_option} ${value === option.slug ? styles.resources_filter_option_active : ""}`}
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

const ResourcesList = ({ resources = [], filterOptions = {} }) => {
  const [activeFilters, setActiveFilters] = useState({
    formats: ALL_SLUG,
    geographies: ALL_SLUG,
    thematicAreas: ALL_SLUG,
    resourcesTypes: ALL_SLUG,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePageSize = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setPageSize(isDesktop ? 10 : 8);
      setCurrentPage(1);
    };

    updatePageSize();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", updatePageSize);

    return () => {
      mediaQuery.removeEventListener("change", updatePageSize);
    };
  }, []);

  const sortedFilterOptions = useMemo(() => {
    const sortByName = (items) =>
      [...(items ?? [])].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "", undefined, {
          sensitivity: "base",
        }),
      );

    return {
      formats: sortByName(filterOptions.formats),
      geographies: sortByName(filterOptions.geographies),
      thematicAreas: sortByName(filterOptions.thematicAreas),
      resourcesTypes: sortByName(filterOptions.resourcesTypes),
    };
  }, [filterOptions]);

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some((slug) => slug !== ALL_SLUG),
    [activeFilters],
  );

  const filteredResources = useMemo(() => {
    let result = resources.filter((item) => {
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
          (typeof item.author === "string" &&
            item.author.toLowerCase().includes(term)) ||
          (typeof item.excerpt === "string" &&
            item.excerpt.toLowerCase().includes(term)),
      );
    }

    return result;
  }, [resources, activeFilters, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, resources.length, searchTerm]);

  const totalPages = useMemo(
    () =>
      pageSize > 0
        ? Math.max(1, Math.ceil(filteredResources.length / pageSize))
        : 1,
    [filteredResources.length, pageSize],
  );

  const paginatedResources = useMemo(() => {
    if (pageSize <= 0) return filteredResources;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredResources.slice(start, end);
  }, [filteredResources, currentPage, pageSize]);

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
      formats: ALL_SLUG,
      geographies: ALL_SLUG,
      thematicAreas: ALL_SLUG,
      resourcesTypes: ALL_SLUG,
    });
  };

  const getPaginationPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const addPage = (p) => {
      if (!pages.includes(p)) pages.push(p);
    };

    addPage(1);
    addPage(totalPages);
    addPage(currentPage);
    addPage(currentPage - 1);
    addPage(currentPage + 1);

    return pages.filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  };

  const visibleFilters = FILTER_CONFIG.filter(
    ({ key }) => sortedFilterOptions[key]?.length > 0,
  );

  return (
    <>
      <div className={styles.resources_toolbar}>
        {visibleFilters.length > 0 && (
          <div className={styles.resources_filters_row}>
            <div
              className={styles.resources_filters}
              role="group"
              aria-label="Filter resources"
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
                className={styles.resources_clear_filters}
                onClick={clearFilters}
              >
                <FiX
                  className={styles.resources_clear_filters_icon}
                  aria-hidden
                />
                <span>Clear filters</span>
              </button>
            ) : null}
          </div>
        )}

        <div className={styles.resources_search}>
          <FiSearch className={styles.resources_search_icon} aria-hidden />
          <input
            type="search"
            className={styles.resources_search_input}
            placeholder="Search by title, author, or description…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search resources"
            autoComplete="off"
          />
        </div>
      </div>

      <div className={styles.resources_list}>
        {paginatedResources.length > 0 ? (
          <div className={styles.resources_grid}>
            {paginatedResources.map((item) => {
              const resourceTypeLabel = formatResourceTypeLabel(
                item.taxonomies?.resourcesTypes,
              );
              const isResourceTypePlaceholder =
                resourceTypeLabel === RESOURCE_TYPE_PLACEHOLDER;

              return (
                <div
                  key={item.id || item.slug}
                  className={styles.resources_grid_item}
                >
                  <Link
                    href={`/resources/${item.slug}`}
                    className={cardStyles.resources_item}
                  >
                    <div className={cardStyles.resources_item_image}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                    <div className={cardStyles.resources_item_text}>
                      <p
                        className={`${cardStyles.resources_item_type} ${
                          isResourceTypePlaceholder
                            ? cardStyles.resources_item_type_placeholder
                            : ""
                        }`}
                      >
                        {resourceTypeLabel}
                      </p>
                      <h6 className={cardStyles.resources_item_title}>
                        {item.title}
                      </h6>
                      <p>{item.authors}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.resources_empty} role="status">
            {resources.length === 0
              ? "No resources to show."
              : "No resources match your filters. Try different options or clear the filters."}
          </p>
        )}

        {filteredResources.length > 0 && totalPages > 1 && (
          <div
            className={styles.resources_pagination}
            role="navigation"
            aria-label="Resource list pages"
          >
            <button
              type="button"
              className={styles.resources_pagination_button}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className={styles.resources_pagination_pages}>
              {(() => {
                const sequence = [];
                const pages = getPaginationPages();

                for (let i = 0; i < pages.length; i++) {
                  const page = pages[i];
                  const prev = pages[i - 1];

                  if (i > 0 && page - prev > 1) {
                    sequence.push("ellipsis-" + page + "-" + prev);
                  }

                  sequence.push(page);
                }

                return sequence.map((item) => {
                  if (
                    typeof item === "string" &&
                    item.startsWith("ellipsis-")
                  ) {
                    return (
                      <span
                        key={item}
                        className={styles.resources_pagination_ellipsis}
                      >
                        …
                      </span>
                    );
                  }

                  const page = item;

                  return (
                    <button
                      key={page}
                      type="button"
                      className={`${styles.resources_pagination_page} ${
                        page === currentPage
                          ? styles.resources_pagination_page_active
                          : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
            </div>

            <button
              type="button"
              className={styles.resources_pagination_button}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ResourcesList;
