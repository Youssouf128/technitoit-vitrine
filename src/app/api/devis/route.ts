import { NextResponse } from "next/server";
import { validateQuote, type QuoteRequest } from "@/data/configurator";

export async function POST(request: Request) {
  let body: Partial<QuoteRequest>;
  try {
    body = (await request.json()) as Partial<QuoteRequest>;
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  const errors = validateQuote(body);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, errors, message: "Merci de corriger les champs indiqués." },
      { status: 422 },
    );
  }

  // TODO : brancher ici l'envoi vers le CRM / l'email de l'agence (HubSpot, Brevo, Resend…).
  console.info("[devis] nouvelle demande", {
    housing: body.housing,
    area: body.area,
    categories: body.categories,
    products: body.products,
    profile: body.profile,
    postalCode: body.postalCode,
  });

  return NextResponse.json({ ok: true, message: "Demande envoyée." });
}
