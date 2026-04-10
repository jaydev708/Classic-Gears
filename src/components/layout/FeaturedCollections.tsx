import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useRef, useState, useEffect } from "react";

export const FeaturedCollections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const collections = [
    { title: "Tees", rpm: 3000, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600" },
    { title: "Hoodies", rpm: 5000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
    { title: "Jackets", rpm: 8000, image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=600" },
    { title: "Gear Bags", rpm: 10000, image: "https://images.unsplash.com/photo-1558981403-c5f91bbde3c0?auto=format&fit=crop&q=80&w=600" },
    { title: "Limited", rpm: 12000, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600" },
  ];

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Auto-play logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let trayInterval: NodeJS.Timeout;
    const startAutoPlay = () => {
      trayInterval = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 1, behavior: 'auto' });
        }
      }, 30); // Adjust for speed
    };

    startAutoPlay();

    const pauseAutoPlay = () => clearInterval(trayInterval);
    const resumeAutoPlay = () => startAutoPlay();

    container.addEventListener('mouseenter', pauseAutoPlay);
    container.addEventListener('mouseleave', resumeAutoPlay);
    container.addEventListener('touchstart', pauseAutoPlay);
    container.addEventListener('touchend', resumeAutoPlay);

    return () => {
      clearInterval(trayInterval);
      container.removeEventListener('mouseenter', pauseAutoPlay);
      container.removeEventListener('mouseleave', resumeAutoPlay);
      container.removeEventListener('touchstart', pauseAutoPlay);
      container.removeEventListener('touchend', resumeAutoPlay);
    };
  }, []);

  // Calculate needle rotation: -135deg (0 RPM) to 135deg (12k RPM)
  const needleRotation = useTransform(smoothProgress, [0, 1], [-110, 110]);
  
  // Track active index for UI details
  useEffect(() => {
    return scrollXProgress.on("change", (latest) => {
      const index = Math.min(Math.round(latest * (collections.length - 1)), collections.length - 1);
      setActiveIndex(index);
    });
  }, [scrollXProgress, collections.length]);

  // Calculate dynamic colors for the meter line
  const arcColor = useTransform(
    smoothProgress,
    [0, 0.4, 0.8, 1],
    ["#22c55e", "#eab308", "#ff1a1a", "#ff1a1a"]
  );

  return (
    <section id="collections" className="py-32 bg-brand-dark relative overflow-hidden carbon-fiber">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl mb-4 uppercase tracking-tighter italic">THE REDLINE DROP</h2>
          <p className="text-brand-red font-display text-2xl tracking-[0.2em]">MISSION: HIGH RPM SEARCH</p>
        </div>

        <div className="relative h-[600px] flex items-end justify-center">
          {/* Speedometer Gauge Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 drop-shadow-[0_0_15px_rgba(255,26,26,0.2)]">
              {/* Outer Ring */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 10" />
              {/* Main Progress Arc */}
              <motion.path
                d="M 66 334 A 190 190 0 1 1 334 334"
                fill="none"
                stroke={arcColor}
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
              {/* RPM Markers */}
              {[0, 2, 4, 6, 8, 10, 12].map((rpm) => {
                const angle = (rpm / 12) * 270 - 225;
                const x1 = 200 + 175 * Math.cos((angle * Math.PI) / 180);
                const y1 = 200 + 175 * Math.sin((angle * Math.PI) / 180);
                const x2 = 200 + 190 * Math.cos((angle * Math.PI) / 180);
                const y2 = 200 + 190 * Math.sin((angle * Math.PI) / 180);
                
                // RPM Dynamic Coloring
                let color = "white";
                if (rpm <= 4) color = "#22c55e"; // Green
                else if (rpm <= 8) color = "#eab308"; // Yellow
                else color = "#ff1a1a"; // Red

                return (
                  <g key={rpm}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={rpm % 4 === 0 ? "4" : "2"} />
                    <text
                      x={200 + 150 * Math.cos((angle * Math.PI) / 180)}
                      y={200 + 150 * Math.sin((angle * Math.PI) / 180)}
                      fill={color}
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className="font-display italic"
                    >
                      {rpm}K
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Needle */}
            <motion.div 
              style={{ rotate: needleRotation, originY: "100%" }}
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-1 md:w-2 h-48 md:h-72 bg-gradient-to-t from-transparent via-brand-red to-brand-red rounded-full z-20 shadow-[0_0_20px_rgba(255,26,26,0.8)]"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red border-2 border-white shadow-lg" />
            </motion.div>
            
            {/* Center Cap */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border-4 border-brand-red z-30 flex items-center justify-center">
              <span className="text-white font-display text-xl skew-x-[-10deg]">I4</span>
            </div>
          </div>

          {/* Carousel Cards (Horizontal Scroll with Radial mapping feel) */}
          <div 
            ref={containerRef}
            className="absolute bottom-0 left-0 w-full h-full overflow-x-scroll no-scrollbar flex items-end px-[35vw] md:px-[42vw] pb-10 snap-x snap-mandatory z-40"
          >
            <div className="flex gap-20 py-20">
              {collections.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="snap-center shrink-0 w-[280px] md:w-[400px]"
                  style={{
                    scale: useTransform(smoothProgress, [idx / (collections.length - 1) - 0.1, idx / (collections.length - 1), idx / (collections.length - 1) + 0.1], [0.85, 1.05, 0.85]),
                    opacity: useTransform(smoothProgress, [idx / (collections.length - 1) - 0.2, idx / (collections.length - 1), idx / (collections.length - 1) + 0.2], [0.2, 1, 0.2]),
                  }}
                >
                  <div className="group relative overflow-hidden rounded-3xl border-4 border-brand-red/20 hover:border-brand-red transition-all duration-500 redline-glow">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full aspect-[4/5] object-cover brightness-50 group-hover:brightness-90 transition-all duration-700 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="text-brand-red font-display text-2xl skew-x-[-10deg] mb-1">{item.rpm} RPM</div>
                      <h3 className="text-4xl font-display mb-6 tracking-wider">{item.title}</h3>
                      <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-brand-red hover:text-white">
                        Access Drop
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Product Specs */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12 pb-20"
        >
          <div className="inline-block px-4 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 overflow-hidden rounded">Active Spec</div>
          <h4 className="text-4xl font-display mb-2">{collections[activeIndex].title} GEAR</h4>
          <p className="text-brand-silver/50 max-w-md mx-auto italic uppercase text-xs tracking-[0.2em]">Engineered for high-vibe night runs and apex performance.</p>
        </motion.div>
      </div>
    </section>
  );
};
