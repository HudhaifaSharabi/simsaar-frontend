import { Tajawal } from "next/font/google";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  description: "سمسار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={league.variable}>
        <DataProvider> <NextUIProvider>{children}        <SpeedInsights />
        </NextUIProvider></DataProvider>
      </body>
    </html>
  );
}
