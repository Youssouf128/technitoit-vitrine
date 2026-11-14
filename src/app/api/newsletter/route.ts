import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Merci de saisir une adresse email valide." }, { status: 422 });
  }

  // TODO : inscrire l'adresse auprès de l'outil d'emailing (Brevo, Mailchimp…).
  console.info("[newsletter] inscription", email.replace(/(.).+(@.+)/, "$1***$2"));

  return NextResponse.json({ ok: true, message: "Merci ! Votre inscription à la newsletter est confirmée." });
}
