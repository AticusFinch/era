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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  // Close nested dropdown when menu closes
  useEffect(() => {
    if (!isOpen && isAboutDropdownOpen) {
      setIsAboutDropdownOpen(false);
    }
  }, [isOpen, isAboutDropdownOpen]);

  useEffect(() => {
    if (!isOpen && isResourcesDropdownOpen) {
      setIsResourcesDropdownOpen(false);
    }
  }, [isOpen, isResourcesDropdownOpen]);

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
    <div className={styles.navbar} ref={navRef}>
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
                <Link href="/mission">Mission</Link>
                <Link href="/team">Our Team</Link>
                <Link href="/history">History</Link>
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
                <Link href="/our-work/donations">Donators</Link>
                <Link href="/our-work/publications">Publications</Link>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/trainings">Trainings</Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href="/get-involved">Get Involved</Link>
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
                          <Link href="/mission" onClick={toggleMenu}>
                            Mission
                          </Link>
                        </div>
                        <div>
                          <Link href="/team" onClick={toggleMenu}>
                            Team
                          </Link>
                        </div>
                        <div>
                          <Link href="/history" onClick={toggleMenu}>
                            History
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
                        onClick={toggleResourcesDropdown}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isResourcesDropdownOpen ? 90 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <RxChevronRight />
                      </motion.div>
                    </div>

                    {isResourcesDropdownOpen && (
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
                            href="/our-work/publications"
                            onClick={toggleMenu}
                          >
                            Publications
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
                    <Link href="/trainings" onClick={toggleMenu}>
                      Trainings
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <Link href="/get-involved" onClick={toggleMenu}>
                      Get Involved
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
