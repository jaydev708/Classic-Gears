import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
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
