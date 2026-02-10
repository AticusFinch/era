"use client";

import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "@/app/components/button";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Container from "@/app/components/container";
import { RxChevronRight } from "react-icons/rx";

import { motion, AnimatePresence } from "framer-motion";

const SCROLL_THRESHOLD = 20;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isOurWorkDropdownOpen, setIsOurWorkDropdownOpen] = useState(false);
  const [isGetInvolvedDropdownOpen, setIsGetInvolvedDropdownOpen] =
    useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const toggleOurWorkDropdown = () => {
    setIsOurWorkDropdownOpen(!isOurWorkDropdownOpen);
  };

  const toggleGetInvolvedDropdown = () => {
    setIsGetInvolvedDropdownOpen(!isGetInvolvedDropdownOpen);
  };

  // Close nested dropdown when menu closes
  useEffect(() => {
    if (!isOpen && isAboutDropdownOpen) {
      setIsAboutDropdownOpen(false);
    }
  }, [isOpen, isAboutDropdownOpen]);

  useEffect(() => {
    if (!isOpen && isOurWorkDropdownOpen) {
      setIsOurWorkDropdownOpen(false);
    }
  }, [isOpen, isOurWorkDropdownOpen]);

  useEffect(() => {
    if (!isOpen && isGetInvolvedDropdownOpen) {
      setIsGetInvolvedDropdownOpen(false);
    }
  }, [isOpen, isGetInvolvedDropdownOpen]);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen]);

  // Measure navbar height and expose as CSS variable for remaining-height menu
  useLayoutEffect(() => {
    const element = navRef.current;
    if (!element) return;

    const setNavHeightVar = () => {
      const rect = element.getBoundingClientRect();
      document.documentElement.style.setProperty("--nav-h", `${rect.height}px`);
    };

    // Set initial height synchronously before paint
    setNavHeightVar();

    const ro = new ResizeObserver(setNavHeightVar);
    ro.observe(element);

    window.addEventListener("resize", setNavHeightVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setNavHeightVar);
    };
  }, []);

  return (
    <div
      className={`${styles.navbar} ${isScrolled ? styles.navbar_scrolled : ""}`}
      ref={navRef}
    >
      <Container>
        <div className={styles.navbar_container}>
          <Link href="/" className={styles.navbar_logo}>
            <Image
              src="/logo/era@3x.png"
              alt="ERA logo"
              width={302}
              height={97}
              priority
            />
          </Link>
          <div className={styles.navbar_hamburger} onClick={toggleMenu}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{
                  duration: 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                whileTap={{ scale: 0.9 }}
                style={{ transformOrigin: "center" }}
              >
                {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Menu */}
          <div className={styles.navbar_links}>
            <motion.div
              className={styles.navbar_link_container}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/about-us">About Us</Link>
              <div className={styles.navbar_dropdown}>
                <Link href="/mission">Who We Are</Link>
                <Link href="/team">Our Team</Link>
                <Link href="/history">Member Organizations</Link>
                <Link href="/history">Partners & Donors</Link>
                <Link href="/history">Transparency & Policies</Link>
              </div>
            </motion.div>
            <motion.div
              className={styles.navbar_link_container}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/our-work">Our Work</Link>
              <div className={styles.navbar_dropdown}>
                <Link href="/our-work/projects">Projects</Link>
                <Link href="/our-work/donations">Training Hub</Link>
                <Link href="/our-work/publications">WLW & TNBI Caucuses</Link>
                <Link href="/our-work/publications">Community Support</Link>
                <Link href="/our-work/publications">Advocacy</Link>
                <Link href="/our-work/publications">Research</Link>
                <Link href="/our-work/publications">Events</Link>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/resources">Resources</Link>
            </motion.div>
            <motion.div
              className={styles.navbar_link_container}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/get-involved">Get Involved</Link>
              <div className={styles.navbar_dropdown}>
                <Link href="/our-work/projects">Partner With Us</Link>
                <Link href="/our-work/donations">Subgranting</Link>
                <Link href="/our-work/publications">Other Calls</Link>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/news">News</Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/contact">Contact</Link>
            </motion.div>
          </div>
          <div className={styles.navbar_buttons}>
            <Button
              href="/become-a-member"
              className={styles.navbar_button_member}
            >
              Become a Member
            </Button>
            <Button href="/donate" className={styles.navbar_button_donate}>
              Donate
            </Button>
          </div>
        </div>
      </Container>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.navbar_mobile_menu} ${
              isOpen ? styles.navbar_mobile_menu_open : ""
            }`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
          >
            <div className={styles.navbar_mobile_topfade} aria-hidden="true" />
            <Container>
              <div className={styles.navbar_mobile_content}>
                <div className={styles.navbar_mobile_links}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className={styles.navbar_mobile_link}>
                      <Link href="/about-us">About Us</Link>
                      <motion.div
                        onClick={toggleAboutDropdown}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isAboutDropdownOpen ? 90 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <RxChevronRight />
                      </motion.div>
                    </div>
                    {isAboutDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        className={styles.navbar_mobile_dropdown}
                      >
                        <div>
                          <Link href="about-us/who-we-are" onClick={toggleMenu}>
                            Who We Are
                          </Link>
                        </div>
                        <div>
                          <Link href="about-us/our-team" onClick={toggleMenu}>
                            Our Team
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="about-us/member-organizations"
                            onClick={toggleMenu}
                          >
                            Member Organizations
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="about-us/partners-and-donors"
                            onClick={toggleMenu}
                          >
                            Partners & Donors
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="about-us/transparency-and-policies"
                            onClick={toggleMenu}
                          >
                            Transparency & Policies
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <div className={styles.navbar_mobile_link}>
                      <Link href="/our-work" onClick={toggleMenu}>
                        Our Work
                      </Link>
                      <motion.div
                        onClick={toggleOurWorkDropdown}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOurWorkDropdownOpen ? 90 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <RxChevronRight />
                      </motion.div>
                    </div>

                    {isOurWorkDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        className={styles.navbar_mobile_dropdown}
                      >
                        <div>
                          <Link href="/our-work/projects" onClick={toggleMenu}>
                            Projects
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/our-work/training-hub"
                            onClick={toggleMenu}
                          >
                            Training Hub
                          </Link>
                        </div>
                        <div>
                          <Link href="/our-work/caucuses" onClick={toggleMenu}>
                            WLW & TNBI Caucuses
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/our-work/community-support"
                            onClick={toggleMenu}
                          >
                            Community Support
                          </Link>
                        </div>
                        <div>
                          <Link href="/our-work/advocacy" onClick={toggleMenu}>
                            Advocacy
                          </Link>
                        </div>
                        <div>
                          <Link href="/our-work/research" onClick={toggleMenu}>
                            Research
                          </Link>
                        </div>
                        <div>
                          <Link href="/our-work/events" onClick={toggleMenu}>
                            Events
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Link href="/resources" onClick={toggleMenu}>
                      Resources
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <div className={styles.navbar_mobile_link}>
                      <Link href="get-involved" onClick={toggleMenu}>
                        Get Involved
                      </Link>
                      <motion.div
                        onClick={toggleGetInvolvedDropdown}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isGetInvolvedDropdownOpen ? 90 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <RxChevronRight />
                      </motion.div>
                    </div>
                    {isGetInvolvedDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        className={styles.navbar_mobile_dropdown}
                      >
                        <div>
                          <Link
                            href="/get-involved/partner-with-us"
                            onClick={toggleMenu}
                          >
                            Partner With Us
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/get-involved/subgranting"
                            onClick={toggleMenu}
                          >
                            Subgranting
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/get-involved/other-calls"
                            onClick={toggleMenu}
                          >
                            Other Calls
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <Link href="/news" onClick={toggleMenu}>
                      News
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Link href="/contact" onClick={toggleMenu}>
                      Contact
                    </Link>
                  </motion.div>
                </div>
                <div className={styles.navbar_mobile_buttons}>
                  <div>
                    <Button
                      href="/become-a-member"
                      className={styles.navbar_mobile_button_member}
                    >
                      Become a Member
                    </Button>
                  </div>
                  <div>
                    <Button
                      href="/donate"
                      className={styles.navbar_mobile_button_donate}
                    >
                      Donate
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
