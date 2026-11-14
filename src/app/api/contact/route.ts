import { NextResponse } from "next/server";
import { validateContact, type ContactRequest } from "@/data/contact";

export async function POST(request: Request) {
  let body: Partial<ContactRequest>;
  try {
    body = (await request.json()) as Partial<ContactRequest>;
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, message: "Merci de corriger les champs indiqués." }, { status: 422 });
  }

  // TODO : transmettre la demande au CRM / à l'agence concernée.
  console.info("[contact] nouvelle demande", {
    source: body.source,
    postalCodeCity: body.postalCodeCity,
    houseType: body.houseType,
    products: body.products,
  });

  return NextResponse.json({ ok: true });
}
