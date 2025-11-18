# Quick Start: WordPress GraphQL with Apollo Client

## 🚀 Setup (5 minutes)

### 1. Install WPGraphQL Plugin on WordPress

1. Go to WordPress Admin → Plugins → Add New
2. Search for "WPGraphQL"
3. Install and activate

### 2. Create `.env.local` file

```env
WORDPRESS_GRAPHQL_URL=https://your-wordpress-domain.com/graphql
```

**Replace with your WordPress domain (include `/graphql` at the end)**

### 3. Add to Vercel

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add: `WORDPRESS_GRAPHQL_URL` = `https://your-domain.com/graphql`
3. Select all environments
4. Redeploy

## 📝 Using GraphQL in Your Pages

### Example: Fetch Posts in a Server Component

```javascript
import { getPosts } from "@/lib/wordpress-graphql";

export default async function MyPage() {
  const posts = await getPosts({ perPage: 10 });

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </article>
      ))}
    </div>
  );
}
```

### Example: Using Apollo Client Directly

```javascript
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/graphql/queries";

export default async function MyPage() {
  const client = getClient();

  const { data } = await client.query({
    query: GET_POSTS,
    variables: { first: 10 },
  });

  const posts = data.posts.edges.map((edge) => edge.node);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

## 📚 Available Functions

All functions are in `lib/wordpress-graphql.js`:

- `getPosts(options)` - Get posts
- `getPost(slug)` - Get single post
- `getPages(options)` - Get pages
- `getPage(slug)` - Get single page
- `getCategories()` - Get all categories
- `getPostsByCategory(categoryId, limit)` - Get posts by category
- `searchPosts(query, limit)` - Search posts

## 📖 Full Documentation

See `WORDPRESS_GRAPHQL_SETUP.md` for detailed instructions and examples.
