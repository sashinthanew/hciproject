import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { MobileLayout } from '@/components/MobileLayout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

  const tax = totalPrice * 0.08;
  const shipping = totalItems > 0 ? 9.99 : 0;
  const grandTotal = totalPrice + tax + shipping;

  if (items.length === 0) {
    return (
      <MobileLayout>
        <div className="px-4 pt-12 pb-4 min-h-screen flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <h1 className="text-2xl font-bold text-foreground">Cart</h1>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6"
            >
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground text-center mb-8">
              Looks like you haven't added any items yet
            </p>
            <Button
              onClick={() => navigate('/categories')}
              className="bg-gradient-sport text-white border-none shadow-sport px-8 h-12"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cart</h1>
              <p className="text-sm text-muted-foreground">{totalItems} items</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={clearCart}
            className="text-sm text-destructive font-medium"
          >
            Clear All
          </motion.button>
        </motion.div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 bg-card rounded-2xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">{item.brand}</p>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gradient-sport">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-background flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3 text-foreground" />
                    </motion.button>
                    <span className="font-medium text-foreground w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-background flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 text-foreground" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 mb-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">${shipping.toFixed(2)}</span>
            </div>
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-gradient-sport">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Checkout Button */}
        <Button
          onClick={() => navigate('/checkout')}
          className="w-full h-14 bg-gradient-sport text-white border-none shadow-sport text-lg font-semibold"
        >
          Proceed to Checkout
        </Button>
      </div>
    </MobileLayout>
  );
};

export default CartPage;
