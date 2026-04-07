import { Navbar, Hero, FeaturedCollections, TheRide, OurStory, Footer } from "./components/Layout";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Stats Section - Quick Adrenaline Rush */}
        <section className="bg-brand-red py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="Growing" label="Community" />
            <StatItem number="50+" label="Designs" />
            <StatItem number="100%" label="Performance" />
            <StatItem number="24/7" label="Redline Ready" />
          </div>
        </section>

        <FeaturedCollections />

        {/* Adrenaline Quote */}
        <section className="py-32 bg-fixed bg-center bg-cover relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=2070")' }}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-display italic leading-tight mb-8">
              "FOUR WHEELS MOVE THE BODY, <br />
              <span className="text-brand-red not-italic">TWO WHEELS MOVE THE SOUL."</span>
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto" />
          </div>
        </section>

        <TheRide />

        <OurStory />

        {/* Newsletter / Join the Crew */}
        <section className="py-24 bg-white text-brand-dark">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl mb-6">GET THE INSIDE TRACK</h2>
            <p className="text-xl mb-10 text-gray-600">Subscribe to get early access to limited drops and rider events.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-brand-red outline-none transition-all"
              />
              <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-red transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="text-white">
    <div className="text-4xl md:text-5xl font-display mb-1">{number}</div>
    <div className="text-xs md:text-sm uppercase tracking-widest font-bold opacity-80">{label}</div>
  </div>
);

