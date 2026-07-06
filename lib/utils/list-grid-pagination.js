export const GRID_ROWS_PER_PAGE = 3;

export function getDefaultGridConfig(layout) {
  if (layout === "resources") {
    return { columns: 4, pageSize: 4 * GRID_ROWS_PER_PAGE };
  }
  return { columns: 3, pageSize: 3 * GRID_ROWS_PER_PAGE };
}

const RESOURCES_XL_MIN_COL_PX = 210;
const RESOURCES_XL_GAP_PX = 20;

function estimateResourcesContainerWidth() {
  const viewportWidth = window.innerWidth;
  const horizontalPadding =
    viewportWidth >= 1536 ? 80 : viewportWidth >= 1280 ? 64 : 32;
  return Math.min(viewportWidth - horizontalPadding, 2200);
}

function getResourcesColumnCount(containerWidth = 0) {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    const width =
      containerWidth > 0 ? containerWidth : estimateResourcesContainerWidth();
    return Math.max(
      1,
      Math.floor(
        (width + RESOURCES_XL_GAP_PX) /
          (RESOURCES_XL_MIN_COL_PX + RESOURCES_XL_GAP_PX),
      ),
    );
  }
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 4;
  }
  if (window.matchMedia("(min-width: 640px)").matches) {
    return 3;
  }
  return 2;
}

export function getGridConfigForLayout(layout, containerWidth = 0) {
  if (typeof window === "undefined") {
    return getDefaultGridConfig(layout);
  }

  if (layout === "news") {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const columns = 3;
      return { columns, pageSize: columns * GRID_ROWS_PER_PAGE };
    }
    if (window.matchMedia("(min-width: 640px)").matches) {
      const columns = 2;
      return { columns, pageSize: columns * GRID_ROWS_PER_PAGE };
    }
    const columns = 1;
    return { columns, pageSize: columns * GRID_ROWS_PER_PAGE * 2 };
  }

  let columns = getResourcesColumnCount(containerWidth);

  return { columns, pageSize: columns * GRID_ROWS_PER_PAGE };
}
