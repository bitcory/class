import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PrefsProvider } from "@/lib/prefs";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

const paperlogy = localFont({
  variable: "--font-paperlogy",
  display: "swap",
  src: [
    { path: "../../public/fonts/Paperlogy-3Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Paperlogy-4Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Paperlogy-5Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Paperlogy-6SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Paperlogy-7Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Paperlogy-8ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/Paperlogy-9Black.ttf", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "AI 활용과정 | 생성형 AI 활용 실무 4주 과정",
    template: "%s | AI 활용과정",
  },
  description:
    "AI는 어렵지 않습니다. 말만 걸 줄 알면 됩니다. 생성형 AI 활용 실무 4주 과정 강의 자료와 프롬프트 모음.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${paperlogy.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <PrefsProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-foreground focus:px-4 focus:py-3 focus:text-background"
          >
            본문 바로가기
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </PrefsProvider>
      </body>
    </html>
  );
}
