import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 28 29" fill="none" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="m25.794 28.128-9.54-9.54a9.23 9.23 0 0 1-5.754 1.969q-4.126 0-6.984-2.86Q.66 14.84.657 10.715q0-4.126 2.86-6.984Q6.374.873 10.5.871q4.127 0 6.985 2.86 2.86 2.858 2.858 6.983 0 1.665-.53 3.142a9 9 0 0 1-1.439 2.612l9.54 9.54zM10.5 17.528q2.84 0 4.828-1.986 1.988-1.987 1.986-4.828 0-2.84-1.986-4.826Q13.34 3.9 10.5 3.9q-2.839 0-4.826 1.988t-1.988 4.826q0 2.84 1.988 4.827 1.988 1.989 4.826 1.987"
    />
  </svg>
);

export const LocationIcon = (p: P) => (
  <svg viewBox="0 0 29 34" fill="none" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M14.5 16.864q1.495 0 2.56-.983 1.065-.984 1.065-2.365 0-1.38-1.065-2.365-1.065-.983-2.56-.983t-2.56.983-1.065 2.365 1.065 2.365q1.065.983 2.56.983m0 12.305q5.528-4.687 8.202-8.517 2.673-3.83 2.673-6.801 0-4.562-3.15-7.47-3.148-2.91-7.725-2.91-4.576 0-7.726 2.91-3.15 2.908-3.149 7.47 0 2.97 2.673 6.801 2.675 3.83 8.202 8.517m0 4.437Q7.204 27.87 3.602 22.954 0 18.036 0 13.85 0 7.573 4.373 3.848 8.745.123 14.5.123t10.127 3.725Q29 7.573 29 13.851q0 4.185-3.602 9.103Q21.795 27.87 14.5 33.606"
    />
  </svg>
);

/** Petit « point » orange en forme de trapèze, signature graphique du site. */
export const DotIcon = (p: P) => (
  <svg viewBox="0 0 7 7" fill="none" aria-hidden {...p}>
    <path fill="currentColor" d="M6.222 0 0 .53V7l6.222-.545z" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden {...p}>
    <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BurgerIcon = (p: P) => (
  <svg viewBox="0 0 28 20" fill="none" aria-hidden {...p}>
    <path d="M1 1h26M1 10h26M1 19h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg viewBox="0 0 8 18" fill="none" aria-hidden {...p}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="m1 17 5.342-6.586c.631-.778.631-2.05 0-2.828L1 1"
    />
  </svg>
);

export const ChevronLeftThin = (p: P) => (
  <svg viewBox="0 0 11.039 25" fill="none" aria-hidden {...p}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      d="m9.54 23.5-7.346-9.055c-.868-1.07-.868-2.82 0-3.89L9.539 1.5"
    />
  </svg>
);

/** Longue flèche fine (pagination carrousels / liens « En voir plus »). */
export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden {...p}>
    <g transform="matrix(0.44551926,0,0,0.44551926,0,9.432163)">
      <path d="M 0,23.7158 H 88.35" stroke="currentColor" strokeMiterlimit="10" />
      <path
        d="M 65.0328,1 76.6914,12.3538 88.3501,23.7162 76.6914,35.0785 65.0328,46.4408"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </g>
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="m5.825 21 1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625 7.2.625-5.45 4.725L18.175 21 12 17.275z" />
  </svg>
);

export const QuoteIcon = (p: P) => (
  <svg viewBox="0 0 63 50" fill="none" aria-hidden {...p}>
    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      <path d="M58.84 50H40.717c-2.293 0-4.16-1.866-4.16-4.135v-18.01c0-.515.092-.999.264-1.453.061-.182.142-.363.254-.545.05-.09.101-.181.162-.272L52.02 1.402C52.823.08 54.528-.403 55.867.372l3.724 2.129c1.34.776 1.673 2.43 1.024 3.832L52.67 23.72h6.17c2.283 0 4.16 1.856 4.16 4.135v18.011C63 48.135 61.123 50 58.84 50M22.32 50H4.198c-2.283 0-4.16-1.866-4.16-4.135v-18.01a4.06 4.06 0 0 1 .517-1.998h.01c.052-.09.102-.181.163-.272L15.502 1.402C16.313.08 18.018-.403 19.357.372l3.714 2.129c1.35.776 1.674 2.43 1.035 3.832L16.151 23.72h6.17c2.293 0 4.16 1.856 4.16 4.135v18.011c0 2.27-1.867 4.135-4.16 4.135" />
    </g>
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SOCIAL_PATHS: Record<string, { viewBox: string; d: string }> = {
  facebook: {
    viewBox: "0 0 24 24",
    d: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z",
  },
  instagram: {
    viewBox: "0 0 24 24",
    d: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3",
  },
  x: {
    viewBox: "0 0 16 16",
    d: "M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z",
  },
  youtube: {
    viewBox: "0 0 24 24",
    d: "m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    d: "M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z",
  },
  pinterest: {
    viewBox: "0 0 384 512",
    d: "M204 6.5C101.4 6.5 0 74.9 0 185.6C0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4c0-9.3-23.7-29.1-23.7-67.8c0-80.4 61.2-137.4 140.4-137.4c68.1 0 118.5 38.7 118.5 109.8c0 53.1-21.3 152.7-90.3 152.7c-24.9 0-46.2-18-46.2-43.8c0-37.8 26.4-74.4 26.4-113.4c0-66.2-93.9-54.2-93.9 25.8c0 16.8 2.1 35.4 9.6 50.7c-13.8 59.4-42 147.9-42 209.1c0 18.9 2.7 37.5 4.5 56.4c3.4 3.8 1.7 3.4 6.9 1.5c50.4-69 48.6-82.5 71.4-172.8c12.3 23.4 44.1 36 69.3 36c106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5",
  },
};

export function SocialIcon({ name, ...p }: P & { name: string }) {
  const icon = SOCIAL_PATHS[name];
  if (!icon) return null;
  return (
    <svg viewBox={icon.viewBox} aria-hidden {...p}>
      <path fill="currentColor" d={icon.d} />
    </svg>
  );
}
