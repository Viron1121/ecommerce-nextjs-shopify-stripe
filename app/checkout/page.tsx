"use client";

import { useCart } from "../components/CartProvider";
import Image from "next/image";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─── Stripe publishable key placeholder ─────────────────────────────────────
// Replace with your real key in .env.local:  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51T8rY4Bjph409GDsQ5kkdgT6nxF2Q4kybvT1KU7Be0n8FtAIxV09cOeAdR5ja2zPuHj4SlhE1UZoHuIcbu9MsA5K00CGp4lkwg"
);

// ─── Stripe Element Appearance ───────────────────────────────────────────────
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "15px",
      color: "var(--text-primary)",
      fontFamily: "'Inter', sans-serif",
      "::placeholder": { color: "#606078" },
      backgroundColor: "transparent",
    },
    invalid: { color: "#ef4444" },
  },
};

// ─── Checkout Form (inner) ───────────────────────────────────────────────────
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, totalPrice, clearCart } = useCart();
  const currency = items[0]?.currency || "USD";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [focusField, setFocusField] = useState<string | null>(null);

  const stripeFieldStyle = (field: string) => ({
    background: "var(--bg-card)",
    border: `1px solid ${focusField === field ? "rgba(124,92,252,0.6)" : "var(--border)"}`,
    borderRadius: "12px",
    padding: "14px 16px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focusField === field ? "0 0 0 3px rgba(124,92,252,0.12)" : "none",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || items.length === 0) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      // In production: call your API to create a PaymentIntent,
      // then use confirmCardPayment with the returned client_secret.
      // Here we simulate a test payment flow:
      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card element not found");

      // Simulate API call to create PaymentIntent (you'll replace with real API)
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100),
          currency: currency.toLowerCase(),
          items: items.map((i) => ({ name: i.name, quantity: i.quantity })),
        }),
      });

      if (!response.ok) {
        throw new Error("Payment server unavailable. (Add your Stripe secret key.)");
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: { name, email },
          },
        }
      );

      if (error) {
        setErrorMsg(error.message || "Payment failed.");
        setStatus("error");
      } else if (paymentIntent?.status === "succeeded") {
        setStatus("success");
        clearCart();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(34,197,94,0.4)",
          }}
        >
          <CheckCircle size={40} color="white" />
        </div>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
          }}
        >
          Order Confirmed! 🎉
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Thank you for your purchase. A confirmation will be sent to{" "}
          <strong style={{ color: "var(--text-primary)" }}>{email}</strong>.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "12px",
            background: "linear-gradient(135deg, #7c5cfc, #9575ff)",
            color: "white",
            padding: "14px 28px",
            borderRadius: "12px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
        className="checkout-grid"
      >
        {/* ── LEFT: Payment Form ── */}
        <div>
          {/* Contact */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  background: "rgba(124,92,252,0.2)",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#7c5cfc",
                }}
              >
                1
              </span>
              Contact Information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(124,92,252,0.6)")
                  }
                  onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--border)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(124,92,252,0.6)")
                  }
                  onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--border)")
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  background: "rgba(124,92,252,0.2)",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#7c5cfc",
                }}
              >
                2
              </span>
              Payment Details
              <CreditCard size={16} color="#606078" style={{ marginLeft: "auto" }} />
            </h2>

            {/* Test card notice */}
            <div
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "20px",
                fontSize: "13px",
                color: "#f59e0b",
              }}
            >
              🧪 <strong>Test Mode</strong> — Use card{" "}
              <code
                style={{
                  background: "rgba(245,158,11,0.12)",
                  borderRadius: "4px",
                  padding: "1px 6px",
                  fontFamily: "monospace",
                }}
              >
                4242 4242 4242 4242
              </code>
              , any future date, any CVC.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Card Number
                </label>
                <div style={stripeFieldStyle("cardNumber")}>
                  <CardNumberElement
                    options={ELEMENT_OPTIONS}
                    onFocus={() => setFocusField("cardNumber")}
                    onBlur={() => setFocusField(null)}
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Expiry Date
                  </label>
                  <div style={stripeFieldStyle("cardExpiry")}>
                    <CardExpiryElement
                      options={ELEMENT_OPTIONS}
                      onFocus={() => setFocusField("cardExpiry")}
                      onBlur={() => setFocusField(null)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CVC
                  </label>
                  <div style={stripeFieldStyle("cardCvc")}>
                    <CardCvcElement
                      options={ELEMENT_OPTIONS}
                      onFocus={() => setFocusField("cardCvc")}
                      onBlur={() => setFocusField(null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {(status === "error" || errorMsg) && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "12px",
                padding: "14px 16px",
                fontSize: "14px",
                color: "#ef4444",
                marginBottom: "16px",
              }}
            >
              ⚠&ensp;{errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            id="pay-now-btn"
            type="submit"
            disabled={status === "loading" || items.length === 0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              background:
                items.length === 0
                  ? "rgba(255,255,255,0.05)"
                  : "linear-gradient(135deg, #7c5cfc, #9575ff)",
              color: items.length === 0 ? "#606078" : "white",
              border: "none",
              borderRadius: "14px",
              padding: "18px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              boxShadow:
                items.length === 0
                  ? "none"
                  : "0 10px 32px rgba(124,92,252,0.35)",
              transition: "opacity 0.2s",
              opacity: status === "loading" ? 0.75 : 1,
            }}
          >
            <Lock size={17} />
            {status === "loading"
              ? "Processing…"
              : `Pay ${currency} ${totalPrice.toFixed(2)}`}
          </button>
          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            🔒 256-bit SSL encrypted · Powered by Stripe
          </p>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "28px",
            position: "sticky",
            top: "100px",
          }}
        >
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "20px",
            }}
          >
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Your cart is empty.{" "}
              <Link href="/" style={{ color: "#7c5cfc" }}>
                Go shopping
              </Link>
            </p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    style={{ display: "flex", gap: "12px", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        background: "var(--bg-secondary)",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.size && (
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      )}
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#7c5cfc", flexShrink: 0 }}>
                      {item.currency} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Subtotal</span>
                  <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                    {currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Shipping</span>
                  <span style={{ fontSize: "14px", color: "#22c55e" }}>Free</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "14px",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                    Total
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #7c5cfc, #c4b5fd)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder { color: var(--text-muted); }
        input { font-family: 'Inter', sans-serif; }
      `}</style>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 50% 40% at 50% 0%, var(--accent-light) 0%, transparent 60%), var(--bg-primary)",
        padding: "60px 24px 100px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* Back */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "32px",
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Title */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
              marginBottom: "6px",
            }}
          >
            Checkout
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Complete your purchase securely
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
