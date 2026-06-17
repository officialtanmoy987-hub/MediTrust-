export type Screen = 'home' | 'assist' | 'book' | 'store' | 'records';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  fee: number;
  rating: number;
  badge: 'Top Rated' | 'Expert' | 'Patient Choice' | 'Popular' | 'New Star';
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: string;
  imageUrl: string;
  category: 'immunity' | 'cold_cough' | 'digestion' | 'heart_care' | 'wellness';
  type: 'homeopathic' | 'general';
}

export interface Symptom {
  id: string;
  label: string;
  iconName: string; // represent standard Lucide icons
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  patientName: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Condition {
  name: string;
  description: string;
}

export interface NextStep {
  title: string;
  subtitle: string;
  type: 'consult' | 'medicine' | 'general';
}

export interface AnalysisResult {
  id: string;
  symptoms: string[];
  severity: 'Low' | 'Medium' | 'High';
  percentage: number;
  conditions: Condition[];
  disclaimer: string;
  nextSteps: NextStep[];
  timestamp: string;
}
