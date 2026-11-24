import Image from "next/image";

/** Fond photo assombri pour sections sombres, avec un lent zoom (« Ken Burns »). */
export function PhotoBackdrop({ src }: Readonly<{ src: string }>) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <Image src={src} alt="" fill sizes="100vw" className="animate-kenburns object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-tt-navy via-tt-navy/90 to-tt-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-tt-navy via-transparent to-tt-navy/60" />
    </div>
  );
}
