/**
 * Apollo Client configuration for WordPress GraphQL
 *
 * This sets up Apollo Client to work with Next.js App Router and WordPress GraphQL API.
 * Make sure WPGraphQL plugin is installed on your WordPress site.
 *
 * For Next.js App Router with Server Components, we create a singleton client instance.
 */

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

if (!WORDPRESS_GRAPHQL_URL) {
  console.warn("WORDPRESS_GRAPHQL_URL is not set in environment variables");
}

let apolloClient;

/**
 * Create Apollo Client instance
 * Uses singleton pattern for Next.js App Router Server Components
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Enable SSR mode on server
    link: new HttpLink({
      uri: WORDPRESS_GRAPHQL_URL || "",
      // Add headers if needed (e.g., for authentication)
      // headers: {
      //   authorization: `Bearer ${process.env.WORDPRESS_GRAPHQL_TOKEN}`,
      // },
    }),
    cache: new InMemoryCache({
      // Configure cache policies if needed
      typePolicies: {
        Query: {
          fields: {
            posts: {
              // Merge function for pagination (connection type)
              keyArgs: false,
              merge(existing, incoming) {
                if (!existing) return incoming;
                if (!incoming) return existing;
                return {
                  ...incoming,
                  edges: [...(existing.edges || []), ...(incoming.edges || [])],
                };
              },
            },
            publications: {
              // Merge function for pagination (connection type)
              keyArgs: false,
              merge(existing, incoming) {
                if (!existing) return incoming;
                if (!incoming) return existing;
                return {
                  ...incoming,
                  edges: [...(existing.edges || []), ...(incoming.edges || [])],
                };
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
      query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
    },
  });
}

/**
 * Get Apollo Client instance (singleton)
 * For use in Server Components
 */
export function getClient() {
  // Create a new client for each server-side request
  // This ensures fresh data and proper SSR
  if (typeof window === "undefined") {
    return createApolloClient();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }

  return apolloClient;
}
