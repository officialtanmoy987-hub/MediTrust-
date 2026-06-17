import React, { useState } from "react";
import {
  Search,
  Calendar,
  DollarSign,
  ChevronDown,
  Star,
  Clock,
  ArrowRight,
  User,
  Check,
  ShieldAlert,
  X,
} from "lucide-react";
import { Doctor, Appointment } from "../types";
import { INITIAL_DOCTORS } from "../data";

interface BookTabProps {
  onAddAppointment: (appointment: Appointment) => void;
  onSetScreen: (screen: string) => void;
}

export default function BookTab({
  onAddAppointment,
  onSetScreen,
}: BookTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("Any");
  const [selectedFee, setSelectedFee] = useState("Any");

  // Booking Flow State
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState("");
  const [preferredDay, setPreferredDay] = useState("Tomorrow");
  const [preferredTime, setPreferredTime] = useState("10:00 AM");
  const [bookingCompleted, setBookingCompleted] = useState(false);

  const specialties = [
    "All",
    "Homeopathy",
    "General Medicine",
    "Pediatrics",
    "Cardiology",
    "Dermatology",
    "Neurology",
  ];

  // Filters calculation
  const filteredDoctors = INITIAL_DOCTORS.filter((doc) => {
    // Search query match
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    // Specialty chip match
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    // Fee match logic
    let matchesFee = true;
    if (selectedFee === "Below500") {
      matchesFee = doc.fee <= 500;
    } else if (selectedFee === "500-1000") {
      matchesFee = doc.fee > 500 && doc.fee <= 1000;
    } else if (selectedFee === "Above1000") {
      matchesFee = doc.fee > 1000;
    }

    // Availability filter match
    let matchesAvailability = true;
    if (selectedAvailability === "Today") {
      matchesAvailability = doc.availability.toLowerCase().includes("today");
    } else if (selectedAvailability === "Tomorrow") {
      matchesAvailability = doc.availability.toLowerCase().includes("tomorrow") || doc.availability.toLowerCase().includes("today");
    }

    return matchesSearch && matchesSpecialty && matchesFee && matchesAvailability;
  });

  const handleOpenBookingModal = (doc: Doctor) => {
    setBookingDoctor(doc);
    setPatientName("");
    setBookingCompleted(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor || !patientName.trim()) return;

    const newAppointment: Appointment = {
      id: "app_" + Date.now(),
      doctor: bookingDoctor,
      date: preferredDay === "Today" ? "Today" : "Tomorrow, June 18th",
      time: preferredTime,
      patientName: patientName.trim(),
      status: "Confirmed",
    };

    onAddAppointment(newAppointment);
    setBookingCompleted(true);
    setTimeout(() => {
      // Close booking state after slight delay
      setBookingDoctor(null);
      setBookingCompleted(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="doctor-booking-tab">
      {/* Title */}
      <section className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Find Your Specialist
        </h1>
        <p className="text-sm font-semibold text-gray-500 max-w-xl leading-relaxed">
          Connect with highly-rated medical professionals across multiple clinical departments. Book appointments instantly.
        </p>
      </section>

      {/* Bento filters layout */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Input 1: Specialty query */}
          <div className="md:col-span-5 flex items-center px-4 py-1.5 bg-gray-50 border border-transparent rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search specialty, doctor name..."
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-semibold py-2.5 px-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Select 2: Availability */}
          <div className="md:col-span-3 flex items-center px-4 py-1.5 bg-gray-50 border border-transparent rounded-xl focus-within:border-primary transition-all">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
            <select
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-semibold py-2.5 px-2 text-gray-600 appearance-none cursor-pointer"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="Any">Any Availability</option>
              <option value="Today">Available Today</option>
              <option value="Tomorrow">Tomorrow & Under</option>
            </select>
          </div>

          {/* Select 3: Price Fee limit */}
          <div className="md:col-span-2 flex items-center px-4 py-1.5 bg-gray-50 border border-transparent rounded-xl focus-within:border-primary transition-all font-semibold text-sm">
            <DollarSign className="w-5 h-5 text-gray-400 shrink-0" />
            <select
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-bold py-2.5 px-2 text-gray-600 appearance-none cursor-pointer"
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
            >
              <option value="Any">Any Fee</option>
              <option value="Below500">Below ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="Above1000">Above ₹1000</option>
            </select>
          </div>

          {/* Search trigger button */}
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSpecialty("All");
              setSelectedAvailability("Any");
              setSelectedFee("Any");
            }}
            className="md:col-span-2 bg-gray-100 text-gray-600 rounded-xl font-bold text-xs py-3.5 px-6 active:scale-95 transition-all flex items-center justify-center gap-1.5 hover:bg-gray-200 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Specialty Chips bar scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {specialties.map((spec) => {
          const isActive = selectedSpecialty === spec;
          return (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Grid of Doctors lists */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="glass-card p-6 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-md transition-all h-full"
            >
              {/* Doctor Header card info */}
              <div className="flex gap-4 mb-5">
                <img
                  alt={doc.name}
                  className="w-20 h-20 rounded-xl object-cover shadow-inner shrink-0"
                  src={doc.imageUrl}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider leading-none">
                      {doc.badge}
                    </span>
                    <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-[15px] text-gray-800 tracking-tight mt-2 line-clamp-1">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {doc.specialty}
                  </p>
                </div>
              </div>

              {/* Middle checklist details */}
              <div className="space-y-3 mb-6 flex-1 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-gray-50 rounded text-gray-400">Y</span>
                  <span>{doc.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-teal-50 text-teal-600 rounded">H</span>
                  <span className="text-teal-700 font-bold">{doc.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="w-5 h-5 flex items-center justify-center bg-gray-50 rounded text-[14px]">₹</span>
                  <span className="font-extrabold text-sm">₹{doc.fee} consultation</span>
                </div>
              </div>

              {/* Bottom buttons trigger */}
              <div className="flex gap-2.5 mt-auto">
                <button
                  onClick={() => alert(`Reviewing details for ${doc.name}. High-fidelity portfolio card setup coming soon!`)}
                  className="flex-1 py-3 text-center rounded-xl border border-primary/20 hover:border-primary text-primary text-xs font-bold bg-white transition-all cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleOpenBookingModal(doc)}
                  className="flex-1 py-3 text-center rounded-xl trust-gradient hover:opacity-90 text-white text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 font-semibold space-y-2">
          <p>No specialists match the selected filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSpecialty("All");
              setSelectedAvailability("Any");
              setSelectedFee("Any");
            }}
            className="text-primary hover:underline text-xs"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Inline Booking Wizard Overlay */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-[24px] shadow-2xl space-y-6 relative animate-fade-in border border-gray-100">
            <button
              onClick={() => setBookingDoctor(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingCompleted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <Check className="w-8 h-8 font-black" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Appointment Booked!
                </h3>
                <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto">
                  Your appointment with <span className="font-bold text-primary">{bookingDoctor.name}</span> has been saved. Review your tickets inside the <span className="font-bold">My Reports</span> screen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <h3 className="text-md sm:text-lg font-black text-gray-800">
                    Book Appointment
                  </h3>
                  <p className="text-[11px] font-bold text-primary uppercase mt-1">
                    {bookingDoctor.name} • {bookingDoctor.specialty}
                  </p>
                </div>

                {/* Patient Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 block">
                    Patient Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-xl border-none text-xs font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Day selector */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 block">
                      Preferred Day
                    </label>
                    <select
                      className="w-full bg-gray-50 p-3 rounded-xl text-xs font-bold border-none"
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                    >
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Today">Available Today</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 block">
                      Preferred Time Block
                    </label>
                    <select
                      className="w-full bg-gray-50 p-3 rounded-xl text-xs font-bold border-none"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Fee disclosure */}
                <div className="p-3 bg-teal-50/50 rounded-xl flex items-center justify-between font-bold text-xs text-teal-800">
                  <span>Consultation Fee:</span>
                  <span className="text-sm font-black">₹{bookingDoctor.fee}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl text-white trust-gradient text-xs font-bold cursor-pointer active:scale-95 shadow-md hover:opacity-90 transition-all text-center"
                >
                  Confirm Appointment Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
