import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, MapPin, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const tax = totalPrice * 0.08;
  const shipping = 9.99;
  const grandTotal = totalPrice + tax + shipping;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-sport-success rounded-full flex items-center justify-center mb-6"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center mb-2"
        >
          Thank you for your purchase
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-semibold text-foreground mb-8"
        >
          Order #SPT2025001
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3"
        >
          <Button
            onClick={() => navigate('/orders')}
            className="w-full h-12 bg-gradient-sport text-white border-none shadow-sport"
          >
            Track Order
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full h-12"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => step === 'payment' ? setStep('shipping') : navigate(-1)}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
            <p className="text-sm text-muted-foreground">
              Step {step === 'shipping' ? '1' : '2'} of 2
            </p>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-1 rounded-full ${step === 'shipping' || step === 'payment' ? 'bg-accent' : 'bg-muted'}`} />
          <div className={`flex-1 h-1 rounded-full ${step === 'payment' ? 'bg-accent' : 'bg-muted'}`} />
        </div>

        {step === 'shipping' ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-sport rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                <Input defaultValue="John" className="bg-card border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                <Input defaultValue="Doe" className="bg-card border-border" />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <Input defaultValue="john.doe@email.com" className="bg-card border-border" />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
              <Input defaultValue="+1 234 567 8900" className="bg-card border-border" />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Address</label>
              <Input defaultValue="123 Main Street" className="bg-card border-border" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="text-sm text-muted-foreground mb-2 block">City</label>
                <Input defaultValue="New York" className="bg-card border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">ZIP</label>
                <Input defaultValue="10001" className="bg-card border-border" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-sport rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Payment Details</h2>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Card Number</label>
              <Input placeholder="1234 5678 9012 3456" className="bg-card border-border" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Expiry Date</label>
                <Input placeholder="MM/YY" className="bg-card border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">CVV</label>
                <Input placeholder="123" className="bg-card border-border" />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Cardholder Name</label>
              <Input placeholder="John Doe" className="bg-card border-border" />
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl p-4 mt-6">
              <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                  <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-gradient-sport text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-background border-t border-border">
        <Button
          onClick={() => step === 'shipping' ? setStep('payment') : handlePlaceOrder()}
          disabled={isProcessing}
          className="w-full h-14 bg-gradient-sport text-white border-none shadow-sport text-lg font-semibold"
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          ) : step === 'shipping' ? (
            'Continue to Payment'
          ) : (
            `Place Order • $${grandTotal.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
