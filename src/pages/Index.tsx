import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryPill } from '@/components/CategoryPill';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || 
      product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-6"
        >
          <div>
            <p className="text-muted-foreground text-xs sm:text-sm">Welcome back 👋</p>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">SportGear</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/login')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-secondary text-white text-[8px] sm:text-[10px] font-bold min-w-[14px] sm:min-w-[18px] h-[14px] sm:h-[18px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-4 sm:mb-6"
        >
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted border-none rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm sm:text-base"
          />
        </motion.div>

        {/* AR Feature Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/ar')}
          className="relative mb-4 sm:mb-6 p-4 sm:p-5 rounded-3xl overflow-hidden cursor-pointer group"
          style={{ background: 'var(--gradient-card)' }}
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">Try AR Experience</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">See products in your space</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-sport rounded-2xl flex items-center justify-center shadow-sport"
            >
              <span className="text-2xl sm:text-3xl">🥽</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 sm:mb-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((category) => (
              <CategoryPill
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              {activeCategory === 'all' ? 'Featured Equipment' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <button className="text-xs sm:text-sm text-accent font-medium">See All</button>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 sm:py-12"
            >
              <p className="text-muted-foreground text-sm sm:text-base">No products found</p>
            </motion.div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
