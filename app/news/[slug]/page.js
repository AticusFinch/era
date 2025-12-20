import { getClient } from "@/lib/apollo-client";
import { GET_POST_BY_SLUG } from "@/lib/graphql/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import { IoReaderOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import styles from "./page.module.css";

export default async function NewsPostPage({ params }) {
  const { slug } = await params;
  let post = null;

  try {
    const client = getClient();
    const { data, error } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: {
        slug: slug,
      },
      fetchPolicy: "cache-first",
    });

    if (error) {
      console.error("Error fetching post:", error);
      notFound();
    }

    post = data?.post;

    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error("Error in NewsPostPage:", error);
    notFound();
  }

  const featuredImage = post.featuredImage?.node;
  const author = post.author?.node;
  const category = post.categories?.nodes?.[0];

  // Calculate reading time using shared utility
  const readingTime = calculateReadingTime(post.content);

  // Get full excerpt - remove WordPress truncation markers
  function getFullExcerpt(excerpt, content) {
    // If excerpt exists and doesn't have truncation markers, use it
    if (
      excerpt &&
      !excerpt.includes("[&hellip;]") &&
      !excerpt.includes("[...]")
    ) {
      return excerpt;
    }

    // Otherwise, extract from content (first 300 words or so)
    if (content) {
      const text = content.replace(/<[^>]*>/g, ""); // Strip HTML
      const words = text.split(/\s+/).filter((word) => word.length > 0);
      const excerptWords = words.slice(0, 300).join(" ");
      return excerptWords + (words.length > 300 ? "..." : "");
    }

    return excerpt || "";
  }

  const fullExcerpt = getFullExcerpt(post.excerpt, post.content);

  // Format date
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <Navbar />
      <article className={styles.news_post}>
        <Container>
          <div className={styles.news_post_header}>
            {featuredImage && (
              <div className={styles.news_post_image}>
                <Image
                  src={featuredImage.sourceUrl}
                  alt={featuredImage.altText || post.title}
                  width={featuredImage.mediaDetails?.width || 1200}
                  height={featuredImage.mediaDetails?.height || 800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div className={styles.news_post_meta}>
              {category && (
                <span className={styles.news_post_category}>
                  {category.name}
                </span>
              )}
              <h1 className={styles.news_post_title}>{post.title}</h1>
              <div className={styles.news_post_info}>
                {author && (
                  <p className={styles.news_post_author}>By {author.name}</p>
                )}
                {post.date && (
                  <time className={styles.news_post_date}>
                    <CiCalendarDate />
                    {formatDate(post.date)}
                  </time>
                )}
                <span className={styles.news_post_readingTime}>
                  <IoReaderOutline />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>

          {fullExcerpt && (
            <div
              className={styles.news_post_excerpt}
              dangerouslySetInnerHTML={{ __html: fullExcerpt }}
            />
          )}

          {post.content && (
            <div
              className={styles.news_post_content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </Container>
      </article>
      <Footer />
    </>
  );
}
