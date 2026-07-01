"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import { TbLayoutGrid } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import styles from "./page.module.css";
import cardStyles from "../components/resources.module.css";
import ListPagination from "@/app/components/list-pagination";
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
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const labelId = `resources-filter-${filterKey}-label`;
  const listId = `resources-filter-${filterKey}-list`;
  const triggerTextId = `resources-filter-${filterKey}-trigger`;

  const displayLabel = useMemo(() => {
    if (value === ALL_SLUG) return allLabel;
    return options.find((opt) => opt.slug === value)?.name ?? allLabel;
  }, [value, options, allLabel]);

  useEffect(() => {
    setMenuMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportPadding = 12;
    const gap = 6;
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const openAbove = spaceBelow < 180 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(
      280,
      Math.max(openAbove ? spaceAbove - gap : spaceBelow - gap, 120),
    );

    setMenuPosition({
      top: openAbove ? rect.top - gap : rect.bottom + gap,
      left: Math.max(
        viewportPadding,
        Math.min(rect.left, window.innerWidth - rect.width - viewportPadding),
      ),
      width: rect.width,
      maxHeight,
      openAbove,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e) => {
      if (
        rootRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
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

  const menu =
    open && menuPosition && menuMounted
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            className={`${styles.resources_filter_list} ${
              menuPosition.openAbove ? styles.resources_filter_list_above : ""
            }`}
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
            }}
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
          </ul>,
          document.body,
        )
      : null;

  return (
    <div className={styles.resources_filter_wrap} ref={rootRef}>
      <span id={labelId} className={styles.resources_filter_label}>
        {label}
      </span>
      <button
        ref={triggerRef}
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
      {menu}
    </div>
  );
}

function FiltersContent({
  visibleFilters,
  sortedFilterOptions,
  activeFilters,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
}) {
  return (
    <>
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
            onChange={(slug) => onFilterChange(key, slug)}
          />
        ))}
      </div>
      {hasActiveFilters ? (
        <button
          type="button"
          className={styles.resources_clear_filters}
          onClick={onClearFilters}
        >
          <FiX className={styles.resources_clear_filters_icon} aria-hidden />
          <span>Clear filters</span>
        </button>
      ) : null}
    </>
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDesktopFilters, setIsDesktopFilters] = useState(false);
  const searchInputRef = useRef(null);

  const closeMobileFilters = useCallback(() => {
    setMobileFiltersOpen(false);
  }, []);

  const applyFiltersAndSearch = useCallback(() => {
    setMobileFiltersOpen(false);
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePageSize = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktopFilters(isDesktop);
      setPageSize(isDesktop ? 9 : 6);
      setCurrentPage(1);
      if (isDesktop) {
        setMobileFiltersOpen(false);
      }
    };

    updatePageSize();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", updatePageSize);

    return () => {
      mediaQuery.removeEventListener("change", updatePageSize);
    };
  }, []);

  useEffect(() => {
    if (!mobileFiltersOpen || isDesktopFilters) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMobileFilters();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileFiltersOpen, isDesktopFilters, closeMobileFilters]);

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

  const visibleFilters = FILTER_CONFIG.filter(
    ({ key }) => sortedFilterOptions[key]?.length > 0,
  );

  const activeFilterCount = useMemo(
    () =>
      Object.values(activeFilters).filter((slug) => slug !== ALL_SLUG).length,
    [activeFilters],
  );

  const filtersContentProps = {
    visibleFilters,
    sortedFilterOptions,
    activeFilters,
    onFilterChange: handleFilterChange,
    hasActiveFilters,
    onClearFilters: clearFilters,
  };

  return (
    <>
      <div className={styles.resources_toolbar}>
        <div className={styles.resources_search}>
          <FiSearch className={styles.resources_search_icon} aria-hidden />
          <input
            ref={searchInputRef}
            type="search"
            className={styles.resources_search_input}
            placeholder="Search by title, author, or description…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search resources"
            autoComplete="off"
          />
        </div>

        {visibleFilters.length > 0 && (
          <div className={styles.resources_filters_row}>
            {!isDesktopFilters ? (
              <>
                <button
                  type="button"
                  className={styles.resources_filters_toggle}
                  onClick={() => setMobileFiltersOpen((open) => !open)}
                  aria-expanded={mobileFiltersOpen}
                  aria-controls="resources-filters-panel"
                  aria-haspopup="dialog"
                  aria-label={
                    activeFilterCount > 0
                      ? `Filters, ${activeFilterCount} active`
                      : "Filters"
                  }
                >
                  <TbLayoutGrid
                    className={styles.resources_filters_toggle_icon}
                    aria-hidden
                  />
                  <span className={styles.resources_filters_toggle_text}>
                    Filters
                    {activeFilterCount > 0 ? (
                      <span
                        className={styles.resources_filters_toggle_badge}
                        aria-hidden
                      >
                        {activeFilterCount}
                      </span>
                    ) : null}
                  </span>
                  <FaChevronDown
                    className={`${styles.resources_filters_toggle_chevron} ${
                      mobileFiltersOpen
                        ? styles.resources_filters_toggle_chevron_open
                        : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {mobileFiltersOpen ? (
                  <>
                    <button
                      type="button"
                      className={styles.resources_filters_backdrop}
                      onClick={closeMobileFilters}
                      aria-label="Close filters"
                    />
                    <div
                      id="resources-filters-panel"
                      className={styles.resources_filters_popover}
                      role="dialog"
                      aria-modal="true"
                      aria-label="Filter resources"
                    >
                      <button
                        type="button"
                        className={styles.resources_filters_popover_close}
                        onClick={closeMobileFilters}
                        aria-label="Close filters"
                      >
                        <FiX aria-hidden />
                      </button>
                      <div className={styles.resources_filters_popover_inner}>
                        <FiltersContent {...filtersContentProps} />
                      </div>
                      <div className={styles.resources_filters_popover_footer}>
                        <button
                          type="button"
                          className={styles.resources_filters_popover_search}
                          onClick={applyFiltersAndSearch}
                        >
                          <FiSearch aria-hidden />
                          <span>Search</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <div className={styles.resources_filters_desktop}>
                <div className={styles.resources_filters_panel_inner}>
                  <FiltersContent {...filtersContentProps} />
                </div>
              </div>
            )}
          </div>
        )}
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

        {filteredResources.length > 0 && totalPages >= 1 ? (
          <ListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            ariaLabel="Resource list pages"
          />
        ) : null}
      </div>
    </>
  );
};

export default ResourcesList;
