export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, ui-sans-serif', background: 'linear-gradient(180deg,#0b1024,#1a1440)', color: 'white' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
          <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#4d5cff,#9a4dff)' }} />
            <strong>LMF • LémanFlow</strong>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

