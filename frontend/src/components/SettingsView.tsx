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
} from "lucide-react";

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
    <div className="max-w-4xl animate-fade-in space-y-8 pb-12">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Enterprise Settings
          </h2>
          <p className="text-sm text-slate-500">
            Configure your platform experience and security parameters
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#14b8a6] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#14b8a6]/20 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Synchronizing..." : "Save Configuration"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <User className="w-4 h-4 text-[#14b8a6]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Personal Identity
            </h3>
          </div>
          <div className="main-card p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">
                Full Display Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) =>
                  setSettings({ ...settings, fullName: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">
                Corporate Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Bell className="w-4 h-4 text-[#14b8a6]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Alert Protocols
            </h3>
          </div>
          <div className="main-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Email Updates
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-medium">
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
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.emailNotifications ? "bg-[#14b8a6]" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emailNotifications ? "left-6" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Push Notifications
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-medium">
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
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.pushNotifications ? "bg-[#14b8a6]" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.pushNotifications ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Globe className="w-4 h-4 text-[#14b8a6]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Regional & Interface
            </h3>
          </div>
          <div className="main-card p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Primary Language
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none transition-all"
              >
                <option>English (US)</option>
                <option>French (FR)</option>
                <option>Spanish (ES)</option>
                <option>German (DE)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <ShieldCheck className="w-4 h-4 text-[#14b8a6]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Security Status
            </h3>
          </div>
          <div className="main-card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-green-700">
                    Account Verified
                  </span>
                </div>
                <span className="text-[10px] font-bold text-green-600 uppercase">
                  Active
                </span>
              </div>
              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Reset Master Password
              </button>
              <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                <Database className="w-4 h-4" />
                Revoke Enterprise API Keys
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
