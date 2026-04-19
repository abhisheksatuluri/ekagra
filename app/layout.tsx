import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Text, DM_Serif_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
})

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: ["400"],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Ekagra Now | Start with your spine.",
  description: "Start with your spine. Watch what returns.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerifText.variable} ${dmSerifDisplay.variable}`}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  )
}
