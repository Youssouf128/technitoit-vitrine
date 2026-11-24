import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

/** Bouton d'action placé sous une grille. */
export function CenteredCta({ label, href = "#configurator-anchor" }: Readonly<{ label: string; href?: string }>) {
  return (
    <div className="mt-12 flex justify-center">
      <Link href={href} className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
        {label}
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
