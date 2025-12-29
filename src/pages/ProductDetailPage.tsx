import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Minus, Plus, ShoppingCart, Scan } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  const reviews = [
    { id: 1, name: 'John S.', rating: 5, comment: 'Excellent quality! Perfect for professional play.', date: 'Mar 12, 2025' },
    { id: 2, name: 'Mike R.', rating: 4, comment: 'Good product, fast delivery. Highly recommended.', date: 'Mar 8, 2025' },
    { id: 3, name: 'Sarah L.', rating: 5, comment: 'Best purchase I\'ve made this year!', date: 'Mar 5, 2025' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Image Section */}
      <div className="relative h-[45vh] bg-muted/30">
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-start">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>

        {/* AR Badge */}
        {product.hasAR && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 bg-gradient-sport px-4 py-2 rounded-full flex items-center gap-2 shadow-sport"
          >
            <Scan className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">AR Available</span>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative -mt-6 bg-background rounded-t-3xl min-h-[60vh] px-6 pt-6 pb-32"
      >
        {/* Brand & Name */}
        <p className="text-sm text-accent uppercase tracking-wider mb-1">{product.brand}</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-sport-orange text-sport-orange' : 'text-muted'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-gradient-sport">${product.price.toFixed(2)}</span>
          <span className="text-lg text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-border">
          <button
            onClick={() => setSelectedTab('description')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              selectedTab === 'description' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Description
            {selectedTab === 'description' && (
              <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
          <button
            onClick={() => setSelectedTab('reviews')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              selectedTab === 'reviews' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Reviews ({product.reviews})
            {selectedTab === 'reviews' && (
              <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'description' ? (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-muted-foreground text-sm leading-relaxed mb-6"
            >
              <p className="mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm font-medium text-foreground">{product.category}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Brand</p>
                  <p className="text-sm font-medium text-foreground">{product.brand}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className="text-sm font-medium text-sport-success">In Stock</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">AR Ready</p>
                  <p className="text-sm font-medium text-foreground">{product.hasAR ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground text-sm">{review.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'fill-sport-orange text-sport-orange' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-4 pb-[calc(1rem+var(--safe-area-bottom))]">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-muted rounded-xl px-3 py-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-background flex items-center justify-center"
            >
              <Minus className="w-4 h-4 text-foreground" />
            </motion.button>
            <span className="font-semibold text-foreground w-6 text-center">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-background flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-gradient-sport text-white border-none shadow-sport text-base font-semibold gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
