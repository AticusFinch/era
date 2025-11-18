# How to Add ACF (Advanced Custom Fields) to GraphQL Queries

## Prerequisites

1. **Install WPGraphQL for ACF Plugin** on WordPress:

   - Go to WordPress Admin → Plugins → Add New
   - Search for "WPGraphQL for Advanced Custom Fields"
   - Install and activate

2. **Create ACF Fields** in WordPress:
   - Go to Custom Fields → Field Groups
   - Create fields for your Publication post type
   - Common fields: `downloadUrl`, `publicationType`, `authors`, etc.

## Step 1: Find Your ACF Field Names in GraphQL

1. Visit your GraphQL endpoint: `https://your-domain.com/graphql`
2. Open GraphQL Playground/GraphiQL
3. Try this query to see available fields:

```graphql
query {
  __type(name: "Publication") {
    fields {
      name
      type {
        name
      }
    }
  }
}
```

Or test a publication directly:

```graphql
query {
  publication(id: "your-slug", idType: SLUG) {
    id
    title
    # Try typing "download" or your field name - GraphQL will autocomplete
  }
}
```

## Step 2: Add ACF Fields to Your Queries

### For GET_PUBLICATIONS query:

In `lib/graphql/queries.js`, add your ACF fields after `featuredImage`:

```graphql
export const GET_PUBLICATIONS = gql`
  query GetPublications($first: Int) {
    publications(first: $first) {
      edges {
        node {
          id
          title
          slug
          # ... other fields ...
          featuredImage {
            node {
              sourceUrl
            }
          }
          # Add your ACF fields here:
          downloadUrl
          publicationType
          authors
        }
      }
    }
  }
`;
```

### For GET_PUBLICATION_BY_SLUG query:

Add the same fields:

```graphql
export const GET_PUBLICATION_BY_SLUG = gql`
  query GetPublicationBySlug($slug: ID!) {
    publication(id: $slug, idType: SLUG) {
      id
      title
      # ... other fields ...
      downloadUrl
      publicationType
      authors
    }
  }
`;
```

## Step 3: Update the Wrapper Component

In `app/components/publications-wrapper.js`, use the ACF fields:

```javascript
return {
  id: node.id,
  type: node.publicationType || "Book", // Use ACF field
  title: node.title || "",
  author: node.authors || node.author?.node?.name || "", // Use ACF field if available
  image: node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg",
  slug: node.slug || "",
  downloadUrl: node.downloadUrl || null, // Add download URL from ACF
};
```

## Step 4: Use Download URL in Component

In `app/components/publications.js`, update the download handler:

```javascript
<div
  className={styles.publications_item_download}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.downloadUrl) {
      window.open(item.downloadUrl, "_blank");
    }
  }}
>
  <BsDownload />
</div>
```

## Common ACF Field Types in GraphQL

| ACF Field Type | GraphQL Field Name            | Example                      |
| -------------- | ----------------------------- | ---------------------------- |
| Text           | `fieldName`                   | `downloadUrl`                |
| URL            | `fieldName`                   | `downloadUrl`                |
| File           | `fieldName { sourceUrl }`     | `downloadFile { sourceUrl }` |
| Image          | `fieldName { sourceUrl }`     | `coverImage { sourceUrl }`   |
| Select         | `fieldName`                   | `publicationType`            |
| Textarea       | `fieldName`                   | `description`                |
| Repeater       | `fieldName { nodes { ... } }` | `authors { nodes { name } }` |

## Testing Your ACF Fields

1. **Test in GraphQL Playground:**

```graphql
query {
  publication(id: "test-slug", idType: SLUG) {
    id
    title
    downloadUrl # Your ACF field
    publicationType # Your ACF field
  }
}
```

2. **Check Console Logs:**

The wrapper component logs the response. Check browser console to see what fields are available.

## Troubleshooting

### Field not showing in GraphQL:

1. **Check ACF Field Settings:**

   - Make sure "Show in GraphQL" is enabled
   - Set "GraphQL Field Name" if needed

2. **Check WPGraphQL for ACF:**

   - Plugin must be installed and activated
   - Check plugin settings

3. **Clear Cache:**
   - Clear WordPress cache
   - Restart Next.js dev server

### Field returns null:

- Check if the field has a value in WordPress
- Verify the field is assigned to the Publication post type
- Check field name matches exactly (case-sensitive)

## Example: Complete Query with ACF

```graphql
query GetPublications($first: Int) {
  publications(first: $first) {
    edges {
      node {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        # ACF Fields
        downloadUrl
        publicationType
        authors
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
```

## Next Steps

1. Install WPGraphQL for ACF plugin
2. Create your ACF fields in WordPress
3. Add field names to the GraphQL queries
4. Update the wrapper to use ACF data
5. Test in GraphQL Playground first!
