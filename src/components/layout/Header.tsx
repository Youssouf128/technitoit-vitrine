"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";
import { CMS_HEADER_VARIANTS } from "@/data/cms-routes";
import { MOBILE_LINKS, NAVIGATION, POPULAR_SEARCHES, type NavCategory } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { BurgerIcon, ChevronLeftThin, ChevronRight, CloseIcon, DotIcon, LocationIcon, SearchIcon } from "@/components/ui/icons";

const STICKY_THRESHOLD = 180;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

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

  return (
    <>
      {/* Espace réservé pour les pages sans hero plein écran */}
      {variant === "solid" && <div className="h-20 lg:h-[111px]" aria-hidden />}

      <header
        className={[
          "left-0 top-0 z-[60] w-full transition-[background-color,height,padding] duration-300",
          sticky
            ? "fixed h-20 border-b border-tt-grey-light bg-white lg:h-[111px]"
            : "absolute h-20 lg:h-[178px] lg:pt-12 2xl:pt-16",
          !sticky && panelOpen ? "lg:bg-white" : "",
          scrolled && variant !== "solid" ? "animate-[fade-in_0.3s_ease-out]" : "",
        ].join(" ")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Barre mobile */}
        <div className="flex h-20 items-center gap-2 border-b border-tt-grey-light bg-white px-4 sm:gap-3 sm:px-8 lg:hidden">
          <Link href="/" aria-label="Technitoit - accueil" onClick={closeAll} className="mr-auto">
            <Logo className="w-28 text-tt-orange sm:w-36" />
          </Link>
          <Link href="/agence" aria-label="Trouver mon agence" className="p-1 text-tt-blue hover:text-tt-orange">
            <LocationIcon className="h-6 sm:h-[26px]" />
          </Link>
          <Link href="/devis-gratuit" className="bg-tt-orange px-3 py-2 text-base font-bold text-white sm:px-4 sm:text-lg">
            Devis
          </Link>
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setMobileSearchOpen(true)}
            className="bg-tt-beige/60 p-2 text-tt-blue sm:p-2.5"
          >
            <SearchIcon className="h-5 sm:h-[22px]" />
          </button>
          <button type="button" aria-label="Ouvrir le menu" onClick={() => setDrawerOpen(true)} className="p-1 text-tt-blue">
            <BurgerIcon className="h-5" />
          </button>
        </div>

        {/* Barre desktop */}
        <div
          className={[
            "mx-auto hidden h-full max-w-screen-xl items-center px-8 lg:flex xl:px-0 2xl:max-w-[1536px]",
            sticky ? "" : "border-b",
            sticky ? "" : solid ? "border-tt-beige-dark" : "border-transparent",
          ].join(" ")}
        >
          <Link href="/" aria-label="Technitoit - accueil" onClick={closeAll} className="inline-block">
            <Logo
              className={`w-44 transition-all ${sticky ? "xl:w-52 2xl:w-[237px]" : "xl:w-64"} ${solid ? "text-tt-orange" : "text-white"}`}
            />
          </Link>

          <nav aria-label="Navigation principale" className="mx-auto h-full">
            <ul className="flex h-full gap-6 xl:gap-8">
              {NAVIGATION.map((cat) => {
                const open = activeMenu === cat.label;
                return (
                  <li
                    key={cat.label}
                    className="group flex items-center"
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
                      className={`text-xl font-bold transition-colors xl:text-2xl 2xl:text-[29px] ${
                        solid ? "text-tt-blue" : "text-white"
                      }`}
                    >
                      {cat.label}
                      <DotIcon
                        className={`ml-[3px] inline-block h-[5px] align-baseline transition-colors xl:h-[7px] ${
                          open ? "text-tt-orange" : "group-hover:text-tt-orange"
                        }`}
                      />
                    </Link>

                    {/* Méga-menu */}
                    <div
                      className={`absolute left-0 right-0 top-full overflow-hidden bg-white transition-[max-height] duration-300 ${
                        open ? "max-h-[100vh] shadow-[0_20px_30px_-20px_rgba(0,0,0,0.25)]" : "max-h-0"
                      }`}
                    >
                      <div
                        className={`flex justify-center gap-20 pb-24 pt-10 transition-all ${
                          open ? "translate-y-0 opacity-100 delay-150 duration-300" : "-translate-y-2.5 opacity-0 duration-100"
                        }`}
                      >
                        {chunk(cat.links, 5).map((col, i) => (
                          <ul key={i} className="flex min-w-[250px] flex-col gap-3">
                            {col.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={closeAll}
                                  tabIndex={open ? 0 : -1}
                                  className="text-lg text-tt-blue transition-colors hover:text-tt-orange"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex h-full items-center">
            <Link href="/agence" className="group/loc flex items-center gap-2.5" onClick={closeAll}>
              <LocationIcon
                className={`h-7 transition-colors group-hover/loc:text-tt-orange 2xl:h-[33px] ${solid ? "text-tt-blue" : "text-white"}`}
              />
              <span className={`hidden flex-col leading-none 2xl:flex ${solid ? "text-tt-blue" : "text-white"}`}>
                <span>TROUVER</span>
                <span className="font-bold">MON AGENCE</span>
              </span>
            </Link>

            <div className="ml-8 flex items-stretch self-center">
              <Link
                href="/devis-gratuit"
                onClick={closeAll}
                className="bg-tt-orange px-6 py-2 text-lg font-bold leading-7 text-white transition-colors hover:bg-tt-orange/90 2xl:px-8 2xl:py-3 2xl:text-xl"
              >
                Devis
              </Link>
              <button
                type="button"
                aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
                aria-expanded={searchOpen}
                onClick={() => {
                  setActiveMenu(null);
                  setSearchOpen((v) => !v);
                }}
                className={`px-4 transition-colors ${solid ? "bg-tt-beige/60 text-tt-blue" : "bg-white/20 text-white"}`}
              >
                {searchOpen ? <CloseIcon className="h-5" /> : <SearchIcon className="h-6 2xl:h-[27px]" />}
              </button>
            </div>
          </div>

          {/* Panneau de recherche desktop */}
          <div
            className={`absolute left-0 right-0 top-full overflow-hidden bg-white transition-[max-height] duration-300 ${
              searchOpen ? "max-h-[100vh] shadow-[0_20px_30px_-20px_rgba(0,0,0,0.25)]" : "max-h-0"
            }`}
          >
            <search className="block px-8 pb-24 pt-10">
              <form onSubmit={onSubmitSearch} className="mx-auto flex w-full max-w-[840px] flex-col items-center gap-12">
                <label className="flex w-full items-center gap-7">
                  <SearchIcon className="size-6 shrink-0 text-tt-blue" />
                  <span className="sr-only">Que recherchez-vous ?</span>
                  <input
                    name="q"
                    type="text"
                    tabIndex={searchOpen ? 0 : -1}
                    placeholder="Que recherchez-vous ?"
                    className="h-13 flex-1 border-b-[0.75px] border-tt-blue text-xl outline-none placeholder:text-tt-grey-medium"
                  />
                </label>
                <div className="w-full">
                  <p className="mb-4 text-tt-grey-medium">Recherches populaires</p>
                  <ul className="grid grid-cols-3 gap-y-4">
                    {POPULAR_SEARCHES.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          tabIndex={searchOpen ? 0 : -1}
                          onClick={() => goSearch(s)}
                          className="transition-colors hover:text-tt-orange"
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
      </header>

      {/* Voile sombre derrière les menus */}
      <div
        aria-hidden
        onClick={closeAll}
        className={`fixed inset-0 z-[59] bg-[#11111159] transition-opacity duration-300 ${
          panelOpen || drawerOpen || mobileSearchOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Tiroir de navigation mobile */}
      <aside
        aria-label="Menu mobile"
        aria-hidden={!drawerOpen}
        className={`fixed right-0 top-0 z-[61] flex h-dvh w-80 max-w-full overflow-x-hidden bg-white transition-transform duration-300 lg:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`w-full shrink-0 overflow-y-auto pt-8 transition-transform duration-300 ${
            drawerSub ? "-translate-x-full" : ""
          }`}
        >
          <div className="mx-6 mb-4 flex items-center justify-between pr-5">
            <Link href="/" onClick={closeAll} aria-label="Accueil">
              <Logo className="w-36 text-tt-orange" />
            </Link>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={closeAll}
              className="rounded-full p-1 text-tt-blue hover:bg-tt-grey-light/50"
            >
              <CloseIcon className="h-4" />
            </button>
          </div>
          <div className="mb-6 ml-6 mr-12 h-px bg-tt-beige-dark" />
          <div className="mb-12 flex flex-col gap-3">
            {NAVIGATION.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setDrawerSub(cat)}
                className="flex items-center justify-between pl-5 pr-12 text-[35px] font-bold text-tt-blue"
              >
                <span>{cat.label}</span>
                <ChevronRight className="h-4" />
              </button>
            ))}
          </div>
          <ul className="mb-8 flex flex-col gap-1">
            {MOBILE_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} onClick={closeAll} className="block pl-5 text-sm tracking-[.2em] text-tt-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-10 ml-5 mr-12 h-px bg-tt-beige" />
          <p className="mb-4 text-center font-light">Besoin de conseils pour votre projet ?</p>
          <Link
            href="/devis-gratuit"
            onClick={closeAll}
            className="mx-5 mb-10 block bg-tt-orange py-3 text-center text-lg font-bold text-white"
          >
            devis gratuit
          </Link>
        </div>

        <div
          className={`w-full shrink-0 overflow-y-auto pt-9 transition-transform duration-300 ${
            drawerSub ? "-translate-x-full" : ""
          }`}
        >
          {drawerSub && (
            <>
              <div className="mx-6 mb-4 flex items-center justify-between pr-5">
                <button
                  type="button"
                  onClick={() => setDrawerSub(null)}
                  className="flex items-center gap-2.5 text-tt-blue"
                >
                  <ChevronLeftThin className="h-5" />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={closeAll}
                  className="rounded-full p-1 text-tt-blue hover:bg-tt-grey-light/50"
                >
                  <CloseIcon className="h-4" />
                </button>
              </div>
              <div className="mb-6 ml-6 mr-12 h-px bg-tt-beige-dark" />
              <Link
                href={drawerSub.href}
                onClick={closeAll}
                className="mb-6 block pl-5 text-[35px] font-bold text-tt-blue"
              >
                {drawerSub.label}
                <span className="text-tt-orange">.</span>
              </Link>
              <ul className="flex flex-col gap-4 pb-10 pl-5 pr-8">
                {drawerSub.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={closeAll} className="text-lg text-tt-blue hover:text-tt-orange">
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
        className={`fixed right-0 top-0 z-[61] h-dvh w-80 max-w-full overflow-y-auto bg-white pl-6 pt-8 transition-transform duration-300 lg:hidden ${
          mobileSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-11 flex justify-end pr-11">
          <button
            type="button"
            aria-label="Fermer la recherche"
            onClick={closeAll}
            className="rounded-full p-1 text-tt-blue hover:bg-tt-grey-light/50"
          >
            <CloseIcon className="h-4" />
          </button>
        </div>
        <search>
          <form onSubmit={onSubmitSearch}>
            <label className="mb-10 flex items-center gap-3 pr-12">
              <SearchIcon className="size-6 shrink-0" />
              <span className="sr-only">Rechercher</span>
              <input
                name="q"
                type="text"
                placeholder="Rechercher"
                className="h-13 w-full border-b-[0.75px] border-tt-blue text-xl outline-none"
              />
            </label>
            <p className="mb-4 text-tt-grey-medium">Recherches populaires</p>
            <ul className="flex flex-col gap-2 text-xl">
              {POPULAR_SEARCHES.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => goSearch(s)} className="text-left">
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
