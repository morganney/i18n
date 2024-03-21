import TopBar from "@/components/layout/TopBar";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Foo I18N",
  description: "Type-safe translation",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#082f49] font-sans text-white antialiased ${inter.variable}`}
      >
        <div className="flex min-h-screen flex-col">
          <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-transparent">
            <TopBar />
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-1">
            <div className="mx-4 flex flex-1 flex-col lg:ml-60 xl:mr-72">
              <main className="flex-1 py-10">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
