"use client";

import { useCart } from "./CartProvider";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  const currency = items[0]?.currency || "USD";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 200,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "#111118",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} color="#7c5cfc" />
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#f0f0ff" }}>
              Your Cart
            </span>
            {totalItems > 0 && (
              <span
                style={{
                  background: "rgba(124,92,252,0.15)",
                  color: "#7c5cfc",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: "20px",
                  border: "1px solid rgba(124,92,252,0.3)",
                }}
              >
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#a0a0b8",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                color: "#606078",
              }}
            >
              <ShoppingBag size={52} strokeWidth={1} />
              <p style={{ fontSize: "16px", fontWeight: 500, color: "#a0a0b8" }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "14px" }}>
                Add some great shoes to get started!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  marginTop: "8px",
                  background: "linear-gradient(135deg, #7c5cfc, #9575ff)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    padding: "14px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.06)",
                      position: "relative",
                    }}
                  >
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#f0f0ff",
                        marginBottom: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </p>
                    {item.size && (
                      <p style={{ fontSize: "12px", color: "#606078", marginBottom: "6px" }}>
                        Size: {item.size}
                      </p>
                    )}
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#7c5cfc" }}>
                      {item.currency} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Qty + Remove */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#606078",
                        display: "flex",
                      }}
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "8px",
                        padding: "4px",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#a0a0b8",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#f0f0ff", minWidth: "16px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#a0a0b8",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px 28px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "#a0a0b8", fontSize: "15px" }}>Subtotal</span>
              <span style={{ color: "#f0f0ff", fontSize: "18px", fontWeight: 700 }}>
                {currency} {totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                background: "linear-gradient(135deg, #7c5cfc, #9575ff)",
                color: "white",
                border: "none",
                borderRadius: "14px",
                padding: "16px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(124,92,252,0.35)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <p
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#606078",
                textAlign: "center",
              }}
            >
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
}
