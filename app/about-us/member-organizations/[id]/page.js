import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Container from "@/app/components/container";
import {
  encodePublicImagePath,
  getAllMemberIds,
  getMemberWithCountryById,
} from "@/lib/data/members";
import { IoIosMail } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";
import styles from "./page.module.css";
import PageUnderConstruction from "@/app/components/pageUnderConstruction";

export function generateStaticParams() {
  return getAllMemberIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const found = getMemberWithCountryById(id);
  if (!found) return { title: "Member not found" };
  return {
    title: `${found.member.name} | Member organizations`,
    description: found.member.description.slice(0, 160),
  };
}

export default async function MemberOrganizationPage({ params }) {
  const { id } = await params;
  const found = getMemberWithCountryById(id);
  if (!found) notFound();

  const { member, countryName } = found;
  const src = encodePublicImagePath(member.logo);

  return (
    <>
      <Navbar />
      <PageUnderConstruction />
      {/* <main className={styles.mop_detail_page}>
        <Container>
          <Link href="/about-us/member-organizations" className={styles.mop_detail_back}>
            ← Member organizations
          </Link>
          <article className={styles.mop_detail_card}>
            <div className={styles.mop_detail_logo}>
              <Image
                src={src}
                alt={member.name}
                width={320}
                height={200}
                className={styles.mop_detail_img}
                sizes="(max-width: 768px) 100vw, 42rem"
                unoptimized
                priority
              />
            </div>
            <p className={styles.mop_detail_country}>{countryName}</p>
            <h1 className={styles.mop_detail_title}>{member.name}</h1>
            <p className={styles.mop_detail_desc}>{member.description}</p>
            <div className={styles.mop_detail_meta}>
              <p className={styles.mop_detail_meta_row}>
                <IoIosMail className={styles.mop_detail_meta_icon} aria-hidden />
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </p>
              {member.website ? (
                <p className={styles.mop_detail_meta_row}>
                  <IoGlobeOutline
                    className={styles.mop_detail_meta_icon}
                    aria-hidden
                  />
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.website.replace(/^https?:\/\//i, "")}
                  </a>
                </p>
              ) : null}
            </div>
          </article>
        </Container>
      </main> */}
      <Footer />
    </>
  );
}
