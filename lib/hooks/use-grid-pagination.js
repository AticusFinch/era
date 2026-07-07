"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getDefaultGridConfig,
  getGridConfigForLayout,
} from "@/lib/utils/list-grid-pagination";

const MEDIA_QUERIES = [
  "(min-width: 640px)",
  "(min-width: 1024px)",
  "(min-width: 1280px)",
  "(min-width: 1600px)",
];

export function useGridPagination(
  layout,
  items,
  { measureWidth = false, resetDeps = [] } = {},
) {
  const containerRef = useRef(null);
  const [gridConfig, setGridConfig] = useState(() =>
    getDefaultGridConfig(layout),
  );
  const [currentPage, setCurrentPage] = useState(1);

  const resetKey = JSON.stringify(resetDeps);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey]);

  useEffect(() => {
    const update = () => {
      const width = measureWidth ? (containerRef.current?.clientWidth ?? 0) : 0;
      setGridConfig(getGridConfigForLayout(layout, width));
    };

    update();

    let resizeObserver;
    const element = containerRef.current;
    if (measureWidth && element) {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(element);
    }

    const updateAndResetPage = () => {
      update();
      setCurrentPage(1);
    };

    const listeners = MEDIA_QUERIES.map((query) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", updateAndResetPage);
      return mediaQuery;
    });

    return () => {
      resizeObserver?.disconnect();
      listeners.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", updateAndResetPage);
      });
    };
  }, [layout, measureWidth]);

  const { pageItems, totalPages } = useMemo(() => {
    const { pageSize } = gridConfig;
    if (pageSize <= 0 || items.length === 0) {
      return { pageItems: [], totalPages: 1 };
    }

    const pages = Math.max(1, Math.ceil(items.length / pageSize));
    const start = (currentPage - 1) * pageSize;
    return {
      pageItems: items.slice(start, start + pageSize),
      totalPages: pages,
    };
  }, [items, gridConfig, currentPage]);

  return {
    containerRef,
    gridConfig,
    currentPage,
    setCurrentPage,
    pageItems,
    totalPages,
  };
}
