import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryPillProps {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryPill = ({ id, name, icon, isActive, onClick }: CategoryPillProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 shrink-0',
        isActive
          ? 'bg-gradient-sport text-white shadow-sport'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </motion.button>
  );
};
