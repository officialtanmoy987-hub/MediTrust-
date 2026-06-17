import { ShoppingCart, Menu, Heart } from "lucide-react";
import { Screen } from "../types";

interface HeaderProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({
  setScreen,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-12 h-16 w-full max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setScreen("home")}
          id="logo-brand-header"
        >
          <div className="flex items-center justify-center w-9 h-9 bg-primary text-white rounded-xl shadow-md">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">
            MediTrust+
          </span>
        </div>

        {/* Global Nav for Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setScreen("home")}
            className="text-on-surface hover:text-primary font-medium text-sm transition-colors py-1 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => setScreen("assist")}
            className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors py-1 cursor-pointer"
          >
            AI Assist
          </button>
          <button
            onClick={() => setScreen("book")}
            className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors py-1 cursor-pointer"
          >
            Doctors
          </button>
          <button
            onClick={() => setScreen("store")}
            className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors py-1 cursor-pointer"
          >
            Pharmacy Store
          </button>
          <button
            onClick={() => setScreen("records")}
            className="text-on-surface-variant hover:text-primary font-medium text-sm transition-colors py-1 cursor-pointer"
          >
            My Reports
          </button>
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-on-surface hover:text-primary transition-all active:scale-95 cursor-pointer"
            id="shopping-cart-button"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setScreen("assist")}
            className="md:hidden p-2 text-on-surface hover:text-primary transition-all cursor-pointer"
            id="mobile-menu-button"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
