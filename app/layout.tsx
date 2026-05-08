import './globals.css'

export const metadata = {
  title: 'FluentSRS - Aprenda Inglês por Frases',
  description: 'Sistema de repetição espaçada para aprender inglês através de frases completas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
