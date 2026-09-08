import React from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#eeeade] text-ink border-t border-slate/20 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/skill-setu-logo-full.jpg" 
                alt="Skill Setu - A Bridge to iGOT Karmayogi" 
                className="h-14 w-auto object-contain rounded-xl bg-white p-1 border border-slate/20 shadow-sm" 
              />
            </div>
            <p className="text-xs sm:text-sm text-slate leading-relaxed max-w-sm">
              AI-enabled skill intelligence and personalized competency mapping platform built for India's Official Statistical System, seamlessly integrated with iGOT Karmayogi and NSSTA TPAC.
            </p>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-ink tracking-wider uppercase">Platform Navigation</h4>
            <ul className="space-y-2 text-xs text-slate font-medium">
              <li><a href="/" className="hover:text-sandstone transition">Home Overview</a></li>
              <li><a href="#competencies" className="hover:text-sandstone transition">27 Competencies</a></li>
              <li><a href="#how-it-works" className="hover:text-sandstone transition">Workflow & Engine</a></li>
              <li><a href="/login" className="hover:text-sandstone transition">Officer Login</a></li>
              <li><a href="/quiz-generator" className="hover:text-sandstone transition">AI Quiz Generator</a></li>
            </ul>
          </div>

          {/* Col 4: Institutional Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-ink tracking-wider uppercase">Training Partners</h4>
            <ul className="space-y-2 text-xs text-slate font-medium">
              <li>
                <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="hover:text-sandstone transition flex items-center space-x-1">
                  <span>iGOT Karmayogi Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-sandstone transition flex items-center space-x-1">
                  <span>NSSTA Greater Noida</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-sandstone transition">Central Statistics Office (CSO)</a></li>
              <li><a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-sandstone transition">National Sample Survey (NSSO)</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Academy */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-ink tracking-wider uppercase">MoSPI Headquarters</h4>
            <div className="space-y-2 text-xs text-slate font-medium">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sandstone flex-shrink-0 mt-0.5" />
                <span>Khurshid Lal Bhawan, Janpath, New Delhi - 110001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sandstone flex-shrink-0" />
                <span>training-mospi@gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sandstone flex-shrink-0" />
                <span>+91 (11) 2374-2100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate font-medium gap-4">
          <p>
            Built for <b>SIH Problem Statement 26101</b> • Ministry of Statistics and Programme Implementation
          </p>
          <p>© 2026 Skill Setu. Official Government Statistical Capacity Building Prototype.</p>
        </div>
      </div>
    </footer>
  );
}
