"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";
import { CMS_HEADER_VARIANTS } from "@/data/cms-routes";
import { MOBILE_LINKS, NAVIGATION, POPULAR_SEARCHES, PRESTATIONS, type NavCategory } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, BurgerIcon, ChevronLeftThin, ChevronRight, CloseIcon, LocationIcon, SearchIcon } from "@/components/ui/icons";

const STICKY_THRESHOLD = 120;

const imageFor = (href: string) => PRESTATIONS.find((p) => p.href === href);
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  // Variantes du site d'origine : transparent sur un hero photo, « white » (texte foncé sans fond) sur les articles,
  // et barre blanche fixe partout ailleurs (ou dès qu'on scrolle).
  const variant: "transparent" | "white" | "solid" =
    pathname === "/" || pathname === "/actualites"
      ? "transparent"
      : pathname.startsWith("/actualites/")
        ? "white"
        : (CMS_HEADER_VARIANTS[pathname] ?? "solid");

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [drawerSub, setDrawerSub] = useState<NavCategory | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > STICKY_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll de la page quand un tiroir mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = drawerOpen || mobileSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, mobileSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function closeAll() {
    setActiveMenu(null);
    setSearchOpen(false);
    setDrawerOpen(false);
    setMobileSearchOpen(false);
    setDrawerSub(null);
  }

  function goSearch(q: string) {
    closeAll();
    router.push(`/recherche?q=${encodeURIComponent(q)}`);
  }

  function onSubmitSearch(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    if (q) goSearch(q);
  }

  const sticky = scrolled || variant === "solid";
  const panelOpen = activeMenu !== null || searchOpen;
  const solid = sticky || panelOpen || variant === "white"; // logo orange + texte bleu
  const ink = solid ? "text-tt-blue" : "text-white";
  const pillHover = solid ? "hover:bg-tt-stone" : "hover:bg-white/10";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Espace réservé pour les pages sans hero plein écran */}
      {variant === "solid" && <div className="h-16 lg:h-[76px]" aria-hidden />}

      <header
        className={[
          "left-0 top-0 z-[60] w-full transition-[background-color,box-shadow,border-color] duration-300",
          sticky
            ? "fixed h-16 border-b border-tt-line/80 bg-white/90 backdrop-blur-xl lg:h-[76px]"
            : "absolute h-16 lg:h-[88px]",
          !sticky && panelOpen ? "lg:bg-white" : "",
          // Voile dégradé pour la lisibilité du menu blanc sur les photos
          !solid
            ? "lg:before:pointer-events-none lg:before:absolute lg:before:inset-x-0 lg:before:top-0 lg:before:-z-10 lg:before:h-36 lg:before:bg-gradient-to-b lg:before:from-tt-navy/60 lg:before:to-transparent"
            : "",
          scrolled && variant !== "solid" ? "animate-[fade-in_0.3s_ease-out]" : "",
        ].join(" ")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Barre mobile */}
        <div className="flex h-16 items-center gap-1.5 border-b border-tt-line bg-white/95 px-4 backdrop-blur-xl sm:gap-2 sm:px-6 lg:hidden">
          <Link href="/" aria-label="Technitoit - accueil" onClick={closeAll} className="mr-auto">
            <Logo className="w-28 text-tt-orange sm:w-32" />
          </Link>
          <Link
            href="/agence"
            aria-label="Trouver mon agence"
            className="grid size-10 place-items-center rounded-full text-tt-blue transition-colors hover:bg-tt-stone"
          >
            <LocationIcon className="h-5" />
          </Link>
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setMobileSearchOpen(true)}
            className="grid size-10 place-items-center rounded-full text-tt-blue transition-colors hover:bg-tt-stone"
          >
            <SearchIcon className="h-[18px]" />
          </button>
          <Link
            href="/devis-gratuit"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-tt-orange px-4 text-sm font-bold text-white transition-colors hover:bg-tt-orange-dark"
          >
            Devis<span className="hidden sm:inline">&nbsp;gratuit</span>
          </Link>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setDrawerOpen(true)}
            className="grid size-10 place-items-center rounded-full text-tt-blue transition-colors hover:bg-tt-stone"
          >
            <BurgerIcon className="h-3.5" />
          </button>
        </div>

        {/* Barre desktop */}
        <div className="content-container hidden h-full items-center gap-6 lg:flex">
          <Link href="/" aria-label="Technitoit - accueil" onClick={closeAll} className="shrink-0">
            <Logo className={`w-36 transition-colors xl:w-40 ${solid ? "text-tt-orange" : "text-white"}`} />
          </Link>

          <nav aria-label="Navigation principale" className="mx-auto h-full">
            <ul className="flex h-full items-center gap-1 xl:gap-2">
              {NAVIGATION.map((cat) => {
                const open = activeMenu === cat.label;
                const current = isActive(cat.href);
                const featured = imageFor(cat.href);
                return (
                  <li
                    key={cat.label}
                    className="flex h-full items-center"
                    onMouseEnter={() => {
                      setSearchOpen(false);
                      setActiveMenu(cat.label);
                    }}
                    onFocus={() => setActiveMenu(cat.label)}
                  >
                    <Link
                      href={cat.href}
                      onClick={closeAll}
                      aria-expanded={open}
                      aria-current={current ? "page" : undefined}
                      className={`relative flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold transition-colors ${ink} ${pillHover} ${
                        open ? (solid ? "bg-tt-stone" : "bg-white/10") : ""
                      }`}
                    >
                      {capitalize(cat.label)}
                      <svg viewBox="0 0 12 12" aria-hidden className={`size-2.5 opacity-60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                        <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {current && <span aria-hidden className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-tt-orange" />}
                    </Link>

                    {/* Méga-menu */}
                    <div
                      className={`absolute left-0 right-0 top-full transition-all duration-300 ${
                        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="content-container pt-2">
                        <div className="flex gap-8 rounded-3xl border border-tt-line bg-white p-4 shadow-lift">
                          {featured && (
                            <Link
                              href={cat.href}
                              onClick={closeAll}
                              tabIndex={open ? 0 : -1}
                              className="group/feat relative isolate flex w-72 shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-6 text-white"
                            >
                              <Image
                                src={featured.image}
                                alt=""
                                fill
                                sizes="288px"
                                className="-z-20 object-cover transition-transform duration-700 group-hover/feat:scale-105"
                              />
                              <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-tt-navy via-tt-navy/50 to-transparent" />
                              <span className="text-xs font-bold uppercase tracking-[.18em] text-tt-orange-light">Nos prestations</span>
                              <span className="mt-1 text-2xl font-extrabold">{featured.title}</span>
                              <span className="mt-1 text-sm text-white/75">{featured.short}</span>
                              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                                Tout savoir
                                <ArrowIcon className="size-4 transition-transform group-hover/feat:translate-x-1" />
                              </span>
                            </Link>
                          )}
                          <ul className="grid flex-1 grid-cols-3 content-start gap-1 py-4 pr-4">
                            {cat.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={closeAll}
                                  tabIndex={open ? 0 : -1}
                                  className={`group/l flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors hover:bg-tt-stone hover:text-tt-orange ${
                                    pathname === l.href ? "bg-tt-orange-soft text-tt-orange" : "text-tt-blue"
                                  }`}
                                >
                                  {l.label}
                                  <ArrowIcon className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/l:translate-x-0 group-hover/l:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/agence"
              onClick={closeAll}
              className={`flex h-10 items-center gap-2 rounded-full px-3 text-[15px] font-semibold transition-colors ${ink} ${pillHover}`}
            >
              <LocationIcon className="h-[18px]" />
              <span className="hidden xl:inline">Nos agences</span>
            </Link>
            <button
              type="button"
              aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
              aria-expanded={searchOpen}
              onClick={() => {
                setActiveMenu(null);
                setSearchOpen((v) => !v);
              }}
              className={`grid size-10 place-items-center rounded-full transition-colors ${ink} ${pillHover}`}
            >
              {searchOpen ? <CloseIcon className="h-3.5" /> : <SearchIcon className="h-[18px]" />}
            </button>
            <Link
              href="/devis-gratuit"
              onClick={closeAll}
              className="ml-2 inline-flex h-11 items-center rounded-full bg-tt-orange px-6 text-[15px] font-bold text-white shadow-glow transition-colors hover:bg-tt-orange-dark"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Panneau de recherche desktop */}
          <div
            className={`absolute left-0 right-0 top-full transition-all duration-300 ${
              searchOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
            }`}
          >
            <div className="content-container pt-2">
              <search className="block rounded-3xl border border-tt-line bg-white px-10 pb-10 pt-8 shadow-lift">
                <form onSubmit={onSubmitSearch} className="mx-auto flex w-full max-w-[840px] flex-col gap-8">
                  <label className="flex h-16 w-full items-center gap-4 rounded-full border border-tt-line bg-tt-stone px-6 transition focus-within:border-tt-orange focus-within:bg-white focus-within:ring-4 focus-within:ring-tt-orange/15">
                    <SearchIcon className="size-5 shrink-0 text-tt-muted" />
                    <span className="sr-only">Que recherchez-vous ?</span>
                    <input
                      name="q"
                      type="text"
                      tabIndex={searchOpen ? 0 : -1}
                      placeholder="Que recherchez-vous ?"
                      className="h-full flex-1 bg-transparent text-lg outline-none placeholder:text-tt-grey-medium"
                    />
                  </label>
                  <div className="w-full">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-tt-muted">Recherches populaires</p>
                    <ul className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            tabIndex={searchOpen ? 0 : -1}
                            onClick={() => goSearch(s)}
                            className="rounded-full border border-tt-line px-4 py-2 text-sm font-medium transition-colors hover:border-tt-orange hover:bg-tt-orange hover:text-white"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
              </search>
            </div>
          </div>
        </div>
      </header>

      {/* Voile sombre derrière les menus */}
      <div
        aria-hidden
        onClick={closeAll}
        className={`fixed inset-0 z-[59] bg-tt-navy/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          panelOpen || drawerOpen || mobileSearchOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Tiroir de navigation mobile */}
      <aside
        aria-label="Menu mobile"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
        className={`fixed right-0 top-0 z-[61] flex h-dvh w-[22rem] max-w-full overflow-x-hidden bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`flex w-full shrink-0 flex-col overflow-y-auto px-5 pb-8 pt-5 transition-transform duration-300 ${
            drawerSub ? "-translate-x-full" : ""
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" onClick={closeAll} aria-label="Accueil">
              <Logo className="w-32 text-tt-orange" />
            </Link>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={closeAll}
              className="grid size-10 place-items-center rounded-full bg-tt-stone text-tt-blue"
            >
              <CloseIcon className="h-3.5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {NAVIGATION.map((cat) => {
              const featured = imageFor(cat.href);
              return (
                <li key={cat.label}>
                  <button
                    type="button"
                    onClick={() => setDrawerSub(cat)}
                    className="flex w-full items-center gap-4 rounded-2xl p-2 text-left transition-colors hover:bg-tt-stone"
                  >
                    {featured && (
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                        <Image src={featured.image} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                    )}
                    <span className="flex-1 text-lg font-bold text-tt-blue">{capitalize(cat.label)}</span>
                    <ChevronRight className="mr-2 h-3.5 text-tt-muted" />
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className="mt-6 flex flex-col border-t border-tt-line pt-4">
            {MOBILE_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} onClick={closeAll} className="block rounded-xl px-3 py-2.5 font-semibold text-tt-blue hover:bg-tt-stone">
                  {capitalize(l.label.toLowerCase())}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-3xl bg-tt-navy p-6 text-white">
            <p className="text-lg font-bold">Besoin de conseils pour votre projet ?</p>
            <p className="mt-1 text-sm text-white/60">Un conseiller vous recontacte gratuitement.</p>
            <Link
              href="/devis-gratuit"
              onClick={closeAll}
              className="mt-5 flex h-12 items-center justify-center rounded-full bg-tt-orange font-bold text-white transition-colors hover:bg-tt-orange-dark"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>

        <div
          className={`w-full shrink-0 overflow-y-auto px-5 pb-10 pt-5 transition-transform duration-300 ${
            drawerSub ? "-translate-x-full" : ""
          }`}
        >
          {drawerSub && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDrawerSub(null)}
                  className="flex h-10 items-center gap-2.5 rounded-full bg-tt-stone px-4 text-sm font-semibold text-tt-blue"
                >
                  <ChevronLeftThin className="h-4" />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={closeAll}
                  className="grid size-10 place-items-center rounded-full bg-tt-stone text-tt-blue"
                >
                  <CloseIcon className="h-3.5" />
                </button>
              </div>
              <Link
                href={drawerSub.href}
                onClick={closeAll}
                className="group mb-4 flex items-center justify-between rounded-2xl bg-tt-orange-soft px-4 py-4 text-2xl font-extrabold text-tt-blue"
              >
                {capitalize(drawerSub.label)}
                <ArrowIcon className="size-5 text-tt-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <ul className="flex flex-col">
                {drawerSub.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={closeAll}
                      className="block rounded-xl px-4 py-3 font-medium text-tt-blue hover:bg-tt-stone hover:text-tt-orange"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </aside>

      {/* Tiroir de recherche mobile */}
      <aside
        aria-label="Recherche"
        aria-hidden={!mobileSearchOpen}
        inert={!mobileSearchOpen}
        className={`fixed right-0 top-0 z-[61] h-dvh w-[22rem] max-w-full overflow-y-auto bg-white px-5 pt-5 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            aria-label="Fermer la recherche"
            onClick={closeAll}
            className="grid size-10 place-items-center rounded-full bg-tt-stone text-tt-blue"
          >
            <CloseIcon className="h-3.5" />
          </button>
        </div>
        <search>
          <form onSubmit={onSubmitSearch}>
            <label className="mb-8 flex h-14 items-center gap-3 rounded-full border border-tt-line bg-tt-stone px-5 focus-within:border-tt-orange focus-within:bg-white">
              <SearchIcon className="size-5 shrink-0 text-tt-muted" />
              <span className="sr-only">Rechercher</span>
              <input name="q" type="text" placeholder="Rechercher" className="h-full w-full bg-transparent text-lg outline-none" />
            </label>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-tt-muted">Recherches populaires</p>
            <ul className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => goSearch(s)}
                    className="rounded-full border border-tt-line px-4 py-2 text-sm font-medium hover:border-tt-orange hover:text-tt-orange"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </form>
        </search>
      </aside>
    </>
  );
}
