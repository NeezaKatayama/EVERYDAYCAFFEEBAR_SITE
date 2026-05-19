import "./globals.css";

export const metadata = {
  title: "Everyday Coffee Bar | Omotesando",
  description:
    "A fashion-forward cafe website concept for Everyday Coffee Bar in Omotesando.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
