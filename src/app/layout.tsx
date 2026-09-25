import type { Metadata } from "next";
import "./globals.css";
import { SkipLink } from "@/components/common/SkipLink";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: `${eventConfig.eventName} — The Aburi Mountain Fondo 2026 | Ghana`,
  description:
    "An iconic 115 KM mountain cycling fondo ascending the Akuapem Ridge in Ghana. October 17, 2026. Transparent pricing, full neutral support, timed hill climb.",
  openGraph: {
    title: `${eventConfig.eventName} — The Aburi Mountain Fondo 2026`,
    description:
      "Join us on October 17, 2026 for the inaugural 115 KM Aburi Mountain Fondo in Ghana. Ayi Mensah hill climb, full mechanical support, and Aburi Botanical Gardens finish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ground text-charcoal font-sans antialiased transition-colors">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
