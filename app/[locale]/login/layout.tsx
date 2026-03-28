// Login sahifasi uchun alohida layout — Navbar va Footer yo'q
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
