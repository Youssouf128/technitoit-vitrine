import Link from "next/link";

/**
 * Texte enrichi minimal : « **gras** » et « [libellé](/lien) ».
 * Sans état ni effet : utilisable côté serveur comme côté client.
 */
export function RichText({ text, strongClassName = "font-semibold text-tt-blue" }: Readonly<{ text: string; strongClassName?: string }>) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <strong key={i} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          return (
            <Link key={i} href={link[2]} className="font-semibold text-tt-orange underline-offset-4 hover:underline">
              {link[1]}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}
