import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
// Set STRIPE_SECRET_KEY in your .env.local file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe secret key not configured. Add STRIPE_SECRET_KEY to your .env.local file.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { amount, currency, items } = body;

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum is 50 cents." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount in cents
      currency: currency || "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(
          items?.map((i: { name: string; quantity: number }) => ({
            name: i.name,
            qty: i.quantity,
          })) || []
        ),
        store: "Shozada",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    console.error("[Stripe] PaymentIntent error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
