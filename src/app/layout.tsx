import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarV0 } from '@/components/component/navbarV0';
import { OauthProviders } from "@/app/providers/oauth"
import { ThemeProvider } from '@/app/providers/theme'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodCheck AI",
  description: "Get insight on what you eat",
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
            <div className="flex flex-col min-h-screen">

              <NavbarV0 />
              <main className="flex-grow">

                {children}
              </main>

            </div>
          </OauthProviders>
        </ThemeProvider>
      </body>
    </html >
  );
}
