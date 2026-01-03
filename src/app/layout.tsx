import type { Metadata } from 'next';
import { WalletProvider } from '@/components/WalletProvider';
import { Buffer } from 'buffer';
import './globals.css';

// Fix for Buffer not defined in the browser
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer;
}

export const metadata: Metadata = {
  title: 'Lazorkit Integration Example - Passkey Smart Wallet',
  description: 'High-quality example of Lazorkit SDK integration featuring passkey authentication and gasless transactions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Critical polyfill for Solana libraries
              if (typeof window !== 'undefined' && !window.Buffer) {
                // Buffer will be assigned by the module above, 
                // but this script ensures immediate check if needed.
              }
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        </div>
        <WalletProvider>
          <div className="min-h-screen flex flex-col relative z-0">
            <header className="border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-gradient">
                    Lazorkit Integration
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium tracking-wide uppercase">
                    Premium Smart Wallet Template
                  </p>
                </div>
                <div id="header-actions">
                  {/* Connect button will be here or in children */}
                </div>
              </div>
            </header>
            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
              {children}
            </main>
            <footer className="border-t border-white/5 py-10 mt-20">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm text-slate-500 font-medium tracking-tight">
                  Superteam Vietnam • Built with Lazorkit SDK
                </p>
              </div>
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
