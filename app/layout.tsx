import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartProvider from "./components/CartProvider";

export const metadata = {
  title: "Shozada – Premium Footwear",
  description: "Modern premium shoe store built with Next.js and Shopify. Shop the finest footwear collection.",
  keywords: "shoes, premium footwear, sneakers, luxury shoes",
  openGraph: {
    title: "Shozada – Premium Footwear",
    description: "Discover premium footwear designed for comfort, style, and performance.",
    type: "website",
  },
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
