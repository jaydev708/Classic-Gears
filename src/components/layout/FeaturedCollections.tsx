import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

export const FeaturedCollections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const jitterValue = useMotionValue(0);
  
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

  // Analog-style spring dynamics (slight bounce/overshoot)
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.8,
    restDelta: 0.001
  });

  // Needle jitter at high RPM (10k-12k)
  useAnimationFrame((t) => {
    if (activeIndex >= 3) { // Gear Bags and Limited
      const jitter = (Math.sin(t / 10) * 1.5) + (Math.random() * 0.5);
      jitterValue.set(jitter);
    } else {
      jitterValue.set(0);
    }
  });

  // Auto-play logic: Smoothly sequence through each RPM category with a 2-second pause
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isAutoPlaying) return;

    let stepTimeout: NodeJS.Timeout;
    let nextIndex = (activeIndex + 1) % collections.length;

    const runStep = () => {
      // Calculate target scroll for the next index
      const scrollWidth = container.scrollWidth - container.offsetWidth;
      const targetScroll = (nextIndex / (collections.length - 1)) * scrollWidth;
      
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
      
      nextIndex = (nextIndex + 1) % collections.length;
      
      // Wait 2 seconds at the current position before revving to the next
      stepTimeout = setTimeout(runStep, 2000);
    };

    // Initial delay before starting the loop
    stepTimeout = setTimeout(runStep, 2000);

    return () => clearTimeout(stepTimeout);
  }, [isAutoPlaying, activeIndex, collections.length]);

  // Calculate needle rotation: -110deg to 110deg + jitter
  const rotationBase = useTransform(smoothProgress, [0, 1], [-110, 110]);
  const needleRotation = useMotionValue(0);

  useEffect(() => {
    return rotationBase.on("change", (latest) => {
      needleRotation.set(latest + jitterValue.get());
    });
  }, [rotationBase, needleRotation, jitterValue]);

  // Track active index
  useEffect(() => {
    return scrollXProgress.on("change", (latest) => {
      const index = Math.min(Math.round(latest * (collections.length - 1)), collections.length - 1);
      setActiveIndex(index);
    });
  }, [scrollXProgress, collections.length]);

  const scrollToCategory = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollWidth = container.scrollWidth - container.offsetWidth;
    const targetScroll = (index / (collections.length - 1)) * scrollWidth;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const arcColor = useTransform(
    smoothProgress,
    [0, 0.4, 0.8, 1],
    ["#22c55e", "#eab308", "#ff1a1a", "#ff1a1a"]
  );

  return (
    <section id="collections" className="py-32 bg-brand-dark relative overflow-hidden carbon-fiber">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-5xl md:text-8xl mb-4 uppercase tracking-tighter italic">THE REDLINE DROP</h2>
          <p className="text-brand-red font-display text-2xl tracking-[0.2em]">MISSION: HIGH RPM SEARCH</p>
        </div>

        <div className="relative h-[600px] flex items-end justify-center">
          {/* Speedometer Gauge Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[850px] aspect-square flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-40 drop-shadow-[0_0_20px_rgba(255,26,26,0.3)]">
              {/* Outer Ring */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" className="opacity-30" />
              
              {/* Main Progress Arc */}
              <motion.path
                d="M 66 334 A 190 190 0 1 1 334 334"
                fill="none"
                stroke={arcColor}
                strokeWidth="5"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
                className="drop-shadow-[0_0_8px_rgba(255,10,10,0.5)]"
              />

              {/* RPM Markers (Interactive) */}
              {[3, 5, 8, 10, 12].map((rpm, idx) => {
                const angle = (idx / (collections.length - 1)) * 268 - 224;
                const x1 = 200 + 175 * Math.cos((angle * Math.PI) / 180);
                const y1 = 200 + 175 * Math.sin((angle * Math.PI) / 180);
                const x2 = 200 + 195 * Math.cos((angle * Math.PI) / 180);
                const y2 = 200 + 195 * Math.sin((angle * Math.PI) / 180);
                
                let color = "#22c55e";
                if (rpm > 4) color = "#eab308";
                if (rpm >= 10) color = "#ff1a1a";

                return (
                  <g 
                    key={rpm} 
                    className="cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 origin-center"
                    onClick={() => scrollToCategory(idx)}
                  >
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" />
                    <text
                      x={200 + 145 * Math.cos((angle * Math.PI) / 180)}
                      y={200 + 145 * Math.sin((angle * Math.PI) / 180)}
                      fill={color}
                      fontSize="18"
                      fontWeight="900"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className="font-display italic transition-colors"
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
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-1.5 md:w-2.5 h-48 md:h-72 bg-gradient-to-t from-transparent via-brand-red to-brand-red rounded-full z-20 shadow-[0_0_30px_rgba(255,26,26,1)]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-red border-4 border-white shadow-2xl" />
            </motion.div>
            
            {/* Center Cap */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black border-4 border-brand-red z-30 flex items-center justify-center shadow-inner">
              <span className="text-white font-display text-3xl skew-x-[-15deg] font-black italic">I4</span>
            </div>
          </div>

          {/* Carousel Cards */}
          <div 
            ref={containerRef}
            onMouseEnter={() => {
              setIsAutoPlaying(false);
              const timeoutId = (window as any).carouselTimeout;
              if (timeoutId) clearTimeout(timeoutId);
            }}
            onMouseLeave={() => {
              const timeoutId = setTimeout(() => setIsAutoPlaying(true), 3000);
              (window as any).carouselTimeout = timeoutId;
            }}
            onTouchStart={() => {
              setIsAutoPlaying(false);
              const timeoutId = (window as any).carouselTimeout;
              if (timeoutId) clearTimeout(timeoutId);
            }}
            onTouchEnd={() => {
              const timeoutId = setTimeout(() => setIsAutoPlaying(true), 3000);
              (window as any).carouselTimeout = timeoutId;
            }}
            className="absolute bottom-0 left-0 w-full h-full overflow-x-scroll no-scrollbar flex items-end px-[30vw] md:px-[40vw] pb-10 snap-x snap-mandatory z-40 cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-16 md:gap-24 py-20 pr-[50vw]">
              {collections.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="snap-center shrink-0 w-[260px] md:w-[420px]"
                  style={{
                    scale: useTransform(smoothProgress, [idx / (collections.length - 1) - 0.15, idx / (collections.length - 1), idx / (collections.length - 1) + 0.15], [0.8, 1.1, 0.8]),
                    rotateY: useTransform(smoothProgress, [idx / (collections.length - 1) - 0.15, idx / (collections.length - 1), idx / (collections.length - 1) + 0.15], [20, 0, -20]),
                  }}
                >
                  <div className="group relative overflow-hidden rounded-[2.5rem] border-4 border-white/5 hover:border-brand-red transition-all duration-700 bg-black shadow-2xl redline-glow">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full aspect-[4/5] object-cover brightness-[0.35] group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10">
                      <div className="text-brand-red font-display text-3xl skew-x-[-15deg] mb-2 font-black italic">{item.rpm} RPM</div>
                      <h3 className="text-5xl font-display mb-8 tracking-widest uppercase italic">{item.title}</h3>
                      <button className="w-full py-5 bg-white text-black font-black uppercase tracking-tighter rounded-2xl transform translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 hover:bg-brand-red hover:text-white shadow-xl">
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
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="text-center mt-16 md:mt-24 pb-24"
        >
          <div className="inline-block px-6 py-2 bg-brand-red text-white text-xs font-black uppercase tracking-[0.4em] mb-6 skew-x-[-15deg] shadow-lg">Active Spec</div>
          <h4 className="text-5xl md:text-7xl font-display mb-4 italic uppercase">{collections[activeIndex].title} CORE</h4>
          <p className="text-brand-silver/40 max-w-lg mx-auto italic uppercase text-sm tracking-[0.3em] font-medium leading-relaxed">
            Proprietary high-density weave. Built for maximum aerodynamic profile and thermal regulation above 8000 RPM.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
