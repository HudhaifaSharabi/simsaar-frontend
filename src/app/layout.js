import { Tajawal } from "next/font/google";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from 'next/head';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "leaflet/dist/leaflet.css";
import 'swiper/css/scrollbar';

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "@/assets/scss/style.scss";
import "@/assets/css/materialdesignicons.min.css";
import { DataProvider } from "@/context/DataContext";
import { NextUIProvider } from "@nextui-org/react";


const league = Tajawal({
  subsets: ["latin"],
  weight: ["300", "500"],
  variable: "--font-league",
});
export const metadata = {
  title: "سمسار",
  description: "جولة 360 تفاعلية داخل العقارات",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-512.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <Head>
        {/* Favicon icons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="سمسار" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff1961" />
      </Head>
      <body className={league.variable}>
        <DataProvider> <NextUIProvider>{children}        <SpeedInsights />
        </NextUIProvider></DataProvider>
      </body>
    </html>
  );
}
