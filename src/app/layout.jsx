import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// Switched global font to Outfit
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "THERMOS Smart Water Bottle",
  description:
    "Hydrate with confidence. Experience unrivalled temperature control wrapped in a meticulously crafted design.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased selection:bg-brand-green selection:text-white`}
    >
      <head>
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 w-full bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
