import Link from "next/link";
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { IoReaderOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";
import styles from "./related-news.module.css";

export default function RelatedNews({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className={styles.related} aria-label="Related news">
      <div className={styles.related_header}>
        <h2 className={styles.related_title}>
          Related <span className="title-accent">news</span>
        </h2>
        <Link href="/news" className={styles.related_link}>
          View all
          <MdOutlineArrowForward aria-hidden />
        </Link>
      </div>

      <div className={styles.related_grid}>
        {items.map((item) => (
          <article key={item.id || item.slug} className={styles.related_card}>
            <Link
              href={`/news/${item.slug}`}
              className={styles.related_card_link}
              aria-label={`Read ${item.title}`}
            >
              <div className={styles.related_card_media}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1600px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.related_card_body}>
                {item.topicsLabel ? (
                  <span className={styles.related_card_topic}>
                    {item.topicsLabel}
                  </span>
                ) : null}
                <h3 className={styles.related_card_title}>{item.title}</h3>
                <div className={styles.related_card_meta}>
                  <span>
                    <CiCalendarDate aria-hidden />
                    {item.date}
                  </span>
                  {item.readingTime ? (
                    <span>
                      <IoReaderOutline aria-hidden />
                      {item.readingTime}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
