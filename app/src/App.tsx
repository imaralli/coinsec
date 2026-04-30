// src/App.tsx
import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// The DonutChart component for your 60/40 Fee Split
const DonutChart = () => (
  <div className="relative flex h-64 w-64 items-center justify-center mx-auto my-8">
    <svg className="h-full w-full" viewBox="0 0 36 36">
      {/* Background Circle (The 60% Creator Part) */}
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        className="text-gray-700" /* Darker gray for your dark theme */
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Foreground Circle (The 40% Treasury Part) */}
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        className="text-[#038044]" /* Your signature Green */
        stroke="currentColor"
        strokeWidth="3.2"
        strokeDasharray="40, 100" /* This creates the 40% segment */
        strokeLinecap="round"
        transform="rotate(-90 18 18)" /* Starts the green segment at the top */
      />
    </svg>
    <div className="absolute flex flex-col items-center text-white">
      <span className="text-sm uppercase tracking-widest opacity-60">Treasury</span>
      <span className="text-4xl font-bold">40%</span>
    </div>
  </div>
);


function App() {
  const {connected, publicKey} = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (connected && publicKey) {
      // The "Activity Oracle" fetching live data from Devnet
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    }
  }, [connected, publicKey, connection]);

  // Use {balance.toFixed(2)} SOL in your Treasury Yield section now!

  return (
    <div className="min-h-screen bg-[#f4f7f6] p-8">
      {/* Editorial Header */}
      <header className="mb-12 border-b-2 border-[#038044] pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-5xl font-bold text-gray-900">coinsec</h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-gray-600">
            Protocol-Enforced Creator Accountability
          </p>
        </div>
        {/* Add the wallet button here */}
        <WalletMultiButton className="!bg-[#038044] hover:!bg-[#026b38] !rounded-md" />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Fee Router Module */}
        <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-2xl font-semibold">Fee Router Status</h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-sm text-gray-500">Creator Share</p>
              <p className="text-3xl font-bold text-gray-900">60%</p>
            </div>
            <DonutChart />
            <div className="text-center">
              <p className="text-sm text-gray-500">Treasury Yield</p>
              <p className="text-3xl font-bold text-[#038044]">40%</p>
            </div>
          </div>
        </div>

        {/* Enforcement Engine Module */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-2xl font-semibold">Enforcement Mode</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Status</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">ACTIVE</span>
             </div>
             <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 w-full rounded-full bg-[#038044]"></div>
             </div>
             <p className="text-xs italic text-gray-500">"Immutable Smart Contract Rules are currently enforced."</p>
          </div>
        </div>
      </div>

      <div className="text-xs mt-4 opacity-50">
        {connected ? `Connected: ${publicKey?.toBase58()}` : "Wallet Not Connected"}
      </div>
    </div>
  );
}

export default App;