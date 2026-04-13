"use client";

import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "@/app/components/button";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Container from "@/app/components/container";
import { ourWorkSubnavLinks } from "@/lib/data/our-work-nav";
import { RxChevronRight } from "react-icons/rx";

import { motion, AnimatePresence } from "framer-motion";

const SCROLL_THRESHOLD = 20;
const MOBILE_FLOAT_MAX_PX = 899;

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [isMobileFloat, setIsMobileFloat] = useState(null);
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

  useEffect(() => {
    setMenuMounted(true);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_FLOAT_MAX_PX}px)`);
    const sync = () => setIsMobileFloat(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

  const navbarClassName = [
    styles.navbar,
    !isHomePage && styles.navbar_solid,
    isHomePage && isScrolled && styles.navbar_scrolled,
    isHomePage && !isScrolled && styles.navbar_home_top,
    isMobileFloat === true && styles.navbar_float_mode,
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenuLayer =
    menuMounted &&
    createPortal(
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className={`${styles.navbar_mobile_menu} ${styles.navbar_mobile_menu_open}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              ease: [0.22, 1, 0.36, 1],
              duration: 0.38,
            }}
          >
            <Container>
              <header className={styles.navbar_mobile_header}>
                <Link
                  href="/"
                  className={styles.navbar_mobile_header_logo}
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src="/logo/era@3x.png"
                    alt="ERA logo"
                    width={302}
                    height={97}
                    priority
                  />
                </Link>
                <button
                  type="button"
                  className={styles.navbar_mobile_close}
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <RxCross1 aria-hidden />
                </button>
              </header>
            </Container>
            <div className={styles.navbar_mobile_scroll}>
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
                        {ourWorkSubnavLinks.map(({ href, label }) => (
                          <div key={href}>
                            <Link href={href} onClick={toggleMenu}>
                              {label}
                            </Link>
                          </div>
                        ))}
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  const floatButtonLayer =
    menuMounted &&
    isMobileFloat === true &&
    !isOpen &&
    createPortal(
      <button
        type="button"
        className={styles.navbar_float_fab}
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <RxHamburgerMenu aria-hidden />
      </button>,
      document.body,
    );

  return (
    <>
    <div className={navbarClassName} ref={navRef}>
      {isMobileFloat !== true ? (
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
                <Link href="/about-us/who-we-are">Who We Are</Link>
                <Link href="/about-us/our-team">Our Team</Link>
                <Link href="/about-us/member-organizations">
                  Member Organizations
                </Link>
                <Link href="/about-us/partners-and-donors">
                  Partners & Donors
                </Link>
              </div>
            </motion.div>
            <motion.div
              className={styles.navbar_link_container}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/our-work">Our Work</Link>
              <div className={styles.navbar_dropdown}>
                {ourWorkSubnavLinks.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
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
      ) : null}
    </div>
    {mobileMenuLayer}
    {floatButtonLayer}
    </>
  );
};

export default Navbar;
