import { QuoteConfigurator } from "@/components/home/QuoteConfigurator";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** Bloc « devis gratuit » réutilisable en bas des pages internes. */
export function QuoteSection() {
  return (
    <section aria-labelledby="quote-title" className="bg-tt-grey-bg py-20">
      <div className="content-container flex flex-col items-center gap-14">
        <SectionTitle id="quote-title" light="votre projet" bold="devis gratuit" inlineOnDesktop />
        <div id="configurator-anchor" className="flex w-full scroll-mt-32 justify-center">
          <QuoteConfigurator />
        </div>
      </div>
    </section>
  );
}
