import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "中国文化之美 - 中国文化网站精选集",
  description: "发现和探索优质的中国文化网站资源，带您领略中国文化之美",
  keywords: "中国文化,文化网站,中国传统文化,文化导航,文化资源",
  authors: [{ name: "WonderfulChina Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "中国文化之美 - 中国文化网站精选集",
    description: "发现和探索优质的中国文化网站资源，带您领略中国文化之美",
    url: "https://wonderchina.win",
    siteName: "中国文化之美",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSans.variable} font-sans bg-secondary text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
