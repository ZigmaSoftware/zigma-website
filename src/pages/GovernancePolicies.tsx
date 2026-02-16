import React from 'react';
import { Download, FileText, Shield, Lock, Users, CheckCircle, ArrowUpRight, BadgeCheck, ClipboardCheck, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Herobg from '@/assets/hero_bg_gp.png';
import Pdf1 from '@/assets/Pdf Files/ABAC-AML-Policies-Zigma-Global.pdf';
import Pdf2 from '@/assets/Pdf Files/Amended_Zigma-Global-Whistle-Blower-Policy-Clean.pdf';
import Pdf3 from '@/assets/Pdf Files/Zigma-Privacy-Policy.pdf';
import Pdf4 from '@/assets/Pdf Files/Zigma_PDPA Policy.pdf';

const GovernancePolicies = () => {
  const policies = [
    {
      id: 'abac-aml',
      title: 'ABAC & AML Policies',
      description: 'Anti-bribery, anti-corruption, and anti-money laundering framework with governance controls.',
      updated: 'February 2024',
      file: Pdf1,
      icon: Shield,
      accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
    },
    {
      id: 'whistleblower',
      title: 'Whistle Blower Policy',
      description: 'Confidential reporting channels, protection against retaliation, and investigation procedures.',
      updated: 'October 2025',
      file: Pdf2,
      icon: Users,
      accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect personal data across our digital and on-site operations.',
      updated: 'December 2025',
      file: Pdf3,
      icon: Lock,
      accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
    },
    {
      id: 'pdpa',
      title: 'PDPA Policy',
      description: 'Personal Data Protection Act compliance and data governance standards.',
      updated: 'September 2025',
      file: Pdf4,
      icon: FileText,
      accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[hsl(145_63%_32%)] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Herobg})` }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-18 lg:py-24 lg:px-8">
            <div className="max-w-4xl">
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
                <BadgeCheck className="w-4 h-4 text-white/90" />
                Governance & Compliance
              </div> */}
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Governance & Compliance
                {/* <span className="block text-white/90">Aligned to ISO Standards</span> */}
              </h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                We ensure transparent and responsible governance across all operations.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 text-white/80">
                <div className="flex items-start gap-3 rounded-xl border border-white/30 bg-white/20 p-4">
                  <ClipboardCheck className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="text-sm font-semibold">Audit-Ready Controls</div>
                    <div className="text-xs text-white/70">Structured, traceable, verifiable.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/30 bg-white/20 p-4">
                  <Shield className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="text-sm font-semibold">ISO-Aligned</div>
                    <div className="text-xs text-white/70">Governance mapped to standards.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/30 bg-white/20 p-4">
                  <Building2 className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="text-sm font-semibold">Enterprise Coverage</div>
                    <div className="text-xs text-white/70">Applies across teams and units.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section className="max-w-7xl mx-auto px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-3 mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">
                  Governance Policy Library
                </h2>
                <p className="text-muted-foreground max-w-3xl">
                  Each document is reviewed on a defined cycle and versioned for audit traceability.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-[hsl(145_63%_32%)]" />
                Annual Review Cycle
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <article
                  key={policy.id}
                  className="group rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${policy.accent}`} />
                  <div className="p-6 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(145_63%_32%)/0.08]">
                        <Icon className="w-6 h-6 text-[hsl(145_63%_32%)]" />
                      </div>
                      {/* <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        ISO-DOC
                      </span> */}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {policy.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {policy.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Updated</span>
                      <span className="font-semibold text-foreground">{policy.updated}</span>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={policy.file}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(145_63%_32%)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[hsl(145_63%_28%)]"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <a
                        href={policy.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-[hsl(145_63%_32%)] hover:text-[hsl(145_63%_32%)]"
                      >
                        View Online
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Support */}
        <section className="max-w-7xl mx-auto px-6 pb-16 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(145_63%_32%)]">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Governance & Compliance Support
                  </h3>
                  <p className="text-muted-foreground">
                    Request clarifications, audit artifacts, or controlled document access through our compliance team.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:governance@company.com"
                  className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[hsl(145_63%_32%)] hover:text-[hsl(145_63%_32%)]"
                >
                  governance@company.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="rounded-lg bg-[hsl(145_63%_32%)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[hsl(145_63%_28%)]"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GovernancePolicies;


