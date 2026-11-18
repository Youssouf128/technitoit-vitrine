import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute -right-40 top-0 -z-10 size-[480px] rounded-full bg-tt-orange/15 blur-[120px]" />
      <div className="content-container flex min-h-[70vh] flex-col items-start justify-center py-24">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-5 text-5xl font-extrabold md:text-7xl">Page introuvable</h1>
        <p className="mt-6 max-w-xl text-xl text-tt-muted">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-fill-orange px-7 py-3.5">
            Retour à l’accueil
          </Link>
          <Link href="/devis-gratuit" className="btn-outline-orange px-7 py-3.5">
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
