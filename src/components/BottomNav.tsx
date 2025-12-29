import { Home, Grid3X3, ShoppingCart, User, Scan } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/categories', icon: Grid3X3, label: 'Browse' },
  { path: '/ar', icon: Scan, label: 'AR View', isSpecial: true },
  { path: '/cart', icon: ShoppingCart, label: 'Cart', showBadge: true },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 pt-[calc(0.75rem+var(--safe-area-top))] sm:pt-[calc(1rem+var(--safe-area-top))]">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-sport shadow-sport">
            <Scan className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-sport bg-clip-text text-transparent">
            SportAR
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            // Skip AR View in top nav since it's in the logo
            if (item.isSpecial) return null;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'relative flex flex-col items-center justify-center min-w-[3rem] sm:min-w-[4rem] px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl transition-all duration-300',
                  isActive 
                    ? 'text-accent bg-accent/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
                )}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
                {item.showBadge && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] sm:text-[10px] font-bold min-w-[14px] sm:min-w-[18px] h-[14px] sm:h-[18px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
