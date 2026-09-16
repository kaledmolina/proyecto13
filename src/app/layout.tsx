import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { db } from "@/lib/db";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let settingsMap: Record<string, string> = {};
  try {
    const settings = await db.siteSettings.findMany();
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }
  } catch (error) {
    console.error("Failed to fetch settings for metadata:", error);
  }

  const siteName = settingsMap["site_name"] || "Urabá Informa";
  const seoTitle = settingsMap["seo_title"] || `${siteName} | Portal de Noticias Digital`;
  const siteDesc = settingsMap["site_description"] || "Tu portal de noticias digital de confianza. Las últimas noticias de Urabá, Antioquia, Colombia, actualidad, deportes y más.";
  const siteFavicon = settingsMap["site_favicon"] || "https://api.dicebear.com/9.x/initials/svg?seed=UI&backgroundColor=c0392b";

  return {
    title: seoTitle,
    description: siteDesc,
    keywords: ["noticias", "urabá", "urabá informa", "actualidad", "antioquia", "colombia", "deportes", "política", "cultura", "economía"],
    authors: [{ name: siteName }],
    icons: {
      icon: siteFavicon,
    },
    openGraph: {
      title: siteName,
      description: siteDesc,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${lora.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SonnerToaster />
          <ShadcnToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
