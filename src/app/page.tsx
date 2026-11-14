import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
import { Prestations } from "@/components/home/Prestations";
import { News } from "@/components/home/News";
import { Press } from "@/components/home/Press";
import { Agencies } from "@/components/home/Agencies";
import { SocialSection } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Prestations />
      <News />
      <Press />
      <Agencies />
      <SocialSection />
    </>
  );
}
