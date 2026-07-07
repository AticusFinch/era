import { getClient } from "@/lib/apollo-client";
import { GET_POST_BY_SLUG, GET_POSTS } from "@/lib/graphql/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import {
  mapTaxonomyNodes,
  formatTaxonomyLabel,
} from "@/lib/utils/resource-taxonomies";
import { mapPostNewsAcf } from "@/lib/utils/news-acf";
import { mapNewsListItem } from "@/lib/utils/news-map";
import { pickRelatedPosts } from "@/lib/utils/news-related";
import NewsGallery from "./news-gallery";
import RelatedNews from "./related-news";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArrowBack } from "react-icons/md";
import styles from "./page.module.css";

export const revalidate = 60;

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
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

function getLeadParagraph(excerpt, content) {
  if (!excerpt) return null;

  const cleaned = removeExcerptTruncation(excerpt);
  if (!cleaned) return null;

  const excerptText = stripHtml(cleaned);
  const contentText = stripHtml(content);

  if (!excerptText) return null;

  if (
    contentText.startsWith(excerptText) ||
    excerptText.startsWith(
      contentText.slice(0, Math.min(120, contentText.length)),
    )
  ) {
    return null;
  }

  return cleaned;
}

async function getPost(slug) {
  const client = getClient();
  const { data, error } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
    fetchPolicy: "cache-first",
  });

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data?.post ?? null;
}

async function getAllNewsItems() {
  const client = getClient();
  const { data, error } = await client.query({
    query: GET_POSTS,
    variables: { first: 100 },
    fetchPolicy: "cache-first",
  });

  if (error || !data?.posts?.edges) {
    return [];
  }

  return data.posts.edges.map((edge) => mapNewsListItem(edge.node));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Article not found | ERA LGBTI" };
  }

  const description =
    stripHtml(removeExcerptTruncation(post.excerpt)) ||
    stripHtml(post.content).slice(0, 160);

  return {
    title: `${post.title} | ERA LGBTI`,
    description,
  };
}

export default async function NewsPostPage({ params }) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPost(slug);

    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error("Error in NewsPostPage:", error);
    notFound();
  }

  const allNewsItems = await getAllNewsItems();
  const currentItem = mapNewsListItem(post);
  const relatedItems = pickRelatedPosts(allNewsItems, currentItem, 5);

  const featuredImage = post.featuredImage?.node;
  const topicsLabel = formatTaxonomyLabel(
    mapTaxonomyNodes(post.topics?.nodes),
  );
  const readingTime = calculateReadingTime(post.content);
  const leadParagraph = getLeadParagraph(post.excerpt, post.content);
  const { gallery, image: acfImage } = mapPostNewsAcf(post.news);

  return (
    <>
      <Navbar />
      <main className={styles.news_post}>
        <Container>
          <article className={styles.news_post_article}>
            <header className={styles.news_post_header}>
              {topicsLabel ? (
                <span className={styles.news_post_topic}>{topicsLabel}</span>
              ) : null}
              <h1 className={styles.news_post_title}>{post.title}</h1>
              <div className={styles.news_post_info}>
                {post.date && (
                  <time dateTime={post.date}>
                    <CiCalendarDate aria-hidden />
                    {formatDate(post.date)}
                  </time>
                )}
                <span>
                  <IoReaderOutline aria-hidden />
                  {readingTime}
                </span>
              </div>
              {featuredImage && (
                <div className={styles.news_post_image}>
                  <Image
                    src={featuredImage.sourceUrl}
                    alt={featuredImage.altText || post.title}
                    width={featuredImage.mediaDetails?.width || 1200}
                    height={featuredImage.mediaDetails?.height || 800}
                    style={{ width: "100%", height: "auto" }}
                    priority
                  />
                </div>
              )}
            </header>

            {leadParagraph && (
              <div
                className={styles.news_post_lead}
                dangerouslySetInnerHTML={{ __html: leadParagraph }}
              />
            )}

            {post.content && (
              <div
                className={styles.news_post_content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {acfImage && (
              <figure className={styles.news_post_acf_image}>
                <Image
                  src={acfImage.src}
                  alt={acfImage.alt || post.title}
                  width={acfImage.width}
                  height={acfImage.height}
                  className={styles.news_post_acf_image_media}
                  sizes="(min-width: 1024px) 52rem, 100vw"
                />
              </figure>
            )}

            <NewsGallery images={gallery} />

            <footer className={styles.news_post_footer}>
              <Link href="/news" className={styles.news_post_footer_link}>
                <MdOutlineArrowBack aria-hidden />
                All news
              </Link>
            </footer>
          </article>

          <RelatedNews items={relatedItems} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
