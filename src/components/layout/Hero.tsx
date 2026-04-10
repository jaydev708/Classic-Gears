import { motion } from "motion/react";
import { useState } from "react";

export const Hero = () => {
  const [heroError, setHeroError] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with parallax effect or video feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroError ? "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=2070" : "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=2070"} 
          alt="Biker on open road" 
          className="w-full h-full object-cover opacity-60"
          onError={() => setHeroError(true)}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="redline-text text-brand-red text-xl md:text-2xl mb-4 block tracking-[0.3em] uppercase">Built Above Redline</span>
          <h1 className="text-6xl md:text-9xl font-display leading-none mb-6">
            RIDE ABOVE <br />
            <span className="text-stroke">REDLINE</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl max-w-4xl mx-auto mb-10 leading-relaxed gothic-text px-4"
            style={{ 
              color: '#ff1a1a',
              WebkitTextStroke: '1px white',
              textShadow: '0 0 20px rgba(255, 26, 26, 0.5)'
            }}
          >
            Built for the Riders who live Limitless
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="adrenaline-gradient px-10 py-4 rounded-full text-lg font-bold uppercase tracking-tighter hover:scale-105 transition-transform">
              Shop the Drop
            </button>
            <button className="border border-white/20 hover:bg-white/10 px-10 py-4 rounded-full text-lg font-bold uppercase tracking-tighter transition-all">
              Join the Ride
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative inline-block"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -inset-4 bg-brand-red/30 blur-2xl rounded-full" 
            />
            <img 
              src="/newdrop.png" 
              alt="Featured New Drop" 
              className="relative w-48 md:w-64 h-auto rounded-xl border-4 border-brand-red ring-2 ring-black shadow-2xl mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand-red text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              New Drop
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-red/50"
      >
        <div className="w-px h-16 bg-gradient-to-b from-brand-red to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};
