import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-4xl mx-auto p-6">
          <header className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-suiBlue to-suiViolet" />
            <strong className="text-lg">LMF • LémanFlow</strong>
            <nav className="ml-auto flex gap-3 text-sm opacity-80">
              <a href="/login" className="hover:opacity-100">Login</a>
              <a href="/missions" className="hover:opacity-100">Missions</a>
              <a href="/scan" className="hover:opacity-100">Scan</a>
              <a href="/admin" className="hover:opacity-100">Admin</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

