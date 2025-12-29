import { motion } from 'framer-motion';
import { ArrowLeft, Camera, RotateCcw, Maximize2, X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ARViewPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(products.find(p => p.hasAR) || products[0]);
  const [isPlaced, setIsPlaced] = useState(false);

  const arProducts = products.filter(p => p.hasAR);

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    toast.success(`${selectedProduct.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* AR Camera View (Simulated) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sport-navy via-background to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDEwdjEwSDIwVjIwem0tMTAgMGgxMHYxMEgxMFYyMHptMC0xMGgxMHYxMEgxMFYxMHptMTAgMGgxMHYxMEgyMFYxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        {/* Scanning effect */}
        {!isPlaced && (
          <motion.div
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ top: '30%' }}
          />
        )}

        {/* AR Object Placement */}
        {isPlaced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 360]
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { duration: 8, repeat: Infinity, ease: 'linear' }
              }}
              className="relative"
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-48 h-48 object-cover rounded-2xl shadow-2xl"
              />
              {/* Shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 rounded-full blur-lg" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-start z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center shadow-lg"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-sport-success rounded-full flex items-center justify-center shadow-lg"
        >
          <Camera className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Instructions */}
      {!isPlaced && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-1/3 left-0 right-0 text-center px-8 z-10"
        >
          <div className="bg-card/80 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-2">📱 AR Camera View</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Point your camera at a flat surface to place the sports equipment
            </p>
            <Button
              onClick={() => setIsPlaced(true)}
              className="bg-gradient-sport text-white border-none shadow-sport"
            >
              Tap to Place Object
            </Button>
          </div>
        </motion.div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 z-10">
        {/* Product Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide"
        >
          {arProducts.map((product) => (
            <motion.button
              key={product.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedProduct(product);
                setIsPlaced(false);
              }}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                selectedProduct.id === product.id
                  ? 'border-accent shadow-sport'
                  : 'border-transparent opacity-60'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Action Buttons */}
        {isPlaced && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <Button
              onClick={() => setIsPlaced(false)}
              variant="outline"
              className="flex-1 h-12 gap-2 border-border bg-card/80 backdrop-blur"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={() => {}}
              variant="outline"
              className="h-12 gap-2 border-border bg-card/80 backdrop-blur px-4"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-gradient-sport text-white border-none shadow-sport gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </motion.div>
        )}

        {/* Instructions List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-card/60 backdrop-blur rounded-xl p-4"
        >
          <h4 className="font-semibold text-foreground text-sm mb-2">AR Instructions:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>1. Allow camera access when prompted</li>
            <li>2. Point camera at a flat surface</li>
            <li>3. Tap to place the 3D model</li>
            <li>4. Use gestures to rotate and scale</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ARViewPage;
