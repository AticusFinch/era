import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS } from "@/lib/graphql/queries";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import NewsView from "./news-view";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "News | ERA LGBTI",
  description:
    "Browse ERA news, statements, and regional updates from across the Western Balkans and Türkiye.",
};

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .trim();
}

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

export default async function NewsPage() {
  let newsItems = [];

  try {
    const client = getClient();

    const { data } = await client.query({
      query: GET_POSTS,
      variables: {
        first: 100,
      },
      fetchPolicy: "network-only",
    });

    if (data?.posts?.edges) {
      newsItems = data.posts.edges.map((edge) => {
        const node = edge.node;
        const category = node.categories?.nodes?.[0]?.name || "News";
        const imageUrl =
          node.featuredImage?.node?.sourceUrl || "/img/hero/lgbt.jpg";
        const formattedDate = formatDate(node.date);
        const readingTime = calculateReadingTime(node.content);
        const excerpt = removeExcerptTruncation(
          stripHtmlTags(node.excerpt || ""),
        );

        return {
          id: node.id,
          title: node.title || "",
          slug: node.slug || "",
          image: imageUrl,
          category,
          date: formattedDate,
          readingTime,
          excerpt,
        };
      });
    }
  } catch (error) {
    console.error("Error loading news list:", error);
  }

  return (
    <div className={styles.news_page_background}>
      <Navbar />
      <Container>
        <NewsView items={newsItems} />
      </Container>
      <Footer />
    </div>
  );
}
