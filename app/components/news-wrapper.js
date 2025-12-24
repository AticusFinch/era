/**
 * Server Component Wrapper for News
 * Fetches data from WordPress and passes it to the client component
 */

import { getClient } from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/graphql/queries";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import News from "./news";

// Helper function to format date (YYYY-MM-DD format)
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
    .replace(/&#8217;/g, "'") // Decode &#8217; (apostrophe)
    .replace(/&#8220;/g, '"') // Decode &#8220; (left double quote)
    .replace(/&#8221;/g, '"') // Decode &#8221; (right double quote)
    .replace(/&#8211;/g, "–") // Decode &#8211; (en dash)
    .replace(/&#8212;/g, "—") // Decode &#8212; (em dash)
    .trim(); // Remove leading/trailing whitespace
}

export default async function NewsWrapper() {
  let newsItems = [];
  let debugInfo = null;

  try {
    const client = getClient();

    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: {
        first: 7, // Limit to 7 news items for the homepage
      },
      fetchPolicy: "network-only", // Use network-only to avoid cache issues
    });

    if (error) {
      console.error("Error fetching news:", error);
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

    // Check if posts field exists
    if (data && !data.posts) {
      console.warn(
        "⚠️ 'posts' field not found in GraphQL response. Available fields:",
        Object.keys(data)
      );
      debugInfo = {
        availableFields: Object.keys(data),
        message: "The 'posts' field doesn't exist. Check your GraphQL schema.",
      };
    }

    if (data?.posts?.edges) {
      newsItems = data.posts.edges.map((edge) => {
        const node = edge.node;

        // Get category name (first category)
        const category = node.categories?.nodes?.[0]?.name || "News";

        // Get featured image or fallback
        const imageUrl =
          node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";

        // Format date
        const formattedDate = formatDate(node.date);

        // Calculate reading time from content
        const readingTime = calculateReadingTime(node.content);

        // Get excerpt and strip HTML tags
        const excerpt = stripHtmlTags(node.excerpt || "");

        return {
          id: node.id,
          title: node.title || "",
          slug: node.slug || "",
          image: imageUrl,
          category: category,
          date: formattedDate,
          readingTime: readingTime,
          excerpt: excerpt,
        };
      });
    }
  } catch (error) {
    console.error("Error in NewsWrapper:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    debugInfo = {
      error: error.message,
      name: error.name,
      stack: error.stack?.split("\n").slice(0, 5).join("\n"), // First 5 lines of stack
    };
  }

  return <News newsItems={newsItems} debugInfo={debugInfo} />;
}
