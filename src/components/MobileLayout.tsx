import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

export const MobileLayout = ({ children, showNav = true, showFooter = true }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showNav && <BottomNav />}
      <main className={showNav ? 'pt-24 flex-1' : 'flex-1'}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
