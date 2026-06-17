import {
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Pill,
  Truck,
  Leaf,
  Award,
} from "lucide-react";
import { Screen } from "../types";

interface HomeTabProps {
  setScreen: (screen: Screen) => void;
  onQuickStartAnalysis: (initialSymptoms: string[]) => void;
}

export default function HomeTab({
  setScreen,
  onQuickStartAnalysis,
}: HomeTabProps) {
  const popularPreviews = ["Fever", "Cough", "Headache", "Fatigue", "Cold"];

  return (
    <div className="space-y-12 animate-fade-in" id="home-dashboard-section">
      {/* Hero Section */}
      <section className="relative px-2 pt-4 pb-12 overflow-hidden flex flex-col md:flex-row gap-8 items-center">
        {/* Background blurs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex-1 space-y-6 max-w-xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface leading-tight tracking-tight">
            Your Personal <span className="text-primary font-bold">AI Healthcare</span> Assistant
          </h1>
          <p className="text-gray-500 font-medium text-base sm:text-lg max-w-md leading-relaxed">
            Instant medical analysis, seamless doctor consultations, and rapid medicine delivery. Everything your health needs, in one place.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setScreen("assist")}
              className="trust-gradient text-white font-semibold text-sm py-4 px-6 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all text-center self-stretch md:self-start hover:opacity-90"
              id="analyze-my-symptoms-cta"
            >
              <Sparkles className="w-5 h-5 fill-white/20 animate-pulse" />
              Analyze My Symptoms
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScreen("book")}
                className="bg-white border border-gray-200 text-on-surface font-semibold text-sm py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all hover:border-primary hover:text-primary cursor-pointer"
                id="book-doctor-cta"
              >
                <Stethoscope className="w-4 h-4 text-primary" />
                Book Doctor
              </button>
              <button
                onClick={() => setScreen("store")}
                className="bg-white border border-gray-200 text-on-surface font-semibold text-sm py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all hover:border-secondary hover:text-secondary cursor-pointer"
                id="order-meds-cta"
              >
                <Pill className="w-4 h-4 text-secondary" />
                Order Meds
              </button>
            </div>
          </div>
        </div>

        {/* Hero Illustration / Graphic */}
        <div className="flex-1 w-full max-w-md md:max-w-none flex justify-center">
          <div className="glass-card p-4 rounded-3xl relative w-full shadow-lg">
            <img
              alt="MediTrust Medical Tablet"
              className="w-full h-56 sm:h-64 object-cover rounded-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF6b6r7peIXoYyyB9tnieHqw8INhuRp2O8Rl794xzDBknpMKPpKU9-zLC0xGJvm3leKEpt-JmClqk8Y9mvLXw2uctwfO-6SM6gGykECCWc8TUemszspHAcQMenxzVp3vnlJmBW1AANLQaFMqgNMLe9uOJCchMjPP-cpzfIU3I_4iW5cBz2nw9E6Of7tbNbVEx6I0N0WNdnkFOBcW10zsE4zg_u-hmnb85YXVRkINw3dbthgLNvuJmOgegMG_JuHiM85YK8r7qn73c"
            />
            {/* AI Status pill */}
            <div className="absolute -bottom-4 -left-3 glass-card py-2.5 px-3.5 rounded-2xl flex items-center gap-3 shadow-md border-teal-500/20 bg-white/95">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] text-gray-400 block font-medium">Status</span>
                <span className="text-xs font-bold text-emerald-800">AI Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="px-2" id="trust-metrics-section">
        <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center text-center shadow-inner border border-gray-100">
          <div className="flex-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">50k+</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Patients</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-200"></div>
          <div className="flex-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">100+</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Doctors</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-200"></div>
          <div className="flex-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">24/7</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Support</p>
          </div>
        </div>
      </section>

      {/* Fast Selector / Inline AI Analyzer card */}
      <section className="px-2">
        <div className="glass-card rounded-[28px] p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-white to-blue-50/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
            <Sparkles className="w-32 h-32 text-primary" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                AI Powered
              </span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
              How are you feeling?
            </h2>
            <p className="text-sm font-medium text-gray-500">
              Select key symptoms below to launch a deep clinical analysis immediately.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {popularPreviews.map((sym) => (
                <button
                  key={sym}
                  onClick={() => onQuickStartAnalysis([sym])}
                  className="bg-white border border-gray-200 hover:border-primary hover:text-primary px-4 py-2 rounded-full font-semibold text-xs text-gray-500 transition-colors cursor-pointer"
                >
                  {sym}
                </button>
              ))}
            </div>

            <button
              onClick={() => setScreen("assist")}
              className="w-full mt-4 trust-gradient text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>Start AI Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="px-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-on-surface">
            Quick Services
          </h3>
          <button
            onClick={() => setScreen("book")}
            className="text-primary hover:underline font-bold text-xs"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => setScreen("book")}
            className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-on-surface">Doctor Booking</h4>
            <p className="text-[10px] text-gray-400 mt-1">Instant video consultation</p>
          </div>

          <div
            onClick={() => {
              setScreen("store");
            }}
            className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-teal-600" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-on-surface">Homeopathy</h4>
            <p className="text-[10px] text-gray-400 mt-1">Natural holistic selection</p>
          </div>

          <div
            onClick={() => setScreen("store")}
            className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:border-cyan-500 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 bg-cyan-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 text-cyan-600" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-on-surface">Delivery</h4>
            <p className="text-[10px] text-gray-400 mt-1">Medication at doorstep in 2h</p>
          </div>

          <div
            onClick={() => setScreen("records")}
            className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:border-purple-500 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-on-surface">Records</h4>
            <p className="text-[10px] text-gray-400 mt-1">Secure & private reports</p>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="px-2 pb-6">
        <div className="bg-gradient-to-br from-teal-800 to-teal-700 rounded-2xl p-6 flex flex-row items-center justify-between overflow-hidden relative shadow-md">
          <div className="relative z-10 w-2/3 space-y-2">
            <h4 className="text-xl font-extrabold text-white">Join MediTrust+ Prime</h4>
            <p className="text-teal-100/90 font-medium text-xs">
              Get 20% flat discount on all medicines, free online physician checkups, and priority slot booking.
            </p>
            <button
              onClick={() => {
                alert("Thank you for your interest! MediTrust+ Prime Membership integration will be configured soon.");
              }}
              className="bg-white text-teal-800 hover:bg-teal-50 font-bold text-[11px] px-4 py-2 rounded-full shadow-md active:scale-95 transition-all"
            >
              Explore Membership
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none select-none">
            <Award className="w-36 h-36 text-white" />
          </div>
        </div>
      </section>
    </div>
  );
}
