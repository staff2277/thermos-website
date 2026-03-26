import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Thermos - Smart Water Bottle",
  description: "Experience premium hydration tracking.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import PageTransition from "@/components/layout/PageTransition";
import ScrollPath from "@/components/layout/ScrollPath";
import { AppProvider } from "@/lib/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased min-h-screen flex flex-col bg-black`}>
        <AppProvider>
          <Navbar />
          <CartSidebar />
          {/* <ScrollPath /> */}
          <PageTransition>
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
