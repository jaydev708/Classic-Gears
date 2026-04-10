import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState, ReactNode } from "react";

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
