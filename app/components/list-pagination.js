import styles from "./list-pagination.module.css";

function getPaginationPages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const addPage = (page) => {
    if (!pages.includes(page)) pages.push(page);
  };

  addPage(1);
  addPage(totalPages);
  addPage(currentPage);
  addPage(currentPage - 1);
  addPage(currentPage + 1);

  return pages.filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
}

export default function ListPagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = "List pages",
}) {
  if (totalPages < 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);
  const sequence = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const prev = pages[i - 1];

    if (i > 0 && page - prev > 1) {
      sequence.push(`ellipsis-${page}-${prev}`);
    }

    sequence.push(page);
  }

  return (
    <div
      className={styles.pagination}
      role="navigation"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className={styles.pagination_pages}>
        {sequence.map((item) => {
          if (typeof item === "string" && item.startsWith("ellipsis-")) {
            return (
              <span key={item} className={styles.pagination_ellipsis}>
                …
              </span>
            );
          }

          const page = item;

          return (
            <button
              key={page}
              type="button"
              className={`${styles.pagination_page} ${
                page === currentPage ? styles.pagination_page_active : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
