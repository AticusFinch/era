import React from "react";
import styles from "./page.module.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PageUnderConstruction from "@/app/components/pageUnderConstruction";

const PartnerWithUs = () => {
  return (
    <>
      <Navbar />
      <PageUnderConstruction />
      <Footer />
    </>
  );
};

export default PartnerWithUs;
