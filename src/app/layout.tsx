import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css"
import Navbar from "./components/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEase",
  description: "Ecommerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{marginTop:"80px"}}></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
