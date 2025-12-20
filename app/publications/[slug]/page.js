import { getClient } from "@/lib/apollo-client";
import { GET_PUBLICATION_BY_SLUG } from "@/lib/graphql/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import styles from "./page.module.css";

export default async function PublicationPage({ params }) {
  const { slug } = await params;
  let publication = null;

  try {
    const client = getClient();
    const { data, error } = await client.query({
      query: GET_PUBLICATION_BY_SLUG,
      variables: {
        slug: slug,
      },
      fetchPolicy: "cache-first",
    });

    if (error) {
      console.error("Error fetching publication:", error);
      notFound();
    }

    publication = data?.publication;

    if (!publication) {
      notFound();
    }
  } catch (error) {
    console.error("Error in PublicationPage:", error);
    notFound();
  }

  const featuredImage = publication.featuredImage?.node;
  const author = publication.author?.node;

  return (
    <>
      <Navbar />
      <article className={styles.publication}>
        <Container>
          <div className={styles.publication_header}>
            {featuredImage && (
              <div className={styles.publication_image}>
                <Image
                  src={featuredImage.sourceUrl}
                  alt={featuredImage.altText || publication.title}
                  width={featuredImage.mediaDetails?.width || 1200}
                  height={featuredImage.mediaDetails?.height || 800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div className={styles.publication_meta}>
              <h1 className={styles.publication_title}>{publication.title}</h1>
              {author && (
                <p className={styles.publication_author}>By {author.name}</p>
              )}
              {publication.date && (
                <time className={styles.publication_date}>
                  {new Date(publication.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </div>

          {publication.content && (
            <div
              className={styles.publication_content}
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />
          )}
        </Container>
      </article>
      <Footer />
    </>
  );
}
