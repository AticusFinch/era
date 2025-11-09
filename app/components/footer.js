"use client";

import styles from "./footer.module.css";
import Container from "@/app/components/container";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineEmail } from "react-icons/md";
import { MdEmail } from "react-icons/md";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaBluesky,
} from "react-icons/fa6";

import { TbBrandLinktree } from "react-icons/tb";

const footerLinks = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/terms-of-use",
    label: "Terms of use",
  },
  {
    href: "/accessibility-statement",
    label: "Accessibility Statement",
  },
];

const footerSocial = [
  {
    href: "https://www.instagram.com/lgbtiera/",
    label: <FaInstagram />,
  },
  {
    href: "https://www.facebook.com/lgbtiera/",
    label: <FaFacebook />,
  },
  {
    href: "https://www.linkedin.com/company/lgbtiera/",
    label: <FaLinkedin />,
  },
  {
    href: "https://x.com/lgbtiera",
    label: <FaSquareXTwitter />,
  },
  {
    href: "https://bsky.app/profile/era-lgbti.bsky.social",
    label: <FaBluesky />,
  },
  {
    href: "https://linktr.ee/lgbti_era",
    label: <TbBrandLinktree />,
  },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.footer_container}>
          <div className={styles.footer_top}>
            <div className={styles.footer_logo}>
              <Image
                src="/logo/era-white.png"
                alt="Logo"
                width={302}
                height={97}
              />
            </div>
            <div className={styles.footer_links}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.footer_link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.footer_contact}>
              <Link
                href="mailto:office@lgbti-era.org"
                className={styles.footer_contact_text_value}
              >
                <MdEmail /> office@lgbti-era.org
              </Link>
            </div>
          </div>
          <div className={styles.footer_bottom}>
            <div className={styles.footer_social}>
              {footerSocial.map((social) => (
                <Link key={social.href} href={social.href}>
                  {social.label}
                </Link>
              ))}
            </div>
            <div>
              <p className={styles.footer_bottom_text}>
                &copy; {new Date().getFullYear()} ERA. All rights reserved.
              </p>
              <p className={styles.footer_bottom_text}>
                Website by Kaizen Web Solutions.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
