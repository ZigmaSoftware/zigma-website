import React from 'react';
import { FileText, Shield, Lock, Users, ArrowUpRight } from 'lucide-react';
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
      description: 'Personal Data Protection compliance with strong governance and security controls.',
      updated: 'September 2025',
      file: Pdf4,
      icon: FileText,
      accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="scroll-pt-24 lg:scroll-pt-28">
        {/* Hero */}
        <section className="relative min-h-[100svh] box-border pt-20 overflow-hidden bg-[hsl(145_63%_32%)] text-white flex items-center scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Herobg})` }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          {/* <div className="relative container-main w-full pt-28 pb-20">
            <div className="max-w-4xl">
             
              <h2 className="mt-6 text-4xl sm:text-3xl lg:text-5xl font-semibold leading-tight">
                Governance & Compliance
                <span className="block text-white/90">Aligned to ISO Standards</span>
              </h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                We ensure transparent and responsible governance across all operations.</p>
            </div>
          </div> */}

          <div className="container-main relative grid items-center text-center">

            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium ">
              Governance & Policies
            </div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">
              Transparent & Responsible
            </h1>

            <p className="mt-6 text-lg max-w-2xl mx-auto text-white/80 leading-relaxed ">
              We uphold transparent processes, regulatory compliance, and accountable decision-making across all operations.

            </p>

          </div>

        </section>

        {/* Policies Grid */}
        <section className=" container-main section-padding">
          <div className="flex flex-col gap-3 mb-10 ">


            <div className="text-center">

              <p className="text-xs md:text-sm uppercase tracking-[0.35em]  text-muted-foreground">
                Governance Policy Library
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Compliance & Ethical <span className="text-primary">Framework</span>

              </h2>
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                Each document is reviewed on a defined cycle and versioned for audit traceability.

              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <article
                  key={policy.id}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${policy.accent}`} />
                  <div className=" p-6  flex h-full flex-col">
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center">
                        <Icon className="w-8 h-8 text-[hsl(145_63%_32%)]" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground text-center">
                      {policy.title}
                    </h3>
                    <p className="mt-3 text-md text-muted-foreground text-center">
                      {policy.description}
                    </p>


                    <div className="mt-auto pt-6 flex flex-col gap-3">

                      <a
                        href={policy.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-[hsl(145_63%_32%)] hover:text-[hsl(145_63%_32%)]"
                      >
                        View
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
};

export default GovernancePolicies;
