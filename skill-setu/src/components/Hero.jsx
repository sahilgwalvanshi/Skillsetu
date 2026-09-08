import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onGetStarted, onOpenAdmin }) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink">
      {/* Background Red Fort Image */}
      <img
        src="/images/red-fort.jpg"
        alt="The Red Fort, Delhi with Indian Tricolor Flag"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark Scrim: Left-to-right gradient for crisp text legibility, leaving Red Fort & Flag crystal clear on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-10">
        <div className="max-w-xl space-y-6">
          <h1 className="font-display text-4xl leading-[1.1] text-parchment sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Bridging the skill gap in India's statistical workforce.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-parchment/80 md:text-lg">
            Skill Setu maps every officer's competencies against their role, finds the gaps, and points to the exact course on iGOT Karmayogi that closes them.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onGetStarted}
              className="btn-liquid-glass px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-xl flex items-center space-x-2"
            >
              <span>Sign in as officer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAdmin || onGetStarted}
              className="rounded-full border border-parchment/30 px-7 py-3.5 text-sm font-semibold text-parchment transition-colors hover:border-parchment hover:bg-white/10"
            >
              View admin console
            </button>
          </div>
        </div>

        {/* Bottom Stats Row - Crisp white text over dark scrim */}
        <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-parchment/20 pt-8">
          <div>
            <dt className="font-display text-3xl text-parchment md:text-4xl font-semibold">
              27
            </dt>
            <dd className="mt-1 text-xs sm:text-sm text-parchment/70 font-sans font-medium">
              skills tracked
            </dd>
          </div>
          <div>
            <dt className="font-display text-3xl text-parchment md:text-4xl font-semibold">
              4
            </dt>
            <dd className="mt-1 text-xs sm:text-sm text-parchment/70 font-sans font-medium">
              competency domains
            </dd>
          </div>
          <div>
            <dt className="font-display text-3xl text-parchment md:text-4xl font-semibold">
              2
            </dt>
            <dd className="mt-1 text-xs sm:text-sm text-parchment/70 font-sans font-medium">
              training sources, iGOT &amp; NSSTA
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
