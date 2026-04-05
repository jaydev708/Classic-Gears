import { motion } from "motion/react";
import { Bike, ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { useState, ReactNode } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Bike className="w-8 h-8 text-brand-orange" />
            <span className="font-display text-2xl tracking-tighter uppercase">Classic Gears</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#collections">Collections</NavLink>
            <NavLink href="#brotherhood">Brotherhood</NavLink>
            <NavLink href="#about">Our Story</NavLink>
            <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-cream">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-dark border-b border-white/10 px-4 py-6 space-y-4"
        >
          <MobileNavLink href="#collections" onClick={() => setIsOpen(false)}>Collections</MobileNavLink>
          <MobileNavLink href="#brotherhood" onClick={() => setIsOpen(false)}>Brotherhood</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>Our Story</MobileNavLink>
          <button className="w-full bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-sm font-medium hover:text-brand-orange transition-colors uppercase tracking-widest">
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: ReactNode; onClick: () => void }) => (
  <a href={href} onClick={onClick} className="block text-lg font-medium hover:text-brand-orange transition-colors uppercase tracking-widest">
    {children}
  </a>
);

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect or video feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2070" 
          alt="Biker on open road" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="retro-text text-brand-orange text-xl md:text-2xl mb-4 block">Est. 2024 • Built for the Bold</span>
          <h1 className="text-6xl md:text-9xl font-display leading-none mb-6">
            RIDE WITH <br />
            <span className="text-stroke">LEGENDS</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-silver/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Premium apparel that captures the raw adrenaline of the open road and the timeless soul of classic biking culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="adrenaline-gradient px-10 py-4 rounded-full text-lg font-bold uppercase tracking-tighter hover:scale-105 transition-transform">
              Explore Collection
            </button>
            <button className="border border-white/20 hover:bg-white/10 px-10 py-4 rounded-full text-lg font-bold uppercase tracking-tighter transition-all">
              Join the Brotherhood
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-orange/50"
      >
        <div className="w-px h-16 bg-gradient-to-b from-brand-orange to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export const FeaturedCollections = () => {
  const collections = [
    {
      title: "Vintage Tees",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000",
      description: "Soft-washed cotton with hand-drawn retro graphics."
    },
    {
      title: "Road Hoodies",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000",
      description: "Heavyweight fleece built for long rides and cold nights."
    },
    {
      title: "Rider Sweatshirts",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1000",
      description: "Minimalist designs for the modern enthusiast."
    }
  ];

  return (
    <section id="collections" className="py-24 px-4 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl mb-4">THE GEAR</h2>
            <p className="text-brand-silver/60 max-w-md">Engineered for comfort, designed for the culture. Every piece tells a story of the road.</p>
          </div>
          <button className="text-brand-orange font-bold uppercase tracking-widest border-b-2 border-brand-orange pb-1 hover:text-white hover:border-white transition-all">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl mb-2">{item.title}</h3>
                <p className="text-brand-silver/70 mb-6 text-sm">{item.description}</p>
                <button className="w-full py-3 bg-white text-brand-dark font-bold uppercase tracking-tighter rounded-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Shop Category
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Brotherhood = () => {
  return (
    <section id="brotherhood" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-orange/5 -skew-y-3 origin-left" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1558981403-c5f91bbde3c0?auto=format&fit=crop&q=80&w=600" 
                alt="Biking brotherhood" 
                className="rounded-2xl w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1459478309853-2c33a60058e7?auto=format&fit=crop&q=80&w=600" 
                alt="Biking culture" 
                className="rounded-2xl w-full h-64 object-cover mt-8"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="retro-text text-brand-orange text-xl mb-4 block">More than just clothes</span>
            <h2 className="text-5xl md:text-7xl mb-8">THE BROTHERHOOD</h2>
            <p className="text-brand-silver/80 text-lg mb-8 leading-relaxed">
              Classic Gears isn't just a brand; it's a community of riders who live for the rumble of the engine and the freedom of the highway. We celebrate the bond that only those on two wheels can understand.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-orange rounded-full" />
                <span className="font-semibold">Exclusive Rider Meetups</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-orange rounded-full" />
                <span className="font-semibold">Custom Patch Programs</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-brand-orange rounded-full" />
                <span className="font-semibold">Biker Story Features</span>
              </li>
            </ul>
            <button className="bg-white text-brand-dark px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all">
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
            <h2 className="text-5xl md:text-7xl mb-8">OUR STORY</h2>
            <div className="space-y-6 text-brand-silver/80 text-lg leading-relaxed">
              <p>
                Classic Gears was born from a simple realization: the spirit of the Indian biker deserved a wardrobe that matched the soul of their machine.
              </p>
              <p>
                Founded by <span className="text-brand-orange font-bold">Aditya Yadav</span> and co-founded by <span className="text-brand-orange font-bold">Jay Dev</span>, our brand is a tribute to the open roads, the grease-stained hands, and the unshakeable bond of the biking brotherhood.
              </p>
              <p>
                We don't just make clothes; we craft the uniform for your next adventure. Every stitch is a testament to the adrenaline rush of the ride and the timeless elegance of retro biking culture.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&q=80&w=800" 
              alt="Classic Biker" 
              className="relative rounded-2xl border border-white/10 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 -left-8 glass-card p-6 rounded-xl hidden md:block">
              <p className="retro-text text-brand-orange text-xl">"Built by riders, for riders."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Bike className="w-8 h-8 text-brand-orange" />
              <span className="font-display text-3xl tracking-tighter uppercase">Classic Gears</span>
            </div>
            <p className="text-brand-silver/50 max-w-sm mb-8">
              Born in India, raised on the road. We create premium apparel for the modern biker who respects the classics.
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
              <li><FooterLink>T-Shirts</FooterLink></li>
              <li><FooterLink>Hoodies</FooterLink></li>
              <li><FooterLink>Sweatshirts</FooterLink></li>
              <li><FooterLink>Accessories</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-brand-silver/60">
              <li><FooterLink>Shipping Policy</FooterLink></li>
              <li><FooterLink>Returns & Exchanges</FooterLink></li>
              <li><FooterLink>Size Guide</FooterLink></li>
              <li><FooterLink>Contact Us</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:row justify-between items-center gap-4 text-brand-silver/30 text-sm">
          <p>© 2026 Classic Gears India. All Rights Reserved.</p>
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
  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
    {icon}
  </a>
);

const FooterLink = ({ children }: { children: ReactNode }) => (
  <a href="#" className="hover:text-brand-orange transition-colors">
    {children}
  </a>
);
