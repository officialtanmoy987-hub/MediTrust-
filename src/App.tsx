import { useState } from "react";
import { Screen, CartItem, Appointment, AnalysisResult, Product } from "./types";
import { INITIAL_PRODUCTS } from "./data";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import AIAssistTab from "./components/AIAssistTab";
import BookTab from "./components/BookTab";
import StoreTab from "./components/StoreTab";
import RecordsTab from "./components/RecordsTab";

import {
  Home,
  Sparkles,
  Calendar,
  Store,
  FileCheck2,
  Trash2,
  X,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  
  // Cart State Manager
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  // Dynamic state arrays
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [initialSymptomsPreset, setInitialSymptomsPreset] = useState<string[]>([]);

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        if (existing.quantity <= 1) {
          return prev.filter((item) => item.product.id !== productId);
        }
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutCompleted(true);
    setTimeout(() => {
      setCart([]);
      setCartOpen(false);
      setCheckoutCompleted(false);
    }, 2000);
  };

  // Add Booked Appointments from Book Specialist Tab
  const handleAddAppointment = (app: Appointment) => {
    setAppointments((prev) => [app, ...prev]);
  };

  const handleCancelAppointment = (appId: string) => {
    if (confirm("Are you sure you want to cancel this online consultation?")) {
      setAppointments((prev) => prev.filter((app) => app.id !== appId));
    }
  };

  // Add completed AI evaluations from AI Assist Tab
  const handleStoreAnalysisResult = (res: AnalysisResult) => {
    setAnalyses((prev) => [res, ...prev]);
  };

  // Quick Analyze shortcut from Home selector
  const handleOnQuickStartAnalysis = (initialSymptoms: string[]) => {
    setInitialSymptomsPreset(initialSymptoms);
    setCurrentScreen("assist");
  };

  // Calculate cart counts and pricing totals
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-background-custom text-on-surface font-sans min-h-screen pb-24 md:pb-12 text-sm leading-relaxed" id="meditrust-unified-app">
      {/* Premium Navigation Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={(screen) => {
          setCurrentScreen(screen);
          setInitialSymptomsPreset([]); // clear temporary preset
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Container Layer */}
      <main className="pt-24 px-4 md:px-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-160px)]">
        {currentScreen === "home" && (
          <HomeTab
            setScreen={setCurrentScreen}
            onQuickStartAnalysis={handleOnQuickStartAnalysis}
          />
        )}

        {currentScreen === "assist" && (
          <AIAssistTab
            onSetScreen={setCurrentScreen}
            onStoreNewResult={handleStoreAnalysisResult}
            initialSelectedSymptoms={initialSymptomsPreset}
          />
        )}

        {currentScreen === "book" && (
          <BookTab
            onAddAppointment={handleAddAppointment}
            onSetScreen={setCurrentScreen}
          />
        )}

        {currentScreen === "store" && (
          <StoreTab
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === "records" && (
          <RecordsTab
            appointments={appointments}
            analyses={analyses}
            onCancelAppointment={handleCancelAppointment}
            onSetScreen={setCurrentScreen}
          />
        )}
      </main>

      {/* Mobile Bottom Thumb Navigation bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center py-2.5 px-4 shadow-lg md:hidden">
        <button
          onClick={() => {
            setCurrentScreen("home");
            setInitialSymptomsPreset([]);
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            currentScreen === "home" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen("assist");
            setInitialSymptomsPreset([]);
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            currentScreen === "assist" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">AI Assist</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen("book");
            setInitialSymptomsPreset([]);
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            currentScreen === "book" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">Book</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen("store");
            setInitialSymptomsPreset([]);
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            currentScreen === "store" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px]">Store</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen("records");
            setInitialSymptomsPreset([]);
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            currentScreen === "records" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <FileCheck2 className="w-5 h-5" />
          <span className="text-[10px]">Records</span>
        </button>
      </nav>

      {/* Floating Support Assist FAB Widget */}
      <a
        href="https://wa.me/919678560784"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 bg-[#25D366] text-white"
        id="whatsapp-connector-floating"
      >
        <svg
          className="w-6 h-6 fill-current text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.174.346-.217.462-.217s.231.001.332.005c.109.004.258-.041.404.314.159.386.541 1.314.588 1.41.047.097.078.209.014.337-.064.128-.096.209-.19.314-.094.105-.198.235-.282.314-.101.096-.206.201-.089.401.116.199.516.851 1.107 1.379.761.68 1.399.89 1.597.989.199.099.314.084.431-.05.117-.135.503-.585.637-.786.135-.201.27-.168.456-.099s1.175.554 1.379.657c.202.103.337.154.386.237.049.083.049.48-.095.885z"></path>
          <path d="M12.031 0C5.408 0 0 5.408 0 12.031c0 2.106.547 4.161 1.591 5.966L.03 24l6.191-1.624c1.745.95 3.714 1.455 5.81 1.455 6.623 0 12.031-5.408 12.031-12.031C24.062 5.408 18.654 0 12.031 0zm.011 21.843c-1.925 0-3.812-.52-5.457-1.503l-.391-.233-3.664.961 1.001-3.664-.256-.407c-1.07-1.701-1.637-3.671-1.637-5.698 0-5.836 4.747-10.584 10.584-10.584 5.836 0 10.584 4.748 10.584 10.584 0 5.838-4.748 10.584-10.584 10.584z"></path>
        </svg>
      </a>

      {/* Cart Drawer / Overlay modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-end z-50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative animate-slide-in p-6 sm:p-8" id="store-cart-drawer">
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checkout State Success */}
            {checkoutCompleted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-8 h-8 font-black" />
                </div>
                <h4 className="font-bold text-gray-800 text-base">Order Placed Successfully!</h4>
                <p className="text-xs text-gray-400 font-medium max-w-xs leading-relaxed">
                  Your prescription meds are being packed. The dynamic delivery rider will arrive Today before 6:00 PM. Follow active Order #MT-9821.
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items list */}
                <div className="flex-1 overflow-y-auto py-5 space-y-4 scrollbar-hide">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100"
                      >
                        <img
                          alt={item.product.name}
                          className="w-12 h-12 object-contain bg-white rounded-lg p-1.5 border border-gray-100 shrink-0"
                          src={item.product.imageUrl}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.product.name}</h4>
                          <span className="text-[10px] text-primary font-bold">₹{item.product.price} each</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-extrabold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => handleAddToCart(item.product)}
                            className="bg-primary text-white p-1 rounded hover:opacity-90 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-gray-400 font-bold text-xs space-y-2">
                      <p>Your medicine cart is empty.</p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setCurrentScreen("store");
                        }}
                        className="text-primary hover:underline"
                      >
                        Shop trending supplements
                      </button>
                    </div>
                  )}
                </div>

                {/* Pricing / Checkout card */}
                {cart.length > 0 && (
                  <div className="pt-5 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>Meds Subtotal:</span>
                      <span className="text-sm font-black text-on-surface">₹{totalCartPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>Express Delivery (2h):</span>
                      <span className="text-xs text-emerald-600 font-black">FREE PROMO</span>
                    </div>
                    <div className="pt-2 flex justify-between items-center text-sm font-black text-on-surface">
                      <span>Estimated Total due:</span>
                      <span className="text-lg text-primary">₹{totalCartPrice}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 text-center rounded-xl font-bold text-xs trust-gradient text-white active:scale-95 transition-all shadow-md hover:opacity-95 cursor-pointer block mt-2 text-center"
                    >
                      Process Checkout & Place Order
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
