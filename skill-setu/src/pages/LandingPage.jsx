import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import IgotMetricsBar from '../components/IgotMetricsBar';
import CompetencyDomains from '../components/CompetencyDomains';
import RuleToRoleSection from '../components/RuleToRoleSection';
import KarmayogiHubs from '../components/KarmayogiHubs';
import HowItWorks from '../components/HowItWorks';
import IntegrationSection from '../components/IntegrationSection';
import DashboardPreview from '../components/DashboardPreview';

function ScrollReveal({ children, id, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ onGetStarted, onOpenAdmin, onExploreDashboard }) {
  return (
    <>
      <Hero onGetStarted={onGetStarted} onOpenAdmin={onOpenAdmin} />
      <ScrollReveal><IgotMetricsBar /></ScrollReveal>
      <ScrollReveal id="competencies"><CompetencyDomains /></ScrollReveal>
      <ScrollReveal><RuleToRoleSection /></ScrollReveal>
      <ScrollReveal><KarmayogiHubs /></ScrollReveal>
      <ScrollReveal id="how-it-works"><HowItWorks /></ScrollReveal>
      <ScrollReveal><IntegrationSection /></ScrollReveal>
      <ScrollReveal><DashboardPreview onExplore={onExploreDashboard} /></ScrollReveal>
    </>
  );
}
