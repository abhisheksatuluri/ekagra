import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Text, DM_Serif_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
})

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: ["400"],
  style: ["normal", "italic"],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: ["400"],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Ekāgra — One-pointedness through the body",
  description:
    "Yoga as system regulation. Not lineage. Not mantras. The body is the only path you can't make excuses out of.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifText.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-sand text-deep-brown">{children}</body>
    </html>
  )
}
