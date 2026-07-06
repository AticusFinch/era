"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { IoReaderOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";
import styles from "./page.module.css";
import ListPagination from "@/app/components/list-pagination";
import { useGridPagination } from "@/lib/hooks/use-grid-pagination";

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
            <span className={styles.news_card_category}>{item.category}</span>
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
          <span className={styles.news_card_category}>{item.category}</span>
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

const NewsList = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const term = searchTerm.trim().toLowerCase();
    return items.filter(
      (item) =>
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(term),
    );
  }, [items, searchTerm]);

  const pinFeatured = !searchTerm.trim() && filteredItems.length > 0;

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
    resetDeps: [items.length, searchTerm],
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

  return (
    <section className={styles.news_content} aria-label="News articles">
      <div className={styles.news_toolbar}>
        <div className={styles.news_search}>
          <FiSearch className={styles.news_search_icon} aria-hidden />
          <input
            type="search"
            className={styles.news_search_input}
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search news by title"
          />
        </div>
        {filteredItems.length > 0 && (
          <p className={styles.news_count}>
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "article" : "articles"}
          </p>
        )}
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
        <p className={styles.news_empty}>No news found.</p>
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
