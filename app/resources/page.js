import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";
import ResourcesList from "./resources-list";
import { getClient } from "@/lib/apollo-client";
import { GET_RESOURCES } from "@/lib/graphql/queries";
import PageUnderConstruction from "@/app/components/pageUnderConstruction";

// Helper function to make URLs absolute
function makeAbsoluteUrl(url, baseUrl) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = baseUrl.replace(/\/graphql$/, "");
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

// Helper function to strip HTML tags from text
function stripHtmlTags(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
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

export default async function ResourcesPage() {
  let resources = [];
  let debugInfo = null;

  try {
    const client = getClient();

    const { data, error } = await client.query({
      query: GET_RESOURCES,
      variables: {
        first: 100, // Fetch up to 100 resources for the full page
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

    if (data && !data.resources) {
      console.warn(
        "⚠️ 'resources' field not found in GraphQL response. Available fields:",
        Object.keys(data),
      );
      debugInfo = {
        ...(debugInfo || {}),
        availableFields: Object.keys(data),
        message:
          "The 'resources' field doesn't exist. Your custom post type might be named differently in GraphQL.",
      };
    }

    if (data?.resources?.edges) {
      resources = data.resources.edges.map((edge) => {
        const node = edge.node;

        const textInputs = node.textInputs || {};

        const type = textInputs.category || "Publication";

        let authors = "";
        if (textInputs.authors) {
          if (Array.isArray(textInputs.authors)) {
            authors = textInputs.authors.join(", ");
          } else {
            authors = textInputs.authors;
          }
        }
        if (!authors && node.author?.node?.name) {
          authors = node.author.node.name;
        }

        let downloadUrl = null;
        if (textInputs.download) {
          const download = textInputs.download;
          if (download.node) {
            downloadUrl =
              download.node.sourceUrl ||
              download.node.mediaItemUrl ||
              download.node.uri;
          } else if (typeof download === "string") {
            downloadUrl = download;
          } else if (download.sourceUrl) {
            downloadUrl = download.sourceUrl;
          } else if (download.url) {
            downloadUrl = download.url;
          }
        }

        const wordpressUrl = process.env.WORDPRESS_GRAPHQL_URL;
        if (downloadUrl && wordpressUrl) {
          downloadUrl = makeAbsoluteUrl(downloadUrl, wordpressUrl);
        }

        const imageUrl =
          node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";

        const excerpt = removeExcerptTruncation(
          stripHtmlTags(node.excerpt || ""),
        );

        return {
          id: node.id,
          type,
          title: node.title || "",
          author: authors,
          authors,
          image: imageUrl,
          slug: node.slug || "",
          downloadUrl,
          excerpt,
        };
      });
    }
  } catch (error) {
    console.error("Error in ResourcesPage:", error);
    debugInfo = {
      error: error.message,
      stack: error.stack,
    };
  }

  return (
    <>
      <Navbar />
      <PageUnderConstruction />
      {/* <Container>
        <div className={styles.resources_container}>
          <div className={styles.resources_header}>
            <h1 className={styles.resources_title}>
              <span className="title-accent">Resources</span>
            </h1>
            <p className={styles.resources_description}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </p>
          </div>

          <ResourcesList resources={resources} />

          {debugInfo && resources.length === 0 && (
            <div className={styles.resources_debug}>
              <strong>Debug Info:</strong>
              {debugInfo.error && (
                <p>
                  <strong>Error:</strong> {debugInfo.error}
                </p>
              )}
              {debugInfo.graphQLErrors && (
                <div>
                  <strong>GraphQL Errors:</strong>
                  <ul>
                    {debugInfo.graphQLErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
              {debugInfo.availableFields && (
                <div>
                  <strong>Available fields in GraphQL response:</strong>
                  <ul>
                    {debugInfo.availableFields.map((field, idx) => (
                      <li key={idx}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Container> */}
      <Footer />
    </>
  );
}
