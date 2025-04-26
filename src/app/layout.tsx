import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/WalletProvider";

// Font optimization with preloading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['monospace'],
});

// Advanced metadata for better SEO
export const metadata: Metadata = {
  title: "OneClickDeploy | Modern Smart Contract Deployment",
  description: "Deploy ERC-20 tokens and NFT collections in seconds with no coding required. The easiest way to launch your web3 project.",
  keywords: ["blockchain", "smart contracts", "web3", "deploy", "ethereum", "tokens", "NFT", "DeFi", "cryptocurrency"],
  authors: [{ name: "OneClickDeploy Team" }],
  creator: "OneClickDeploy",
  publisher: "OneClickDeploy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://OneClickDeploy.app",
    title: "OneClickDeploy | Modern Smart Contract Deployment",
    description: "Deploy tokens and NFTs with no coding required",
    siteName: "OneClickDeploy",
    images: [{
      url: "/og-image.png", // You'll need to add this image to your public folder
      width: 1200,
      height: 630,
      alt: "OneClickDeploy Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneClickDeploy | Modern Smart Contract Deployment",
    description: "Deploy tokens and NFTs with no coding required",
    creator: "@OneClickDeploy",
    images: ["/twitter-image.png"], // You'll need to add this image to your public folder
  },
  metadataBase: new URL("https://OneClickDeploy.app"),
};

// Viewport settings for better mobile experience
export const viewport: Viewport = {
  themeColor: "#312e81", // Indigo color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#312e81" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-black to-indigo-950 text-white min-h-screen overflow-x-hidden font-sans`}
      >
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none z-0" />
        <div className="fixed top-0 left-[-20%] w-[60%] h-[30%] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0" aria-hidden="true" />
        <div className="fixed bottom-0 right-[-20%] w-[60%] h-[30%] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none z-0" aria-hidden="true" />
        
        <WalletProvider>
          <main className="relative z-10">
        {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
