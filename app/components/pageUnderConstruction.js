import styles from "./pageUnderConstruction.module.css";
import Image from "next/image";
import Container from "@/app/components/container";
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaBluesky,
} from "react-icons/fa6";

import { TbBrandLinktree } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

const PageUnderConstruction = () => {
  return (
    <div className={styles.pageUnderConstruction}>
      <Container>
        <div className={styles.pageUnderConstruction_container}>
          <div className={styles.pageUnderConstruction_text}>
            <h1 className={styles.pageUnderConstruction_title}>
              Oops... This page is still{" "}
              <span
                className={`${styles.pageUnderConstruction_title_accent} title-accent-secondary`}
              >
                getting ready!
              </span>
            </h1>
            <p className={styles.pageUnderConstruction_subtitle}>
              We’re giving this part of the ERA website a little makeover to
              make it brighter and bolder - just like our community!
            </p>
          </div>
          <div className={styles.pageUnderConstruction_contact}>
            <p className={styles.pageUnderConstruction_subtitle}>
              Check back soon to see what’s new. In the meantime, feel free to
              connect with us:
            </p>
            <div className={styles.pageUnderConstruction_contact_email}>
              <Link href="mailto:office@lgbti-era.org">
                <MdEmail />
                office@lgbti-era.org
              </Link>
            </div>
            <div className={styles.pageUnderConstruction_social_links}>
              <Link href="https://www.facebook.com/lgbtiera/">
                <FaFacebook />
              </Link>
              <Link href="https://www.instagram.com/lgbtiera/">
                <FaInstagram />
              </Link>
              <Link href="https://www.linkedin.com/company/lgbtiera/">
                <FaLinkedin />
              </Link>
              <Link href="https://www.x.com/lgbtiera/">
                <FaSquareXTwitter />
              </Link>
              <Link href="https://bsky.app/profile/lgbtiera.bsky.social">
                <FaBluesky />
              </Link>
              <Link href="https://linktr.ee/lgbtiera">
                <TbBrandLinktree />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageUnderConstruction;
