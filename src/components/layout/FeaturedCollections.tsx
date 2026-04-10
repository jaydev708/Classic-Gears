import { motion, useAnimationControls } from "motion/react";
import { useRef, useEffect, useState } from "react";

export const FeaturedCollections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const collections = [
    {
      title: "Tees",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000",
      description: "Engineered for the street. High-density prints that don't back down."
    },
    {
      title: "Hoodies",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000",
      description: "Heavyweight armor for the night shift. Made for the redline."
    },
    {
      title: "Sweatshirts",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000",
      description: "Minimalist identity. Maximum street presence."
    },
    {
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1558981403-c5f91bbde3c0?auto=format&fit=crop&q=80&w=1000",
      description: "Essential gear for the long ride. Built to last."
    },
    {
      title: "Limited Edition",
      image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=1000",
      description: "Exclusive drops. Once they're gone, they're gone."
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, offsetWidth } = containerRef.current;
      setConstraints({ left: -(scrollWidth - offsetWidth), right: 0 });
    }
  }, []);

  return (
    <section id="collections" className="py-24 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl mb-4 uppercase tracking-tighter">THE DROP</h2>
            <p className="text-brand-silver/60 max-w-md">Built for riders. Every piece is a statement of intent on the asphalt.</p>
          </div>
          <button className="text-brand-red font-bold uppercase tracking-widest border-b-2 border-brand-red pb-1 hover:text-white hover:border-white transition-all">
            View All Products
          </button>
        </div>
      </div>

      {/* Interactive Carousel */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          className="flex gap-8 px-4 md:px-[calc((100vw-1280px)/2)]"
          style={{ width: "max-content" }}
        >
          {collections.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex-shrink-0 w-[300px] md:w-[400px] overflow-hidden rounded-2xl aspect-[3/4] bg-brand-dark"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl mb-2 uppercase font-bold tracking-tighter">{item.title}</h3>
                <p className="text-brand-silver/70 mb-6 text-sm line-clamp-2">{item.description}</p>
                <button className="w-full py-3 bg-white text-brand-dark font-bold uppercase tracking-tighter rounded-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Shop Category
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
