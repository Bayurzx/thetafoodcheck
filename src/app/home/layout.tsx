import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css'
// import { NavbarV0 } from '@/components/component/navbarV0';
import { OauthProviders } from "@/app/providers/oauth"
import { ThemeProvider } from '@/app/providers/theme'
import NavbarTaiwind from "@/components/navbarTailwind";
import WagmiProviderClient from "@/app/providers/wagmiProviderClient";
import { HealthDataProvider } from "@/app/providers/userDataContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodCheck AI",
  description: "Get insight on what you eat",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "192x192", url: "/android-chrome-192x192.png" },
    { rel: "icon", sizes: "512x512", url: "/android-chrome-512x512.png" }
  ],
  alternates: {
    types: {
      "application/manifest+json": "/site.webmanifest"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <OauthProviders>

            <WagmiProviderClient>
              <HealthDataProvider>

                <div className="flex flex-col min-h-screen">

                  {/* <NavbarV0 /> */}
                  <NavbarTaiwind />
                  <main className="flex-grow">
                    <div className="container mx-auto flex justify-center items-start min-h-screen">


                      {children}
                    </div>
                  </main>

                </div>
              </HealthDataProvider>

            </WagmiProviderClient>


          </OauthProviders>
        </ThemeProvider>
      </body>
    </html >
  );
}
