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

function getMediaItemDownloadUrl(fileField, wordpressGraphqlUrl) {
  if (!fileField) return null;

  let downloadUrl = null;
  if (fileField.node) {
    // mediaItemUrl is the actual file; sourceUrl can be a PDF preview image (.jpg)
    downloadUrl =
      fileField.node.mediaItemUrl ||
      fileField.node.sourceUrl ||
      fileField.node.uri;
  } else if (typeof fileField === "string") {
    downloadUrl = fileField;
  } else if (fileField.sourceUrl) {
    downloadUrl = fileField.sourceUrl;
  } else if (fileField.url) {
    downloadUrl = fileField.url;
  }

  if (downloadUrl && wordpressGraphqlUrl) {
    return makeAbsoluteUrl(downloadUrl, wordpressGraphqlUrl);
  }

  return downloadUrl;
}

/** ACF "Resources" field group — GraphQL keys on the Resource type. */
export const RESOURCE_LANGUAGE_FIELDS = [
  { key: "english", label: "ENG", countryCode: "GB" },
  { key: "alb", label: "ALB", countryCode: "AL" },
  {
    key: "bosniaAndHerzegovina",
    label: "BIH",
    countryCode: "BA",
  },
  { key: "croatia", label: "CRO", countryCode: "HR" },
  { key: "kosovo", label: "KOS", countryCode: "XK" },
  { key: "montenegro", label: "MNE", countryCode: "ME" },
  { key: "northMacedonia", label: "MKD", countryCode: "MK" },
  { key: "serbia", label: "SRB", countryCode: "RS" },
  { key: "slovenia", label: "SLO", countryCode: "SI" },
  { key: "turkie", label: "TUR", countryCode: "TR" },
];

export function getResourceLanguageDownloads(
  resourcesAcf,
  wordpressGraphqlUrl,
) {
  if (!resourcesAcf) return [];

  return RESOURCE_LANGUAGE_FIELDS.map(({ key, label, countryCode }) => {
    const url = getMediaItemDownloadUrl(resourcesAcf[key], wordpressGraphqlUrl);
    return url ? { key, label, countryCode, url } : null;
  }).filter(Boolean);
}

export function getResourceDownloadUrl(textInputs, wordpressGraphqlUrl) {
  return getMediaItemDownloadUrl(textInputs?.download, wordpressGraphqlUrl);
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
