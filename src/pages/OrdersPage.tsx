import { motion } from 'framer-motion';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';

const orders = [
  {
    id: 'SPT2025001',
    date: 'Mar 15, 2025',
    items: 3,
    total: 177.36,
    status: 'Delivered',
    statusColor: 'text-sport-success',
  },
  {
    id: 'SPT2025002',
    date: 'Mar 10, 2025',
    items: 1,
    total: 89.99,
    status: 'Shipping',
    statusColor: 'text-sport-warning',
  },
  {
    id: 'SPT2025003',
    date: 'Mar 5, 2025',
    items: 2,
    total: 156.98,
    status: 'Processing',
    statusColor: 'text-muted-foreground',
  },
];

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
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
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="bg-card rounded-2xl p-4 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">#{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground">{order.items} items</p>
                  <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
                </div>
                <span className={`text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default OrdersPage;
