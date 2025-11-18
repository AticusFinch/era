/**
 * Server Component Wrapper for Publications
 * Fetches data from WordPress and passes it to the client component
 */

import { getClient } from "@/lib/apollo-client";
import { GET_PUBLICATIONS } from "@/lib/graphql/queries";
import Publications from "./publications";

// Helper function to make URLs absolute
function makeAbsoluteUrl(url, baseUrl) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url; // Already absolute
  }
  // Make relative URL absolute
  const base = baseUrl.replace(/\/graphql$/, ""); // Remove /graphql from end
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

export default async function PublicationsWrapper() {
  let publications = [];
  let debugInfo = null;

  try {
    const client = getClient();

    const { data, error } = await client.query({
      query: GET_PUBLICATIONS,
      variables: {
        first: 8, // Limit to 8 publications for the homepage
      },
      fetchPolicy: "cache-first",
    });

    // Log for debugging
    console.log("Publications Query Response:", {
      hasData: !!data,
      hasPublications: !!data?.publications,
      hasEdges: !!data?.publications?.edges,
      edgesLength: data?.publications?.edges?.length || 0,
      error: error?.message,
      graphQLErrors: error?.graphQLErrors,
    });

    // Log first publication's textInputs for debugging
    if (data?.publications?.edges?.[0]?.node?.textInputs) {
      console.log(
        "Sample textInputs structure:",
        data.publications.edges[0].node.textInputs
      );
    }

    if (error) {
      console.error("Error fetching publications:", error);
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
    if (data && !data.publications) {
      console.warn(
        "⚠️ 'publications' field not found in GraphQL response. Available fields:",
        Object.keys(data)
      );
      debugInfo = {
        availableFields: Object.keys(data),
        message:
          "The 'publications' field doesn't exist. Your custom post type might be named differently in GraphQL.",
      };
    }

    if (data?.publications?.edges) {
      publications = data.publications.edges.map((edge) => {
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

        // Get download URL from ACF (download field)
        // Try different possible structures
        let downloadUrl = null;
        if (textInputs.download) {
          const download = textInputs.download;
          // Check if it's a file field with node structure
          if (download.node) {
            downloadUrl =
              download.node.sourceUrl ||
              download.node.mediaItemUrl ||
              download.node.uri;
          }
          // Check if it's a direct URL string
          else if (typeof download === "string") {
            downloadUrl = download;
          }
          // Check if it's an object with sourceUrl
          else if (download.sourceUrl) {
            downloadUrl = download.sourceUrl;
          }
          // Check if it's an object with url property
          else if (download.url) {
            downloadUrl = download.url;
          }
        }

        // Make download URL absolute if it's relative
        const wordpressUrl = process.env.WORDPRESS_GRAPHQL_URL;
        if (downloadUrl && wordpressUrl) {
          downloadUrl = makeAbsoluteUrl(downloadUrl, wordpressUrl);
        }

        // Log for debugging
        console.log("Publication data:", {
          title: node.title,
          category: textInputs.category,
          authors: textInputs.authors,
          authorsFormatted: authors,
          download: textInputs.download,
          downloadUrl: downloadUrl,
        });

        // Get featured image or fallback
        const imageUrl =
          node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";

        return {
          id: node.id,
          type: type,
          title: node.title || "",
          author: authors, // Keep for backward compatibility
          authors: authors, // Add plural version for component
          image: imageUrl,
          slug: node.slug || "",
          downloadUrl: downloadUrl,
        };
      });
    }
  } catch (error) {
    console.error("Error in PublicationsWrapper:", error);
    debugInfo = {
      error: error.message,
      stack: error.stack,
    };
  }

  return <Publications publications={publications} debugInfo={debugInfo} />;
}
