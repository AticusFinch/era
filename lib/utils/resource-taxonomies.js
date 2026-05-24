export const RESOURCE_TYPE_PLACEHOLDER = "undefined";

export function mapTaxonomyNodes(nodes) {
  if (!Array.isArray(nodes)) return [];
  return nodes
    .filter((term) => term?.slug)
    .map((term) => ({
      id: term.id,
      name: term.name || term.slug,
      slug: term.slug,
    }));
}

function makeAbsoluteUrl(url, baseUrl) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = baseUrl.replace(/\/graphql$/, "");
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

export function getResourceDownloadUrl(textInputs, wordpressGraphqlUrl) {
  const download = textInputs?.download;
  if (!download) return null;

  let downloadUrl = null;
  if (download.node) {
    // mediaItemUrl is the actual file; sourceUrl can be a PDF preview image (.jpg)
    downloadUrl =
      download.node.mediaItemUrl ||
      download.node.sourceUrl ||
      download.node.uri;
  } else if (typeof download === "string") {
    downloadUrl = download;
  } else if (download.sourceUrl) {
    downloadUrl = download.sourceUrl;
  } else if (download.url) {
    downloadUrl = download.url;
  }

  if (downloadUrl && wordpressGraphqlUrl) {
    return makeAbsoluteUrl(downloadUrl, wordpressGraphqlUrl);
  }

  return downloadUrl;
}

export function formatResourceAuthors(textInputs, wpAuthor) {
  const inputs = textInputs || {};
  let authors = "";

  if (inputs.authors) {
    if (Array.isArray(inputs.authors)) {
      authors = inputs.authors.join(", ");
    } else {
      authors = String(inputs.authors);
    }
  }

  if (!authors.trim() && wpAuthor?.name) {
    authors = wpAuthor.name;
  }

  return authors.trim() || null;
}

export function formatResourceTypeLabel(terms) {
  if (!Array.isArray(terms) || terms.length === 0) {
    return RESOURCE_TYPE_PLACEHOLDER;
  }
  const label = terms
    .map((term) => term.name)
    .filter(Boolean)
    .join(", ");
  return label || RESOURCE_TYPE_PLACEHOLDER;
}
