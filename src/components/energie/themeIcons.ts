import type { SVGProps } from "react";
import type { EnergyTheme } from "@/data/energie";
import { DropletIcon, FlameIcon, SunIcon, WindIcon } from "@/components/ui/icons";

/** Picto associé à chaque thème de la page /energie (utilisable côté serveur et client). */
export const THEME_ICONS: Record<EnergyTheme, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  chauffage: FlameIcon,
  solaire: SunIcon,
  air: WindIcon,
  eau: DropletIcon,
};
