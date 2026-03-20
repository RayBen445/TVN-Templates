import React, { useEffect } from 'react';
import { ArrowLeft, ScrollText } from 'lucide-react';

interface TermsProps {
  onBack: () => void;
}

export default function Terms({ onBack }: TermsProps) {
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
        <ScrollText className="w-8 h-8 text-cyan-400" />
        <h1 className="text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
      </div>

      <div className="inline-block px-3 py-1 mb-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase">
        Effective Date: {new Date().getFullYear()}
      </div>

      <div className="space-y-12 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">1. Network Agreement</h2>
          <p>
            By accessing or utilizing Tech Visionaries Network (TVN) Templates, you execute a binding contract with our digital infrastructure. Your continued use signifies your agreement to these parameters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">2. Intellectual Architecture</h2>
          <p className="mb-4">
            Our codebase, design systems, and network aesthetics are the intellectual property of TVN.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>You may clone, modify, and deploy our open-source templates for your personal or commercial projects.</li>
            <li>You may not redistribute these templates as standalone products without attribution.</li>
            <li>TVN branding must remain intact unless explicitly authorized by a system administrator.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">3. User Conduct</h2>
          <p className="mb-4">
            As a node within our network, you are expected to maintain the integrity of the ecosystem. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Deploy malicious code, spyware, or disruptive scripts using our foundation.</li>
            <li>Attempt unauthorized access to central TVN servers or databases.</li>
            <li>Utilize our systems for illicit, fraudulent, or globally unsanctioned operations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-4">4. Liability Limitation</h2>
          <p>
            TVN provides these templates "as is" and "as available". We offer no warranties regarding the absolute security, continuous availability, or error-free operation of our code architecture. Under no circumstances shall TVN be liable for data loss, revenue disruption, or system failure resulting from the implementation of our components.
          </p>
        </section>

        <section className="bg-[#111827] p-8 rounded-2xl border border-cyan-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Legal Inquiry Port</h3>
          <p className="text-sm font-mono text-cyan-400 tracking-wider">
            legal@tvnetwork.zone.id
          </p>
        </section>
      </div>
    </div>
  );
}
