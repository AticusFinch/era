# WordPress GraphQL Setup Guide (Apollo Client)

This guide will help you connect your headless WordPress site to your Next.js app using **GraphQL and Apollo Client**. This approach offers better type safety, more efficient queries, and built-in caching.

## Why GraphQL over REST API?

- ✅ **Type Safety**: GraphQL schema provides better type checking
- ✅ **Efficient Queries**: Fetch only the data you need
- ✅ **Built-in Caching**: Apollo Client handles caching automatically
- ✅ **Better Developer Experience**: GraphQL Playground for testing
- ✅ **Single Endpoint**: One endpoint for all your data needs

## Prerequisites

1. **WordPress Site** with WPGraphQL plugin installed
2. **Next.js App** (you already have this!)

## Step 1: Install WPGraphQL Plugin on WordPress

1. Log into your WordPress admin panel
2. Go to **Plugins** → **Add New**
3. Search for **"WPGraphQL"**
4. Install and activate the plugin
5. The GraphQL endpoint will be available at: `https://your-domain.com/graphql`

### Optional: Install WPGraphQL Extensions

- **WPGraphQL for Advanced Custom Fields** (if using ACF)
- **WPGraphQL for Yoast SEO** (if using Yoast)
- **WPGraphQL Content Blocks** (if using Gutenberg)

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your WordPress GraphQL URL:

```env
WORDPRESS_GRAPHQL_URL=https://your-wordpress-domain.com/graphql
```

**Important Notes:**

- Include `/graphql` at the end
- Do NOT include a trailing slash
- Example: `WORDPRESS_GRAPHQL_URL=https://example.com/graphql` ✅
- NOT: `WORDPRESS_GRAPHQL_URL=https://example.com/graphql/` ❌

## Step 3: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the variable:
   - **Name**: `WORDPRESS_GRAPHQL_URL`
   - **Value**: `https://your-wordpress-domain.com/graphql`
   - **Environment**: Production, Preview, and Development (select all)
4. Click **Save**
5. Redeploy your site

## Step 4: Test the Connection

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/test-wordpress-graphql`
3. You should see your WordPress posts if everything is working!

## Step 5: Using GraphQL in Your Components

### Example: Fetch Posts in a Server Component

```javascript
// app/news/page.js
import { getPosts } from "@/lib/wordpress-graphql";

export default async function NewsPage() {
  const posts = await getPosts({
    perPage: 10,
    orderBy: "DATE",
    order: "DESC",
  });

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          {post.featuredImage && (
            <img
              src={post.featuredImage.sourceUrl}
              alt={post.featuredImage.altText}
            />
          )}
        </article>
      ))}
    </div>
  );
}
```

### Example: Fetch Single Post

```javascript
// app/news/[slug]/page.js
import { getPost } from "@/lib/wordpress-graphql";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Example: Search Posts

```javascript
import { searchPosts } from "@/lib/wordpress-graphql";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const results = await searchPosts(query, 10);

  return (
    <div>
      <h1>Search Results</h1>
      {results.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Available Functions

All functions are in `lib/wordpress-graphql.js`:

- `getPosts(options)` - Fetch posts with filtering options
- `getPost(identifier)` - Fetch a single post by ID or slug
- `getPages(options)` - Fetch pages
- `getPage(identifier)` - Fetch a single page by ID or slug
- `getCategories()` - Fetch all categories
- `getPostsByCategory(categoryId, limit)` - Fetch posts by category
- `searchPosts(query, limit)` - Search posts

## GraphQL Queries

All GraphQL queries are defined in `lib/graphql/queries.js`. You can customize them or add new ones as needed.

## Testing GraphQL Endpoint

### Using GraphQL Playground

1. Visit: `https://your-domain.com/graphql`
2. You should see the GraphQL Playground interface
3. Try this query:

```graphql
query {
  posts(first: 5) {
    edges {
      node {
        id
        title
        slug
        date
      }
    }
  }
}
```

### Using Browser

Visit: `https://your-domain.com/graphql` - you should see the GraphQL Playground or GraphiQL interface.

## Troubleshooting

### Error: "WORDPRESS_GRAPHQL_URL is not set"

- Make sure `.env.local` exists and has the correct variable
- Restart your Next.js dev server after adding environment variables
- Check that Vercel environment variables are set correctly

### Error: "Failed to fetch" or Network errors

- Verify the GraphQL endpoint is accessible: `https://your-domain.com/graphql`
- Make sure WPGraphQL plugin is installed and activated
- Check if your WordPress site is publicly accessible
- Verify the URL format (should end with `/graphql`, no trailing slash)

### Error: "Cannot query field X"

- This means the field doesn't exist in your GraphQL schema
- Check the GraphQL Playground to see available fields
- You may need to install additional WPGraphQL extensions
- Update the query in `lib/graphql/queries.js`

### No data returned

- Test the GraphQL endpoint directly in GraphQL Playground
- Check if your WordPress site has published posts
- Verify the query syntax is correct
- Check browser console for detailed error messages

### CORS Errors

WPGraphQL should handle CORS automatically, but if you encounter issues:

1. Install **"WPGraphQL CORS"** plugin, or
2. Add to your theme's `functions.php`:

```php
add_action('graphql_init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});
```

## Apollo Client Configuration

The Apollo Client is configured in `lib/apollo-client.js`. You can customize:

- **Cache policies**: Modify `InMemoryCache` configuration
- **Fetch policies**: Change default `fetchPolicy` options
- **Headers**: Add authentication headers if needed

## Security Considerations

1. **GraphQL Endpoint**: By default, WPGraphQL is publicly accessible. Consider:

   - Using authentication for sensitive queries
   - Rate limiting to prevent abuse
   - Restricting certain fields if needed

2. **Environment Variables**: Never commit `.env.local` to git

3. **Caching**: Apollo Client caches responses. Clear cache if data seems stale.

## Comparison: REST API vs GraphQL

| Feature        | REST API             | GraphQL                   |
| -------------- | -------------------- | ------------------------- |
| Setup          | Built-in WordPress   | Requires WPGraphQL plugin |
| Queries        | Multiple endpoints   | Single endpoint           |
| Data Fetching  | Over-fetching common | Fetch only what you need  |
| Type Safety    | Limited              | Strong (with schema)      |
| Caching        | Manual               | Built-in (Apollo)         |
| Learning Curve | Easier               | Steeper                   |

## Next Steps

1. ✅ Install WPGraphQL plugin on WordPress
2. ✅ Set up environment variables
3. ✅ Test the connection
4. Update your components to use GraphQL functions
5. Create dynamic routes for posts/pages
6. Implement search functionality
7. Add pagination for post listings
8. Set up proper error handling and loading states

## Resources

- [WPGraphQL Documentation](https://www.wpgraphql.com/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Documentation](https://graphql.org/learn/)
