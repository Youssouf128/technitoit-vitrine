import Link from "next/link";
import { departments } from "@/data/france-map";
import { DEPARTMENT_NAMES } from "@/data/departments";

/** Carte SVG des départements : chaque département couvert renvoie vers sa page. */
export function FranceMap() {
  return (
    <svg
      className="tt-agencies-map h-auto w-full"
      viewBox="0 0 574.407 571.155"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte de France des départements couverts par une agence Technitoit"
    >
      <g transform="translate(-562.786 -113.316)">
        {departments.map((dep) => {
          const path = (
            <path
              d={dep.d}
              transform={dep.t}
              fill="#DFD8CD"
              stroke="#fff"
              strokeWidth={1}
              data-name={dep.n}
            />
          );
          return dep.href ? (
            <Link key={dep.n} href={dep.href} aria-label={`Agences ${DEPARTMENT_NAMES[dep.n] ?? dep.n} (${dep.n})`}>
              <title>{`${DEPARTMENT_NAMES[dep.n] ?? dep.n} (${dep.n})`}</title>
              {path}
            </Link>
          ) : (
            <g key={dep.n}>{path}</g>
          );
        })}
      </g>
    </svg>
  );
}
