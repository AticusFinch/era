import { getClient } from "@/lib/apollo-client";
import { GET_RESOURCE_BY_SLUG } from "@/lib/graphql/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import styles from "./page.module.css";

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  let resource = null;

  try {
    const client = getClient();
    const { data, error } = await client.query({
      query: GET_RESOURCE_BY_SLUG,
      variables: {
        slug: slug,
      },
      fetchPolicy: "cache-first",
    });

    if (error) {
      console.error("Error fetching resource:", error);
      notFound();
    }

    resource = data?.resource;

    if (!resource) {
      notFound();
    }
  } catch (error) {
    console.error("Error in ResourcePage:", error);
    notFound();
  }

  const featuredImage = resource.featuredImage?.node;
  const author = resource.author?.node;

  return (
    <>
      <Navbar />
      <article className={styles.resource}>
        <Container>
          <div className={styles.resource_header}>
            {featuredImage && (
              <div className={styles.resource_image}>
                <Image
                  src={featuredImage.sourceUrl}
                  alt={featuredImage.altText || resource.title}
                  width={featuredImage.mediaDetails?.width || 1200}
                  height={featuredImage.mediaDetails?.height || 800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div className={styles.resource_meta}>
              <h1 className={styles.resource_title}>{resource.title}</h1>
              {author && (
                <p className={styles.resource_author}>By {author.name}</p>
              )}
              {resource.date && (
                <time className={styles.resource_date}>
                  {new Date(resource.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </div>

          {resource.content && (
            <div
              className={styles.resource_content}
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          )}
        </Container>
      </article>
      <Footer />
    </>
  );
}
