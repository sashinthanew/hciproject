import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { MobileLayout } from '@/components/MobileLayout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryPill } from '@/components/CategoryPill';
import { products, categories } from '@/data/products';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const brands = ['Wilson', 'Spalding', 'Nike', 'Adidas', 'Everlast', 'Manduka'];

const CategoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || 
      product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesCategory && matchesSearch && matchesPrice && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Browse</h1>
          <p className="text-muted-foreground text-sm">{sortedProducts.length} products available</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border-none rounded-2xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-12 h-12 bg-gradient-sport rounded-2xl flex items-center justify-center shadow-sport">
                <SlidersHorizontal className="w-5 h-5 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl bg-card border-border">
              <SheetHeader>
                <SheetTitle className="text-foreground">Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Brand</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {brands.map(brand => (
                      <label 
                        key={brand}
                        className="flex items-center gap-2 text-sm text-foreground cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <Button className="w-full bg-gradient-sport text-white border-none shadow-sport h-12">
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
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

        {/* Sort */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="text-sm text-muted-foreground">{sortedProducts.length} items</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-muted text-foreground text-sm px-4 py-2 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No products match your filters</p>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CategoriesPage;
