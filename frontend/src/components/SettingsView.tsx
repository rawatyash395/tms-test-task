import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Globe,
  Database,
  ShieldCheck,
  Save,
  Mail,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { CustomSelect } from "./CustomSelect";

interface SettingsState {
  fullName: string;
  email: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: string;
}

export const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    fullName: "John Doe",
    email: "john.doe@fleetflow.com",
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: "English (US)",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      window.dispatchEvent(
        new CustomEvent("app:toast", {
          detail: { message: "SETTINGS UPDATED SUCCESSFULLY", type: "success" },
        }),
      );
    }, 1000);
  };

  return (
    <div className="w-full animate-fade-in space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <User className="w-4 h-4 text-primary-600" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Personal Identity
            </h3>
          </div>
          <div className="main-card p-5 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Full Display Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) =>
                  setSettings({ ...settings, fullName: e.target.value })
                }
                className="input w-full"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Corporate Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="input w-full"
                placeholder="john@company.com"
              />
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Bell className="w-4 h-4 text-primary-600" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Alert Protocols
            </h3>
          </div>
          <div className="main-card p-5 space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Email Updates
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Daily summary reports
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    emailNotifications: !settings.emailNotifications,
                  })
                }
                className={`w-12 h-6 rounded-full transition-all relative ${settings.emailNotifications ? "bg-primary-600" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.emailNotifications ? "left-7" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Push Notifications
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Real-time mobile alerts
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    pushNotifications: !settings.pushNotifications,
                  })
                }
                className={`w-12 h-6 rounded-full transition-all relative ${settings.pushNotifications ? "bg-primary-600" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.pushNotifications ? "left-7" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Regional Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Globe className="w-4 h-4 text-primary-600" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Regional & Interface
            </h3>
          </div>
          <div className="main-card p-5">
            <CustomSelect
              label="Primary Language"
              value={settings.language}
              onChange={(val) => setSettings({ ...settings, language: val })}
              options={[
                { value: "English (US)", label: "English (US)" },
                { value: "French (FR)", label: "French (FR)" },
                { value: "Spanish (ES)", label: "Spanish (ES)" },
                { value: "German (DE)", label: "German (DE)" },
              ]}
              icon={<Globe className="w-3.5 h-3.5" />}
            />
          </div>
        </div>

        {/* Security Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Security Status
            </h3>
          </div>
          <div className="main-card p-5 space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white text-emerald-600 rounded-xl shadow-sm border border-emerald-50">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-emerald-700">
                  Account Verified
                </span>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-lg">
                Active
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button className="group w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white group-hover:bg-white/10 rounded-xl border border-slate-200 group-hover:border-white/20 transition-all">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Reset Master Password
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>

              <button className="group w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white group-hover:bg-white/10 rounded-xl border border-slate-200 group-hover:border-white/20 transition-all">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Revoke API Keys
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Bar or Footer Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary min-w-[240px] shadow-2xl shadow-primary-500/30"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? "Synchronizing Configuration..." : "Apply All Changes"}
        </button>
      </div>
    </div>
  );
};
