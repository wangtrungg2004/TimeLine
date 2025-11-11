// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Timeline Vật liệu – Từ đá đến chip",
    template: "%s · Materials Timeline",
  },
  description:
    "Trải nghiệm tương tác khám phá cách vật liệu định hình năng suất, thương mại, chuỗi cung ứng và tăng trưởng kinh tế qua các thời kỳ.",
  applicationName: "Materials Timeline",
  generator: "Next.js",
  keywords: [
    "materials",
    "timeline",
    "silicon",
    "đất hiếm",
    "cách mạng công nghiệp",
    "kinh tế bền vững",
  ],
  authors: [{ name: "Nhóm của bạn" }],
  openGraph: {
    title: "Timeline Vật liệu – Từ đá đến chip",
    description:
      "Khám phá vật liệu → năng suất → thương mại → chuỗi cung ứng → tăng trưởng.",
    type: "website",
    // metadataBase: new URL("https://<domain-cua-ban>"), // nếu đã deploy, bỏ comment và điền domain
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Materials Timeline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeline Vật liệu – Từ đá đến chip",
    description:
      "Trải nghiệm tương tác về vai trò vật liệu trong phát triển kinh tế.",
    images: ["/og-cover.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  // Nếu bạn giữ theme tối:
  themeColor: "#0b1020",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} font-sans antialiased`}>
        {/* Skip link for a11y */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-black/70 text-white px-3 py-2 rounded"
        >
          Bỏ qua nội dung dẫn và tới nội dung chính
        </a>

        <div id="app-root">
          <main id="main">{children}</main>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
