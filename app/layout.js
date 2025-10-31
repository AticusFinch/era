import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "ERA LGBTI",
  description:
    "ERA LGBTI is a non-profit organization that provides resources and support to the LGBTI community in Western Balkan and Turkey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/img/hero/lgbt.jpg"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
