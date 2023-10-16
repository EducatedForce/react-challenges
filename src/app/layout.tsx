import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'React challenges project',
  description: 'Project to play with various React challenges and interview questions',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <header>
      <a href="/">Home</a>
    </header>
    {children}
    </body>
    </html>
  )
}
