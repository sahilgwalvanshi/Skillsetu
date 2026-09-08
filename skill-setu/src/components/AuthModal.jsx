import React, { useState } from 'react';
import { User, ShieldCheck, CheckCircle, ArrowRight, X } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('officer');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const presetUsers = [
    { name: 'Rajesh Sharma', role: 'officer', designation: 'Senior Statistical Officer', dept: 'NSSO' },
    { name: 'Priya Verma', role: 'officer', designation: 'Junior Statistical Officer', dept: 'CSO' },
    { name: 'Amitabh Sen', role: 'officer', designation: 'Director (Price Statistics)', dept: 'PSCD' },
    { name: 'Dr. Suresh Admin', role: 'admin', designation: 'Director General (Training)', dept: 'NSSTA / MoSPI HQ' }
  ];

  const handleLogin = async (userName, userRole) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.login(userName || name, userRole || selectedRole);
      onLoginSuccess(res.user);
      onClose();
    } catch (err) {
      setError('Login failed. Make sure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate/20 max-w-lg w-full p-6 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate hover:text-ink rounded-full hover:bg-parchment transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sandstone/10 text-sandstone flex items-center justify-center font-bold">
            🇮🇳
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-ink">Skill Setu Portal Access</h3>
            <p className="text-xs text-slate">MoSPI AI Skill Intelligence System</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Quick Select Preset Users */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
            Select Demo Officer / Administrator Account:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {presetUsers.map((u) => (
              <button
                key={u.name}
                onClick={() => handleLogin(u.name, u.role)}
                disabled={loading}
                className="flex items-center justify-between p-3 rounded-xl border border-slate/20 hover:border-sandstone hover:bg-parchment/60 transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                    {u.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink group-hover:text-sandstone transition">
                      {u.name}
                    </div>
                    <div className="text-xs text-slate">
                      {u.designation} • <span className="text-ink-light font-medium">{u.dept}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-sandstone opacity-0 group-hover:opacity-100 flex items-center space-x-1 transition">
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate/20"></div>
          <span className="flex-shrink mx-4 text-xs font-medium text-slate">OR CUSTOM LOGIN</span>
          <div className="flex-grow border-t border-slate/20"></div>
        </div>

        {/* Custom Login Form */}
        <form onSubmit={(e) => { e.preventDefault(); if (name) handleLogin(name, selectedRole); }} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate/30 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate mb-1">Access Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('officer')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 transition ${
                  selectedRole === 'officer'
                    ? 'border-sandstone bg-sandstone/10 text-sandstone font-bold'
                    : 'border-slate/20 text-slate hover:bg-parchment'
                }`}
              >
                <User className="w-4 h-4" />
                <span>MoSPI Officer</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 transition ${
                  selectedRole === 'admin'
                    ? 'border-sandstone bg-sandstone/10 text-sandstone font-bold'
                    : 'border-slate/20 text-slate hover:bg-parchment'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Trainer / Admin</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full py-3 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-medium text-sm transition shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Continue to Skill Setu</span>
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
