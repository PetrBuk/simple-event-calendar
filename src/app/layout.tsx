import './globals.css'

export const metadata = {
  title: 'Simple Event Calendar',
  description: 'Simple calendar view for managing users events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
