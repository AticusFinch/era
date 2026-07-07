import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import { getClient } from "@/lib/apollo-client";
import { GET_POSTS, GET_POST_FILTERS } from "@/lib/graphql/queries";
import { mapNewsListItem } from "@/lib/utils/news-map";
import NewsView from "./news-view";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "News | ERA LGBTI",
  description:
    "Browse ERA news, statements, and regional updates from across the Western Balkans and Türkiye.",
};

export default async function NewsPage() {
  let newsItems = [];
  let filterOptions = {
    topics: [],
    postYears: [],
    geographies: [],
  };

  try {
    const client = getClient();

    const [{ data }, filtersResult] = await Promise.all([
      client.query({
        query: GET_POSTS,
        variables: {
          first: 100,
        },
        fetchPolicy: "network-only",
      }),
      client.query({
        query: GET_POST_FILTERS,
        fetchPolicy: "cache-first",
      }),
    ]);

    const filtersData = filtersResult?.data;
    if (filtersData) {
      filterOptions = {
        topics: filtersData.topics?.nodes ?? [],
        postYears: filtersData.postYears?.nodes ?? [],
        geographies: filtersData.geographies?.nodes ?? [],
      };
    }

    if (data?.posts?.edges) {
      newsItems = data.posts.edges.map((edge) => mapNewsListItem(edge.node));
    }
  } catch (error) {
    console.error("Error loading news list:", error);
  }

  return (
    <div className={styles.news_page_background}>
      <Navbar />
      <Container>
        <NewsView items={newsItems} filterOptions={filterOptions} />
      </Container>
      <Footer />
    </div>
  );
}
