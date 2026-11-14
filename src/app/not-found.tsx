import Link from "next/link";

export default function NotFound() {
  return (
    <section className="content-container flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm tracking-[.25em] text-tt-orange">ERREUR 404</p>
      <h1 className="mt-4 text-5xl font-bold md:text-7xl">
        Page introuvable<span className="text-tt-orange">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-xl font-light">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/" className="btn-fill-orange px-6 py-3 font-bold">
          Retour à l&apos;accueil
        </Link>
        <Link href="/devis-gratuit" className="btn-outline-orange px-6 py-3">
          Demander un devis
        </Link>
      </div>
    </section>
  );
}
