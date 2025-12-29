import { motion } from 'framer-motion';
import { User, MapPin, CreditCard, Bell, Shield, LogOut, ChevronRight, Package, Heart, Settings } from 'lucide-react';
import { MobileLayout } from '@/components/MobileLayout';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Package, label: 'My Orders', path: '/orders', badge: '2' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: MapPin, label: 'Shipping Address', path: '/address' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payment' },
    { icon: Bell, label: 'Notifications', path: '/notifications', toggle: true },
    { icon: Shield, label: 'Privacy & Security', path: '/privacy' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const stats = [
    { label: 'Orders', value: '12' },
    { label: 'Wishlist', value: '8' },
    { label: 'Reviews', value: '5' },
  ];

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-gradient-card rounded-3xl p-6 mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-30" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-sport rounded-2xl flex items-center justify-center shadow-sport">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">John Doe</h2>
              <p className="text-muted-foreground text-sm">john.doe@email.com</p>
              <p className="text-xs text-muted-foreground mt-1">Member since Jan 2024</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="relative z-10 flex justify-around mt-6 pt-6 border-t border-border/30">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-gradient-sport">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-4 bg-card rounded-2xl group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 p-4 mt-6 bg-destructive/10 rounded-2xl"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="font-medium text-destructive">Log Out</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          SportGear v1.0.0
        </p>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
