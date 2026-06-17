import {
  FileText,
  Calendar,
  Clock,
  Heart,
  User,
  AlertTriangle,
  FileCheck2,
  XCircle,
  Plus,
  RefreshCw,
  Printer,
} from "lucide-react";
import { Appointment, AnalysisResult, Screen } from "../types";

interface RecordsTabProps {
  appointments: Appointment[];
  analyses: AnalysisResult[];
  onCancelAppointment: (appId: string) => void;
  onSetScreen: (screen: Screen) => void;
}

export default function RecordsTab({
  appointments,
  analyses,
  onCancelAppointment,
  onSetScreen,
}: RecordsTabProps) {
  return (
    <div className="space-y-8 animate-fade-in" id="health-records-tab">
      {/* Title */}
      <section className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Your Health Records
        </h1>
        <p className="text-sm font-semibold text-gray-400">
          Securely stores and lists your online consultations, AI checks, and pharmacological logs.
        </p>
      </section>

      {/* Grid of Reports vs Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module A: Doctor Appointments Booked */}
        <div className="space-y-4">
          <div className="flex justify-between items-center pr-2">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Booked Consultations ({appointments.length})
            </h3>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((app) => (
                <div
                  key={app.id}
                  className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                      <img
                        alt={app.doctor.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-50"
                        src={app.doctor.imageUrl}
                      />
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{app.doctor.name}</h4>
                        <p className="text-[11px] font-bold text-primary">{app.doctor.specialty}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-500/10 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100/30">
                    <div className="flex items-center gap-1.5 text-ellipsis overflow-hidden">
                      <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">Patient: {app.patientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{app.date} @ {app.time}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => alert(`Reviewing invoice ticket app_${app.id}. Download set to offline.`)}
                      className="text-xs text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Ticket
                    </button>
                    {app.status === "Confirmed" && (
                      <button
                        onClick={() => onCancelAppointment(app.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 p-8 rounded-2xl text-center space-y-4">
              <p className="text-xs text-gray-400 font-bold">No active doctor consultations booked.</p>
              <button
                onClick={() => onSetScreen("book")}
                className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-extrabold px-4 py-2 rounded-full shadow-sm hover:opacity-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Find Specialists
              </button>
            </div>
          )}
        </div>

        {/* Module B: Symptom Analyzer Results History */}
        <div className="space-y-4">
          <div className="flex justify-between items-center pr-2">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-secondary" />
              Symptom Reports History ({analyses.length})
            </h3>
          </div>

          {analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((ana) => (
                <div
                  key={ana.id}
                  className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                        AI REPORT {ana.id.slice(-6).toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-black uppercase ${
                            ana.severity === "High"
                              ? "text-red-600"
                              : ana.severity === "Medium"
                              ? "text-amber-500"
                              : "text-emerald-600"
                          }`}
                        >
                          {ana.severity} Urgency
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold font-mono">
                          ({ana.percentage}% Correlated)
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 font-mono shrink-0">
                      {ana.timestamp.split(",")[0]}
                    </span>
                  </div>

                  {/* Highlighted Symptoms */}
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Checklist:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ana.symptoms.map((sym, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 border border-gray-200/50 text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap"
                        >
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Conditions brief */}
                  <div className="space-y-2 pt-2 border-t border-gray-50">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      AI Condition Evaluations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ana.conditions.map((c, i) => (
                        <div key={i} className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-left">
                          <h5 className="font-bold text-xs text-gray-800 line-clamp-1">{c.name}</h5>
                          <p className="text-[10px] font-semibold text-gray-500 line-clamp-2 mt-0.5">{c.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 p-8 rounded-2xl text-center space-y-4">
              <p className="text-xs text-gray-400 font-bold">No recent symptom diagnostics completed.</p>
              <button
                onClick={() => onSetScreen("assist")}
                className="inline-flex items-center gap-1 bg-secondary text-white text-[11px] font-extrabold px-4 py-2 rounded-full shadow-sm hover:opacity-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Analyze Symptoms
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
