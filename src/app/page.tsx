'use client';

import { ConnectButton } from '@/components/ConnectButton';
import { WalletDisplay } from '@/components/WalletDisplay';
import { GaslessTransfer } from '@/components/GaslessTransfer';
import { useWallet } from '@lazorkit/wallet';
import Image from 'next/image';

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">v1.2 Production Ready</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
               Next-Gen <span className="text-gradient">Solana </span>
               <br />
               Wallets.
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
              Onboard users in seconds with biometrics. No seed phrases, no gas fees, 
              no friction. The ultimate developer template for Lazorkit integration.
            </p>
            {!isConnected && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <ConnectButton />
                <button className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-white transition-all">
                  View Demo Tutorial
                </button>
              </div>
            )}
          </div>
          
          <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-[400px]">
             <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-pulse" />
             <div className="relative glass-card h-full w-full p-8 flex flex-col justify-center items-center text-center space-y-6 border-white/10">
                {!isConnected ? (
                  <div className="flex flex-col items-center">
                    <Image 
                      src="https://img.icons8.com/fluent-systems-regular/48/38bdf8/fingerprint.png" 
                      alt="Passkey" 
                      width={64} 
                      height={64} 
                      className="opacity-50 mb-6"
                    />
                    <p className="text-sm font-medium text-slate-400">
                      Standard private keys are 24-word phrases. <br/>
                      <span className="text-white">Lazorkit uses your device hardware.</span>
                    </p>
                  </div>
                ) : (
                  <WalletDisplay />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Main App Section (Conditional) */}
      {isConnected && (
        <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <h3 className="text-3xl font-black text-white tracking-tight">Active Terminal</h3>
            <p className="text-slate-500 font-medium max-w-md">Execute gas-sponsored transactions directly through the Lazorkit Paymaster.</p>
          </div>
          <GaslessTransfer />
        </section>
      )}

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: 'https://img.icons8.com/fluent-systems-regular/48/38bdf8/security-shield.png',
            title: 'Biometric Security',
            desc: 'Hardware-bound keys via WebAuthn. Phishing-proof and non-custodial.',
            color: 'blue'
          },
          {
            icon: 'https://img.icons8.com/fluent-systems-regular/48/818cf8/lightning-bolt.png',
            title: 'Gas Sponsorship',
            desc: 'Users pay fees in USDC or developers sponsor them. No SOL required.',
            color: 'purple'
          },
          {
            icon: 'https://img.icons8.com/fluent-systems-regular/48/38bdf8/smart-home_1.png',
            title: 'Smart Accounts',
            desc: 'PDA-based wallets with session management and multi-sig capabilities.',
            color: 'accent'
          }
        ].map((f, i) => (
          <div key={i} className="glass-card p-8 group hover:border-white/20 transition-all duration-300">
            <div className={`h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10 mb-6 group-hover:scale-110 transition-transform`}>
              <Image src={f.icon} alt={f.title} width={24} height={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{f.title}</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Code Snip */}
      <section className="glass-card p-1 pb-1 border-white/5 overflow-hidden">
        <div className="bg-black/40 p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex gap-1.5 mr-4">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">ExampleImplementation.tsx</span>
            </div>
        </div>
        <div className="p-8 bg-black/60 font-mono text-sm overflow-x-auto">
           <pre className="text-blue-400 group">
             <code>
{`const { connect } = useWallet();

// Execute gasless transfer with one click
const tx = await signAndSendTransaction({
  instructions: [transferIx],
  transactionOptions: {
    feeToken: "USDC" // Sponsoring fee in USDC
  }
});`}
             </code>
           </pre>
        </div>
      </section>

      {/* Resources */}
      <section className="pt-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Ecosystem Resources</h4>
              <p className="text-slate-500 text-sm font-medium">Everything you need to ship production dApps.</p>
           </div>
           <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'SDK Docs', url: '#' },
                { label: 'GitHub Docs', url: 'https://github.com/lazor-kit' },
                { label: 'Support', url: 'https://t.me/lazorkit' },
              ].map(link => (
                <a key={link.label} href={link.url} className="text-sm font-bold text-slate-400 hover:text-accent transition-colors">
                  {link.label}
                </a>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
