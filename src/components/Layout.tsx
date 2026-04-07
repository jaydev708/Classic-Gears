import { motion, AnimatePresence } from "motion/react";
import { Bike, ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <img 
              src={logoError ? "https://placehold.co/400x120/000000/ff1a1a?text=INLINE4" : "/logo.png"} 
              alt="INLINE4 Logo" 
              className="h-14 md:h-16 w-auto" 
              onError={() => setLogoError(true)}
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#collections">Collections</NavLink>
            <NavLink href="#ride">The Ride</NavLink>
            <NavLink href="#about">Our Story</NavLink>
            <button className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-brand-cream p-2 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 top-20 bg-brand-dark z-40 overflow-hidden flex flex-col px-6 py-12"
          >
            <div className="space-y-8 flex flex-col items-center">
              {[
                { name: "Collections", href: "#collections" },
                { name: "The Ride", href: "#ride" },
                { name: "Our Story", href: "#about" }
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <MobileNavLink href={link.href} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </MobileNavLink>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full pt-8"
              >
                <button className="w-full bg-brand-red text-white px-6 py-4 rounded-full font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-brand-red/20">
                  <ShoppingBag className="w-6 h-6" />
                  Shop Now
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-12 flex gap-8 text-brand-silver/40"
              >
                <Instagram className="w-6 h-6 hover:text-brand-red transition-colors" />
                <Facebook className="w-6 h-6 hover:text-brand-red transition-colors" />
                <Twitter className="w-6 h-6 hover:text-brand-red transition-colors" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-sm font-medium hover:text-brand-red transition-colors uppercase tracking-widest">
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: ReactNode; onClick: () => void }) => (
  <a href={href} onClick={onClick} className="block text-lg font-medium hover:text-brand-red transition-colors uppercase tracking-widest">
    {children}
  </a>
);

export const Hero = () => {
  const [heroError, setHeroError] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
          <p className="text-lg md:text-xl text-brand-silver/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Built for riders who live at the limit. Not for everyone.
          </p>
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
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-4 bg-brand-red/20 blur-2xl rounded-full" />
            <img 
              src="/newdrop.png" 
              alt="Featured New Drop" 
              className="relative w-48 md:w-64 h-auto rounded-xl border border-white/10 shadow-2xl mx-auto"
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

export const FeaturedCollections = () => {
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

  // Duplicate for infinite scroll
  const duplicatedCollections = [...collections, ...collections];

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

      {/* Automatic Infinite Carousel */}
      <div className="relative flex overflow-hidden group/carousel">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ width: "fit-content" }}
        >
          {duplicatedCollections.map((item, idx) => (
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
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

export const TheRide = () => {
  return (
    <section id="ride" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-red/5 -skew-y-3 origin-left" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=600" 
                alt="Sportbike riders" 
                className="rounded-2xl w-full h-64 object-cover brightness-75 contrast-125"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=600" 
                alt="Night ride culture" 
                className="rounded-2xl w-full h-64 object-cover mt-8 brightness-50 contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="redline-text text-brand-red text-xl mb-4 block uppercase tracking-widest">More than clothing</span>
            <h2 className="text-5xl md:text-7xl mb-8">THE RIDE</h2>
            <p className="text-brand-silver/80 text-lg mb-8 leading-relaxed">
              INLINE4 is for those who live for the high RPM scream and the blur of the highway at night. We are a community of riders who push the limit. This is for those who ride.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Night Run Sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Performance Culture</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="font-semibold uppercase tracking-tighter">Rider Identity</span>
              </li>
            </ul>
            <button className="bg-white text-brand-dark px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all">
              Join the Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OurStory = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl mb-8 uppercase tracking-tighter">OUR STORY</h2>
            <div className="space-y-6 text-brand-silver/80 text-lg leading-relaxed">
              <p>
                INLINE4 wasn't built in a boardroom. It was born on the highway at 2 AM, inspired by the high-pitched scream of four cylinders hitting the redline.
              </p>
              <p>
                Founded by <span className="text-brand-red font-bold">Aditya Yadav</span> and co-founded by <span className="text-brand-red font-bold">Jay Dev</span>, our brand is a tribute to the riders who live for the adrenaline, the night runs, and the pure passion of sportbike culture.
              </p>
              <p>
                We don't just make clothes; we craft the identity for those who live at the limit. Every stitch is a testament to the raw energy of the ride. Built for riders. Made for the redline.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-red/20 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800" 
              alt="Sportbike Rider" 
              className="relative rounded-2xl border border-white/10 shadow-2xl brightness-75 grayscale-[20%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 -left-8 glass-card p-6 rounded-xl hidden md:block border border-white/10">
              <p className="redline-text text-brand-red text-xl uppercase tracking-widest">"Built Above Redline"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <footer className="bg-black pt-24 pb-12 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={logoError ? "https://placehold.co/400x120/000000/ff1a1a?text=INLINE4" : "/logo.png"} 
                alt="INLINE4 Logo" 
                className="h-12 md:h-14 w-auto" 
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer" 
              />
            </div>
            <p className="text-brand-silver/50 max-w-sm mb-8">
              Inline4 Clothing Co. Born from the scream of four cylinders. Built for riders who live at the limit.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Facebook />} />
              <SocialIcon icon={<Twitter />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3 text-brand-silver/60">
              <li><FooterLink>Tees</FooterLink></li>
              <li><FooterLink>Hoodies</FooterLink></li>
              <li><FooterLink>Sweatshirts</FooterLink></li>
              <li><FooterLink>Accessories</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-brand-silver/60">
              <li><FooterLink>Shipping</FooterLink></li>
              <li><FooterLink>Returns</FooterLink></li>
              <li><FooterLink>Size Guide</FooterLink></li>
              <li><FooterLink>Contact</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:row justify-between items-center gap-4 text-brand-silver/30 text-sm">
          <p>© 2026 Inline4 Clothing Co. All Rights Reserved.</p>
          <div className="flex gap-8">
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms of Service</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all">
    {icon}
  </a>
);

const FooterLink = ({ children }: { children: ReactNode }) => (
  <a href="#" className="hover:text-brand-red transition-colors">
    {children}
  </a>
);
