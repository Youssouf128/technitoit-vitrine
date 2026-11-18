import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Prestations } from "@/components/home/Prestations";
import { Experience } from "@/components/home/Experience";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { News } from "@/components/home/News";
import { Press } from "@/components/home/Press";
import { Agencies } from "@/components/home/Agencies";
import { FinalCta } from "@/components/home/FinalCta";
import { QuoteSection } from "@/components/layout/QuoteSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Prestations />
      <Experience />
      <Process />
      <QuoteSection />
      <Testimonials />
      <Press />
      <News />
      <Agencies />
      <FinalCta />
    </>
  );
}
