"use client";

/**
 * Bouton « CONSENTEMENT » du footer. Branchez ici votre CMP
 * (Didomi, Axeptio, Tarteaucitron…) pour rouvrir le panneau des préférences.
 */
export function ConsentButton() {
  return (
    <button
      type="button"
      className="transition-colors hover:text-tt-orange"
      onClick={() => {
        const w = window as unknown as { Didomi?: { preferences: { show: () => void } } };
        if (w.Didomi) w.Didomi.preferences.show();
        else window.dispatchEvent(new CustomEvent("tt:open-consent"));
      }}
    >
      CONSENTEMENT
    </button>
  );
}
