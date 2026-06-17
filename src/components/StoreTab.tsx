import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  TrendingUp,
  Award,
  Plus,
  Minus,
  CheckCircle2,
  Trash2,
  Package,
  Truck,
  Sparkles,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Product, CartItem } from "../types";
import { INITIAL_PRODUCTS } from "../data";

interface StoreTabProps {
  cart: CartItem[];
  onAddToCart: (prod: Product) => void;
  onRemoveFromCart: (prodId: string) => void;
  onClearCart: () => void;
  onNavigate: (screen: string) => void;
}

export default function StoreTab({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onNavigate,
}: StoreTabProps) {
  const [activeTypeTab, setActiveTypeTab] = useState<"homeopathic" | "general">("homeopathic");
  const [currCategoryFilter, setCurrCategoryFilter] = useState<string>("All");

  const categories = [
    { label: "All", id: "All", icon: ShoppingBag },
    { label: "Immunity", id: "immunity", icon: Sparkles },
    { label: "Cold & Cough", id: "cold_cough", icon: TrendingUp },
    { label: "Digestion", id: "digestion", icon: Package },
    { label: "Heart Care", id: "heart_care", icon: Heart },
    { label: "Wellness", id: "wellness", icon: Award },
  ];

  // Filtering products
  const filteredProducts = INITIAL_PRODUCTS.filter((prod) => {
    const matchesTab = prod.type === activeTypeTab;
    const matchesCat = currCategoryFilter === "All" || prod.category === currCategoryFilter;
    return matchesTab && matchesCat;
  });

  return (
    <div className="space-y-8 animate-fade-in" id="health-pharmacy-store">
      {/* Active Order Delivery Tracker Widget */}
      <section className="px-2">
        <div className="glass-card rounded-[24px] p-6 relative overflow-hidden bg-gradient-to-r from-teal-50/10 to-white">
          <div className="flex justify-between items-start md:items-center gap-4 mb-5">
            <div>
              <h3 className="text-base sm:text-lg text-gray-800 font-extrabold flex items-center gap-1.5">
                Active Order #MT-9821
              </h3>
              <p className="text-xs text-gray-400 font-medium">Expected by Today, 6:00 PM</p>
            </div>
            <span className="bg-teal-500/10 text-teal-800 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-bold shrink-0">
              Dispatched
            </span>
          </div>

          {/* Stepper tracker */}
          <div className="relative flex justify-between items-center px-1 py-2 sm:px-4">
            {/* Stepper background horizontal bars */}
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-100 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-[3.5px] bg-primary -translate-y-1/2 z-0 transition-all duration-1000"></div>

            {/* Step 1: Ordered */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 text-center">
              <div className="w-8.5 h-8.5 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-black text-primary">Ordered</span>
            </div>

            {/* Step 2: Packed */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 text-center">
              <div className="w-8.5 h-8.5 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-black text-primary">Packed</span>
            </div>

            {/* Step 3: Dispatched */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 text-center">
              <div className="w-8.5 h-8.5 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                <Truck className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs font-black text-primary">Dispatched</span>
            </div>

            {/* Step 4: Out for Delivery */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 text-center">
              <div className="w-8.5 h-8.5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border-2 border-white shadow-sm">
                <Package className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-400">Arriving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Store Tabs Toggle */}
      <section className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100/50 flex shadow-inner">
        <button
          onClick={() => setActiveTypeTab("homeopathic")}
          className={`flex-1 py-3.5 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTypeTab === "homeopathic"
              ? "bg-white text-primary shadow-sm scale-102"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Homeopathic Medicine
        </button>
        <button
          onClick={() => setActiveTypeTab("general")}
          className={`flex-1 py-3.5 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTypeTab === "general"
              ? "bg-white text-primary shadow-sm scale-102"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          General Medicine Store
        </button>
      </section>

      {/* Category Horizontal list */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-md sm:text-lg font-bold text-on-surface">
            Shop by Category
          </h2>
          <button
            onClick={() => setCurrCategoryFilter("All")}
            className="text-primary hover:underline text-xs font-semibold"
          >
            Clear Cat
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = currCategoryFilter === cat.id;
            const CatIcon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => setCurrCategoryFilter(cat.id)}
                className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all border ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md scale-105"
                      : "bg-white border-gray-100 text-gray-600 group-hover:scale-102"
                  }`}
                >
                  <CatIcon className="w-6 h-6 shrink-0" />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-wider">
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Bento Grid */}
      <section className="space-y-4">
        <h2 className="text-md sm:text-lg font-bold text-on-surface">
          Trending Supplements
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => {
              const insideCart = cart.find(item => item.product.id === prod.id);
              return (
                <div
                  key={prod.id}
                  className="glass-card rounded-2xl p-4 flex flex-col group hover:shadow-md transition-all h-full"
                >
                  {/* Aspect square with container details */}
                  <div className="relative aspect-square rounded-xl bg-white overflow-hidden p-3 border border-gray-100/50 mb-3 block shrink-0">
                    <img
                      alt={prod.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                      src={prod.imageUrl}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                        <span className="text-[10px] text-gray-400 font-bold">{prod.rating}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="pt-3 mt-2 border-t border-gray-50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm sm:text-base font-black text-primary">₹{prod.price}</span>
                        <span className="text-[10px] text-gray-400 line-through">₹{prod.originalPrice}</span>
                      </div>

                      {insideCart ? (
                        <div className="flex items-center justify-between mt-3 bg-gray-50 border border-gray-100 rounded-lg py-1 px-2.5">
                          <button
                            onClick={() => onRemoveFromCart(prod.id)}
                            className="text-gray-500 p-1 hover:text-red-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-extrabold text-on-surface">
                            {insideCart.quantity}
                          </span>
                          <button
                            onClick={() => onAddToCart(prod)}
                            className="text-gray-500 p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="w-full mt-3 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-extrabold active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 font-bold text-xs">
            No active trending products found for {activeTypeTab} segment.
          </div>
        )}
      </section>

      {/* Promotional Supplemental Flash sale banner */}
      <section className="py-4">
        <div className="relative rounded-2xl overflow-hidden bg-primary/95 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2 max-w-lg text-center md:text-left">
            <span className="bg-white/20 text-white font-bold text-[9px] px-2.5 py-1 rounded tracking-widest uppercase inline-block">
              Flash Sale
            </span>
            <h2 className="text-lg sm:text-xl font-black">
              Get Flat 20% Off on all Supplelments
            </h2>
            <p className="text-xs text-white/80 font-semibold">
              Elevate your daily physical vitals with high-purity vitamins. Coupon code auto-applied.
            </p>
            <button
              onClick={() => {
                alert("Shop coupon code MT20 applied! Use the pharmacy catalog above to select products.");
              }}
              className="mt-3 bg-white text-primary hover:bg-teal-50 font-black text-xs px-5 py-2 rounded-xl shadow-md cursor-pointer inline-block"
            >
              Shop Now
            </button>
          </div>
          <div className="text-white/20 select-none pointer-events-none pr-4 hidden md:block">
            <ShoppingBag className="w-24 h-24 stroke-[1.5]" />
          </div>
        </div>
      </section>
    </div>
  );
}
