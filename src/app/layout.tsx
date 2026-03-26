import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuan Le PN | Senior Software Engineer & AI Systems Builder',
  description: 'Architecting high-performance digital ecosystems for 15+ years. Specializing in the intersection of Knowledge Graphs, Generative AI, and mission-critical Engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body selection:bg-secondary-container selection:text-on-secondary-container bg-surface text-on-surface overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
