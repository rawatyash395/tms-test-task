import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Truck, Lock, Mail, AlertCircle } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: "admin" | "employee") => {
    if (role === "admin") {
      setEmail("admin@tms.com");
      setPassword("admin123");
    } else {
      setEmail("employee@tms.com");
      setPassword("employee123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-grid relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-slate-100 rounded-3xl mb-6 shadow-xl shadow-slate-200/50">
            <Truck className="w-10 h-10 text-primary-600" strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            FleetFlow <span className="text-primary-600">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium font-mono text-xs uppercase tracking-[0.2em]">
            Enterprise Management Console
          </p>
        </div>

        <div className="card animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"
              >
                Security Identity
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  placeholder="name@fleetflow.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"
              >
                Access Token
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold tracking-tight">
                  AUTHENTICATION FAILED: INVALID CREDENTIALS
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="uppercase tracking-widest text-xs">
                    Verifying Identity...
                  </span>
                </>
              ) : (
                <span className="uppercase tracking-widest text-xs">
                  Establish Session
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest mb-4">
              Express Authorization
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => quickLogin("admin")}
                className="py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
              >
                👨‍💼 ADMIN
              </button>
              <button
                type="button"
                onClick={() => quickLogin("employee")}
                className="py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
              >
                👤 EMPLOYEE
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            Corporate Security Subsystem
          </p>
        </div>
      </div>
    </div>
  );
};
