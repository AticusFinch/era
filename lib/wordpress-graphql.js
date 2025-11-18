/**
 * WordPress GraphQL API Utility using Apollo Client
 *
 * This file contains functions to fetch data from your WordPress GraphQL API.
 * Make sure to set WORDPRESS_GRAPHQL_URL in your .env.local file.
 * Also ensure WPGraphQL plugin is installed on your WordPress site.
 */

import { getClient } from "./apollo-client";
import {
  GET_POSTS,
  GET_POST_BY_SLUG,
  GET_POST_BY_ID,
  GET_PAGES,
  GET_PAGE_BY_SLUG,
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY,
  SEARCH_POSTS,
} from "./graphql/queries";

/**
 * Calculate reading time based on content length
 * @param {string} content - HTML content
 * @returns {string} Reading time estimate
 */
function calculateReadingTime(content) {
  if (!content) return "1 min read";
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
  return `${minutes} min read`;
}

/**
 * Transform GraphQL post/node to a cleaner format
 * @param {Object} node - GraphQL post/node object
 * @returns {Object} Transformed post object
 */
function transformPost(node) {
  if (!node) return null;

  return {
    id: node.id,
    title: node.title || "",
    slug: node.slug || "",
    content: node.content || "",
    excerpt: node.excerpt || "",
    date: node.date || "",
    modified: node.modified || "",
    author: node.author?.node
      ? {
          id: node.author.node.id,
          name: node.author.node.name,
          slug: node.author.node.slug,
        }
      : null,
    featuredImage: node.featuredImage?.node
      ? {
          sourceUrl: node.featuredImage.node.sourceUrl,
          altText: node.featuredImage.node.altText || node.title || "",
          width: node.featuredImage.node.mediaDetails?.width,
          height: node.featuredImage.node.mediaDetails?.height,
        }
      : null,
    categories: node.categories?.nodes
      ? node.categories.nodes.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        }))
      : [],
    readingTime: calculateReadingTime(node.content),
  };
}

/**
 * Fetch posts from WordPress using GraphQL
 * @param {Object} options - Query options
 * @param {number} options.perPage - Number of posts per page (default: 10)
 * @param {number} options.page - Page number (for pagination, use after cursor instead)
 * @param {string} options.categories - Category IDs (comma-separated)
 * @param {string} options.search - Search query
 * @param {string} options.orderBy - Order by field (default: 'DATE')
 * @param {string} options.order - Order direction (default: 'DESC')
 * @returns {Promise<Array>} Array of posts
 */
export async function getPosts(options = {}) {
  const {
    perPage = 10,
    categories,
    search,
    orderBy = "DATE",
    order = "DESC",
  } = options;

  try {
    const client = getClient();

    // Build where clause
    // WPGraphQL status should be PostStatusEnum (PUBLISH, DRAFT, etc.)
    // Try without status first - WPGraphQL defaults to published posts
    const where = {};

    // Only add status filter if explicitly needed
    // WPGraphQL by default returns published posts, so we might not need this
    // But if you want to be explicit, use: status: PUBLISH (enum, not string)

    if (categories) {
      where.categoryIn = categories.split(",").map((id) => parseInt(id.trim()));
    }
    if (search) {
      where.search = search;
    }

    // Orderby structure for WPGraphQL
    if (orderBy) {
      where.orderby = [
        {
          field: orderBy,
          order: order,
        },
      ];
    }

    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: {
        first: perPage,
        where: Object.keys(where).length > 0 ? where : undefined,
      },
      fetchPolicy: "cache-first",
    });

    if (error) {
      console.error("Error fetching WordPress posts:", error);
      return [];
    }

    if (!data?.posts?.edges) {
      return [];
    }

    return data.posts.edges.map((edge) => transformPost(edge.node));
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return [];
  }
}

/**
 * Fetch a single post by ID or slug
 * @param {string|number} identifier - Post ID or slug
 * @returns {Promise<Object|null>} Post object or null
 */
export async function getPost(identifier) {
  try {
    const client = getClient();
    const isNumeric = !isNaN(identifier);

    const { data } = await client.query({
      query: isNumeric ? GET_POST_BY_ID : GET_POST_BY_SLUG,
      variables: {
        [isNumeric ? "id" : "slug"]: identifier,
      },
      fetchPolicy: "cache-first",
    });

    const post = data?.post;
    return post ? transformPost(post) : null;
  } catch (error) {
    console.error("Error fetching WordPress post:", error);
    return null;
  }
}

/**
 * Fetch pages from WordPress
 * @param {Object} options - Query options
 * @param {number} options.perPage - Number of pages per page
 * @returns {Promise<Array>} Array of pages
 */
export async function getPages(options = {}) {
  const { perPage = 10 } = options;

  try {
    const client = getClient();

    const { data } = await client.query({
      query: GET_PAGES,
      variables: {
        first: perPage,
      },
      fetchPolicy: "cache-first",
    });

    if (!data?.pages?.edges) {
      return [];
    }

    return data.pages.edges.map((edge) => transformPost(edge.node));
  } catch (error) {
    console.error("Error fetching WordPress pages:", error);
    return [];
  }
}

/**
 * Fetch a single page by ID or slug
 * @param {string|number} identifier - Page ID or slug
 * @returns {Promise<Object|null>} Page object or null
 */
export async function getPage(identifier) {
  try {
    const client = getClient();

    const { data } = await client.query({
      query: GET_PAGE_BY_SLUG,
      variables: {
        slug: identifier,
      },
      fetchPolicy: "cache-first",
    });

    const page = data?.page;
    return page ? transformPost(page) : null;
  } catch (error) {
    console.error("Error fetching WordPress page:", error);
    return null;
  }
}

/**
 * Fetch categories from WordPress
 * @returns {Promise<Array>} Array of categories
 */
export async function getCategories() {
  try {
    const client = getClient();

    const { data } = await client.query({
      query: GET_CATEGORIES,
      variables: {
        first: 100,
      },
      fetchPolicy: "cache-first",
    });

    if (!data?.categories?.nodes) {
      return [];
    }

    return data.categories.nodes.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      count: cat.count,
    }));
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    return [];
  }
}

/**
 * Fetch posts by category ID
 * @param {number} categoryId - Category ID
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} Array of posts
 */
export async function getPostsByCategory(categoryId, limit = 10) {
  try {
    const client = getClient();

    const { data } = await client.query({
      query: GET_POSTS_BY_CATEGORY,
      variables: {
        categoryId: categoryId.toString(),
        first: limit,
      },
      fetchPolicy: "cache-first",
    });

    if (!data?.posts?.edges) {
      return [];
    }

    return data.posts.edges.map((edge) => transformPost(edge.node));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

/**
 * Search posts
 * @param {string} query - Search query
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} Array of posts
 */
export async function searchPosts(query, limit = 10) {
  try {
    const client = getClient();

    const { data } = await client.query({
      query: SEARCH_POSTS,
      variables: {
        search: query,
        first: limit,
      },
      fetchPolicy: "network-only", // Always fetch fresh results for search
    });

    if (!data?.posts?.edges) {
      return [];
    }

    return data.posts.edges.map((edge) => transformPost(edge.node));
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}
