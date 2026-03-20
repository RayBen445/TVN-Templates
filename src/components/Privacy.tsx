import React, { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyProps {
  onBack: () => void;
}

export default function Privacy({ onBack }: PrivacyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 text-gray-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12 text-sm font-mono tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO HUB
      </button>

      <div className="flex items-center gap-4 mb-8">
        <Shield className="w-8 h-8 text-cyan-400" />
        <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
      </div>

      <div className="inline-block px-3 py-1 mb-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase">
        Last Updated: {new Date().getFullYear()}
      </div>

      <div className="space-y-12 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">1. Information Collection</h2>
          <p className="mb-4">
            At Tech Visionaries Network (TVN), we prioritize your digital sovereignty. When you interact with our templates and digital ecosystem, we collect only essential analytical data to optimize system performance and deliver a seamless experience.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Usage metrics (navigation patterns, interaction rates)</li>
            <li>System diagnostics (browser type, device configuration)</li>
            <li>Voluntary input (when subscribing to updates or creating accounts)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">2. Data Utilization</h2>
          <p className="mb-4">
            Collected architecture data is strictly utilized for structural enhancements. We do not participate in third-party data brokering. Your information helps us:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Refine template aesthetics and performance</li>
            <li>Deploy critical security updates</li>
            <li>Personalize your development ecosystem</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">3. Security Protocols</h2>
          <p>
            Our infrastructure employs enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We continuously monitor for vulnerabilities to ensure our network remains impenetrable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">4. Your Rights</h2>
          <p>
            You maintain full ownership of your data profile. You may request data extraction or total node deletion at any time by contacting our engineering team.
          </p>
        </section>

        <section className="bg-[#111827] p-8 rounded-2xl border border-cyan-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Contact System Administrator</h3>
          <p className="text-sm font-mono text-cyan-400 tracking-wider">
            privacy@tvnetwork.zone.id
          </p>
        </section>
      </div>
    </div>
  );
}
