/**
 * GraphQL queries for WordPress
 *
 * These queries use WPGraphQL schema.
 * Make sure WPGraphQL plugin is installed and activated on your WordPress site.
 */

import { gql } from "@apollo/client";

/**
 * Fragment for post fields - reusable across queries
 */
const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    date
    modified
    excerpt
    content
    status
    author {
      node {
        id
        name
        slug
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

/**
 * Get posts query
 */
export const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts(
    $first: Int
    $after: String
    $where: RootQueryToPostConnectionWhereArgs
  ) {
    posts(first: $first, after: $after, where: $where) {
      edges {
        node {
          ...PostFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * Get single post by slug
 */
export const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
    }
  }
`;

/**
 * Get single post by ID
 */
export const GET_POST_BY_ID = gql`
  ${POST_FIELDS}
  query GetPostById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostFields
    }
  }
`;

/**
 * Get pages query
 */
export const GET_PAGES = gql`
  fragment PageFields on Page {
    id
    title
    slug
    date
    modified
    excerpt
    content
    author {
      node {
        id
        name
        slug
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }

  query GetPages($first: Int, $after: String) {
    pages(first: $first, after: $after) {
      edges {
        node {
          ...PageFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * Get single page by slug
 */
export const GET_PAGE_BY_SLUG = gql`
  fragment PageFields on Page {
    id
    title
    slug
    date
    modified
    excerpt
    content
    author {
      node {
        id
        name
        slug
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }

  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      ...PageFields
    }
  }
`;

/**
 * Get categories
 */
export const GET_CATEGORIES = gql`
  query GetCategories($first: Int) {
    categories(first: $first) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;

/**
 * Get posts by category
 */
export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query GetPostsByCategory($categoryId: ID!, $first: Int) {
    posts(first: $first, where: { categoryId: $categoryId }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

/**
 * Search posts
 */
export const SEARCH_POSTS = gql`
  ${POST_FIELDS}
  query SearchPosts($search: String!, $first: Int) {
    posts(first: $first, where: { search: $search }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

/**
 * Fragment for publication fields - reusable across queries
 */
const PUBLICATION_FIELDS = gql`
  fragment PublicationFields on Publication {
    id
    title
    slug
    date
    modified
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    textInputs {
      download {
        node {
          uri
        }
      }
      category
      authors
    }
  }
`;

/**
 * Get publications query
 */
export const GET_PUBLICATIONS = gql`
  query GetPublications(
    $first: Int
    $after: String
    $where: RootQueryToPublicationConnectionWhereArgs
  ) {
    publications(first: $first, after: $after, where: $where) {
      edges {
        node {
          id
          title
          slug
          date
          modified
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          textInputs {
            download {
              node {
                uri
                sourceUrl
                mediaItemUrl
              }
            }
            category
            authors
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * Get single publication by slug
 */
export const GET_PUBLICATION_BY_SLUG = gql`
  query GetPublicationBySlug($slug: ID!) {
    publication(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      modified
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      textInputs {
        download {
          node {
            uri
          }
        }
        category
        authors
      }
    }
  }
`;
