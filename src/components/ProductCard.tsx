import { motion } from 'framer-motion';
import { ShoppingCart, Scan, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative bg-card rounded-2xl overflow-hidden cursor-pointer card-lift group"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* AR Badge */}
        {product.hasAR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 left-3 bg-gradient-sport px-2 py-1 rounded-full flex items-center gap-1"
          >
            <Scan className="w-3 h-3 text-white" />
            <span className="text-[10px] font-semibold text-white">AR</span>
          </motion.div>
        )}

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-sport opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 truncate">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-sport-orange text-sport-orange" />
          <span className="text-xs sm:text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg font-bold text-gradient-sport">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleAddToCart}
            className="h-7 sm:h-8 px-2 sm:px-3 text-xs hover:bg-secondary/20 hover:text-secondary"
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
