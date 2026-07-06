import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import styles from "./page.module.css";
import ResourcesList from "./resources-list";
import { getClient } from "@/lib/apollo-client";
import { GET_RESOURCES, GET_RESOURCE_FILTERS } from "@/lib/graphql/queries";
import {
  mapTaxonomyNodes,
} from "@/lib/utils/resource-taxonomies";

export const revalidate = 60;

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
  let filterOptions = {
    formats: [],
    geographies: [],
    thematicAreas: [],
    resourcesTypes: [],
  };
  let debugInfo = null;

  try {
    const client = getClient();

    const [{ data, error }, filtersResult] = await Promise.all([
      client.query({
        query: GET_RESOURCES,
        variables: {
          first: 100,
        },
        fetchPolicy: "cache-first",
      }),
      client.query({
        query: GET_RESOURCE_FILTERS,
        fetchPolicy: "cache-first",
      }),
    ]);

    const filtersData = filtersResult?.data;
    if (filtersData) {
      filterOptions = {
        formats: filtersData.formats?.nodes ?? [],
        geographies: filtersData.geographies?.nodes ?? [],
        thematicAreas: filtersData.thematicAreas?.nodes ?? [],
        resourcesTypes: filtersData.resourcesTypes?.nodes ?? [],
      };
    }

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
          excerpt,
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
    console.error("Error in ResourcesPage:", error);
    debugInfo = {
      error: error.message,
      stack: error.stack,
    };
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className={styles.resources_container}>
          <div className={styles.resources_header}>
            <h1 className={styles.resources_title}>
              <span className="title-accent">Resources</span>
            </h1>
          </div>

          <ResourcesList resources={resources} filterOptions={filterOptions} />

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
      </Container>
      <Footer />
    </>
  );
}
