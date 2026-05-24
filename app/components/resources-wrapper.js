/**
 * Server Component Wrapper for Resources
 * Fetches data from WordPress and passes it to the client component
 */

import { getClient } from "@/lib/apollo-client";
import { GET_RESOURCES } from "@/lib/graphql/queries";
import {
  getResourceDownloadUrl,
  mapTaxonomyNodes,
} from "@/lib/utils/resource-taxonomies";
import Resources from "./resources";

// Helper function to strip HTML tags from text
function stripHtmlTags(html) {
  if (!html) return "";
  // Remove HTML tags and decode HTML entities
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Decode &amp;
    .replace(/&lt;/g, "<") // Decode &lt;
    .replace(/&gt;/g, ">") // Decode &gt;
    .replace(/&quot;/g, '"') // Decode &quot;
    .replace(/&#39;/g, "'") // Decode &#39;
    .trim(); // Remove leading/trailing whitespace
}

// Remove WordPress excerpt truncation markers ([&hellip;], [...], etc.)
function removeExcerptTruncation(text) {
  if (!text) return "";
  return text
    .replace(/\s*\[\s*&hellip;\s*\]\s*$/i, "")
    .replace(/\s*\[\s*\.\.\.\s*\]\s*$/i, "")
    .replace(/\s*&hellip;\s*$/i, "")
    .replace(/\s*…\s*$/, "")
    .replace(/\s*\.\.\.\s*$/, "")
    .trim();
}

export default async function ResourcesWrapper() {
  let resources = [];
  let debugInfo = null;

  try {
    const client = getClient();

    const { data, error } = await client.query({
      query: GET_RESOURCES,
      variables: {
        first: 10, // Limit to 8 publications for the homepage
      },
      fetchPolicy: "cache-first",
    });

    if (error) {
      console.error("Error fetching resources:", error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err) => {
          console.error("GraphQL Error:", err.message, err);
        });
      }
      debugInfo = {
        error: error.message,
        graphQLErrors: error.graphQLErrors?.map((e) => e.message),
      };
    }

    // Check if publications field exists
    if (data && !data.resources) {
      console.warn(
        "⚠️ 'resources' field not found in GraphQL response. Available fields:",
        Object.keys(data),
      );
      debugInfo = {
        availableFields: Object.keys(data),
        message:
          "The 'resources' field doesn't exist. Your custom post type might be named differently in GraphQL.",
      };
    }

    if (data?.resources?.edges) {
      resources = data.resources.edges.map((edge) => {
        const node = edge.node;

        // Get ACF fields
        const textInputs = node.textInputs || {};

        // Get publication type from ACF (category field)
        const type = textInputs.category || "Book";

        // Get authors from ACF (authors field)
        // Handle both string and array formats
        let authors = "";
        if (textInputs.authors) {
          if (Array.isArray(textInputs.authors)) {
            authors = textInputs.authors.join(", ");
          } else {
            authors = textInputs.authors;
          }
        }
        // Fallback to WordPress author if ACF authors is empty
        if (!authors && node.author?.node?.name) {
          authors = node.author.node.name;
        }

        const downloadUrl = getResourceDownloadUrl(
          textInputs,
          process.env.WORDPRESS_GRAPHQL_URL,
        );

        // Get featured image or fallback
        const imageUrl =
          node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";

        // Get excerpt, strip HTML tags, and remove WordPress truncation markers
        const excerpt = removeExcerptTruncation(
          stripHtmlTags(node.excerpt || ""),
        );

        return {
          id: node.id,
          type: type,
          title: node.title || "",
          author: authors, // Keep for backward compatibility
          authors: authors, // Add plural version for component
          image: imageUrl,
          slug: node.slug || "",
          downloadUrl: downloadUrl,
          excerpt: excerpt,
          taxonomies: {
            formats: mapTaxonomyNodes(node.formats?.nodes),
            geographies: mapTaxonomyNodes(node.geographies?.nodes),
            thematicAreas: mapTaxonomyNodes(node.thematicAreas?.nodes),
            resourcesTypes: mapTaxonomyNodes(node.resourcesTypes?.nodes),
          },
        };
      });
    }
  } catch (error) {
    console.error("Error in ResourcesWrapper:", error);
    debugInfo = {
      error: error.message,
      stack: error.stack,
    };
  }

  return <Resources resources={resources} debugInfo={debugInfo} />;
}
