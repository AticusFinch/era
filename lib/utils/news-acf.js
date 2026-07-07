export function mapAcfMediaItem(node) {
  if (!node?.sourceUrl) return null;
  return {
    src: node.sourceUrl,
    alt: node.altText || "",
    width: node.mediaDetails?.width || 1200,
    height: node.mediaDetails?.height || 800,
  };
}

export function mapAcfGallery(galleryConnection) {
  if (!galleryConnection?.nodes?.length) return [];
  return galleryConnection.nodes
    .map((node) => mapAcfMediaItem(node))
    .filter(Boolean);
}

export function mapAcfImage(imageField) {
  return mapAcfMediaItem(imageField?.node);
}

export function mapPostNewsAcf(newsAcf) {
  if (!newsAcf) {
    return { gallery: [], image: null };
  }

  return {
    gallery: mapAcfGallery(newsAcf.gallery),
    image: mapAcfImage(newsAcf.image),
  };
}
