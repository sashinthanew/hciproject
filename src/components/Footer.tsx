import { Scan, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', path: '/categories' },
    { label: 'Best Sellers', path: '/categories' },
    { label: 'Sale', path: '/categories' },
    { label: 'All Products', path: '/categories' },
  ],
  support: [
    { label: 'My Orders', path: '/orders' },
    { label: 'Shopping Cart', path: '/cart' },
    { label: 'AR View', path: '/ar' },
    { label: 'Profile', path: '/profile' },
  ],
  company: [
    { label: 'About Us', path: '/' },
    { label: 'Contact', path: '/' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-sport shadow-sport">
                <Scan className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-sport bg-clip-text text-transparent">
                SportAR
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience sports gear like never before with augmented reality. Try before you buy with our innovative AR technology.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <a href="mailto:support@sportar.com" className="hover:text-accent transition-colors">
                  support@sportar.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>123 Sport Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} SportAR. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};