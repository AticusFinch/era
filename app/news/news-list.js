"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { IoReaderOutline } from "react-icons/io5";
import layoutStyles from "./page.module.css";
import newsStyles from "@/app/components/news.module.css";

const NewsList = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePageSize = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setPageSize(isDesktop ? 9 : 6);
      setCurrentPage(1);
    };

    updatePageSize();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", updatePageSize);

    return () => {
      mediaQuery.removeEventListener("change", updatePageSize);
    };
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          typeof item.title === "string" &&
          item.title.toLowerCase().includes(term),
      );
    }

    return result;
  }, [items, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length, searchTerm]);

  const totalPages = useMemo(
    () =>
      pageSize > 0
        ? Math.max(1, Math.ceil(filteredItems.length / pageSize))
        : 1,
    [filteredItems.length, pageSize],
  );

  const paginatedItems = useMemo(() => {
    if (pageSize <= 0) return filteredItems;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage, pageSize]);

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
      <div className={layoutStyles.news_search}>
        <FiSearch className={layoutStyles.news_search_icon} />
        <input
          type="text"
          className={layoutStyles.news_search_input}
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={layoutStyles.news_list}>
        {paginatedItems.length > 0 ? (
          <>
            {(() => {
              const [firstItem, ...restItems] = paginatedItems;

              return (
                <>
                  {firstItem && (
                    <article
                      key={firstItem.id || firstItem.slug}
                      className={layoutStyles.news_list_item}
                    >
                      <Link
                        href={`/news/${firstItem.slug}`}
                        className={newsStyles.news_featured}
                        aria-label={firstItem.title}
                      >
                        <div className={newsStyles.news_featured_image}>
                          <Image
                            src={firstItem.image}
                            alt={firstItem.title}
                            fill
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            style={{ objectFit: "cover" }}
                          />
                          <div className={newsStyles.news_featured_overlay} />
                        </div>
                        <div className={newsStyles.news_featured_text}>
                          <span className={newsStyles.news_featured_category}>
                            {firstItem.category}
                          </span>
                          <h3 className={newsStyles.news_featured_title}>
                            {firstItem.title}
                          </h3>
                          <p className={newsStyles.news_featured_excerpt}>
                            {firstItem.excerpt}
                          </p>
                          <div className={newsStyles.news_featured_info}>
                            <span className={newsStyles.news_featured_date}>
                              <CiCalendarDate />
                              {firstItem.date}
                            </span>
                            <span
                              className={newsStyles.news_featured_readingTime}
                            >
                              <IoReaderOutline />
                              {firstItem.readingTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  )}

                  {restItems.map((item) => (
                    <article
                      key={item.id || item.slug}
                      className={layoutStyles.news_list_item}
                    >
                      <Link
                        href={`/news/${item.slug}`}
                        className={newsStyles.news_list_item_wrapper}
                        aria-label={`Read ${item.title}`}
                      >
                        <div className={newsStyles.news_list_item}>
                          <div className={newsStyles.news_list_item_image}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(min-width: 1024px) 260px, 40vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className={newsStyles.news_list_item_text}>
                            <span
                              className={newsStyles.news_list_item_category}
                            >
                              {item.category}
                            </span>
                            <h2 className={newsStyles.news_list_item_title}>
                              {item.title}
                            </h2>
                            {item.excerpt && (
                              <p className={newsStyles.news_list_item_excerpt}>
                                {item.excerpt}
                              </p>
                            )}
                            <div className={newsStyles.news_list_item_info}>
                              <span>
                                <CiCalendarDate />
                                {item.date}
                              </span>
                              <span>
                                <IoReaderOutline />
                                {item.readingTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </>
              );
            })()}
          </>
        ) : (
          <p className={layoutStyles.news_empty}>No news found.</p>
        )}
      </div>

      {filteredItems.length > 0 && totalPages >= 1 && (
        <div className={layoutStyles.news_pagination}>
          <button
            type="button"
            className={layoutStyles.news_pagination_button}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className={layoutStyles.news_pagination_pages}>
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
                if (typeof item === "string" && item.startsWith("ellipsis-")) {
                  return (
                    <span
                      key={item}
                      className={layoutStyles.news_pagination_ellipsis}
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
                    className={`${layoutStyles.news_pagination_page} ${
                      page === currentPage
                        ? layoutStyles.news_pagination_page_active
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
            className={layoutStyles.news_pagination_button}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default NewsList;
