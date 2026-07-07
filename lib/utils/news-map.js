import { calculateReadingTime } from "@/lib/utils/reading-time";
import {
  mapTaxonomyNodes,
  formatTaxonomyLabel,
} from "@/lib/utils/resource-taxonomies";
import { mapPostNewsAcf } from "@/lib/utils/news-acf";

export function stripHtmlTags(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .trim();
}

export function removeExcerptTruncation(text) {
  if (!text) return "";
  return text
    .replace(/\s*\[\s*&hellip;\s*\]\s*$/i, "")
    .replace(/\s*\[\s*\.\.\.\s*\]\s*$/i, "")
    .replace(/\s*&hellip;\s*$/i, "")
    .replace(/\s*…\s*$/, "")
    .replace(/\s*\.\.\.\s*$/, "")
    .trim();
}

export function formatNewsDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function mapNewsListItem(node) {
  const topics = mapTaxonomyNodes(node.topics?.nodes);
  const imageUrl =
    node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";
  const excerpt = removeExcerptTruncation(stripHtmlTags(node.excerpt || ""));

  return {
    id: node.id,
    title: node.title || "",
    slug: node.slug || "",
    image: imageUrl,
    topicsLabel: formatTaxonomyLabel(topics),
    date: formatNewsDate(node.date),
    dateIso: node.date || "",
    commentCount: node.commentCount ?? 0,
    readingTime: calculateReadingTime(node.content),
    excerpt,
    taxonomies: {
      topics,
      postYears: mapTaxonomyNodes(node.postYears?.nodes),
      geographies: mapTaxonomyNodes(node.geographies?.nodes),
    },
    newsAcf: mapPostNewsAcf(node.news),
  };
}
