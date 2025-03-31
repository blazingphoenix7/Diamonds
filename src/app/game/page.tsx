import { Metadata } from 'next';
import Link from 'next/link';
import GameContainer from '@/components/game/GameContainer';

export const metadata: Metadata = {
  title: 'Diamond Street Game | Unlock Exclusive Discounts',
  description: 'Play our interactive Diamond Street game and unlock discounts of up to 50% off on our premium lab-created diamond studs.',
};

export default function GamePage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Game Hero Section */}
      <section className="py-12 md:py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Diamond Street Challenge
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Drive down NYC&apos;s Diamond District, pass competitors with inflated prices, 
              and unlock discounts of up to 50% on our premium lab-created diamond studs.
            </p>
          </div>
          
          {/* Game Container */}
          <div className="mb-16">
            <GameContainer />
          </div>
          
          {/* Game Instructions */}
          <div className="bg-background/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">Game Controls</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-secondary text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <div>
                      <p className="font-bold">Desktop:</p>
                      <p>Use <span className="font-mono bg-background/50 px-2 py-1 rounded">W</span> <span className="font-mono bg-background/50 px-2 py-1 rounded">A</span> <span className="font-mono bg-background/50 px-2 py-1 rounded">S</span> <span className="font-mono bg-background/50 px-2 py-1 rounded">D</span> or arrow keys to control your car</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <div>
                      <p className="font-bold">Mobile:</p>
                      <p>Use on-screen buttons or swipe gestures to navigate</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">Game Objective</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-secondary text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <p>Drive past competitor stores to increase your discount (10% per store)</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <p>Pass all 5 competitors to earn the maximum 50% discount</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <p>Reach your store before the 90-second timer runs out</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-6 text-text-secondary">
                Your earned discount will be automatically applied to your purchase. 
                The discount remains valid for your entire shopping session.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/products" passHref>
                  <button className="btn btn-primary px-8">
                    Shop with Discount
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
