"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import styles from "./page.module.css";
import cardStyles from "../components/resources.module.css";

const ResourcesList = ({ resources = [] }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Adjust page size based on viewport (mobile vs desktop)
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

  const availableTypes = useMemo(
    () =>
      Array.from(
        new Set(
          resources
            .map((item) => item.type)
            .filter((type) => typeof type === "string" && type.trim() !== ""),
        ),
      ),
    [resources],
  );

  const filteredResources = useMemo(() => {
    let result =
      activeFilter === "All"
        ? resources
        : resources.filter((item) => item.type === activeFilter);

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          typeof item.title === "string" &&
          item.title.toLowerCase().includes(term),
      );
    }

    return result;
  }, [resources, activeFilter, searchTerm]);

  // Reset to first page when filter changes or resources list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, resources.length, searchTerm]);

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

    const validPages = pages
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);

    return validPages;
  };

  return (
    <>
      <div className={styles.resources_search}>
        <FiSearch className={styles.resources_search_icon} />
        <input
          type="text"
          className={styles.resources_search_input}
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {availableTypes.length > 0 && (
        <div className={styles.resources_filters}>
          <ul className={styles.resources_filters_list}>
            <li className={styles.resources_filters_item}>
              <button
                type="button"
                className={`${styles.resources_filters_button} ${
                  activeFilter === "All"
                    ? styles.resources_filters_button_active
                    : ""
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
            </li>
            {availableTypes.map((type) => (
              <li key={type} className={styles.resources_filters_item}>
                <button
                  type="button"
                  className={`${styles.resources_filters_button} ${
                    activeFilter === type
                      ? styles.resources_filters_button_active
                      : ""
                  }`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.resources_list}>
        {paginatedResources.length > 0 ? (
          <div className={styles.resources_grid}>
            {paginatedResources.map((item) => (
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
                    <p className={cardStyles.resources_item_type}>
                      {item.type}
                    </p>
                    <h6 className={cardStyles.resources_item_title}>
                      {item.title}
                    </h6>
                    {item.excerpt && (
                      <p className={cardStyles.resources_item_excerpt}>
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.resources_empty}>
            No resources found for this filter.
          </p>
        )}

        {filteredResources.length > 0 && totalPages >= 1 && (
          <div className={styles.resources_pagination}>
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
