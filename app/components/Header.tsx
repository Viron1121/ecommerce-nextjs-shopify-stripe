"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();

  const navLinks = [
    { label: "New Arrivals", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Collections", href: "#" },
    { label: "Sale", href: "#" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  background: "linear-gradient(135deg, #7c5cfc, #c4b5fd)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={18} color="white" fill="white" />
              </div>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: "#f0f0ff",
                }}
              >
                Shozada
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "32px" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#a0a0b8",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#f0f0ff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#a0a0b8")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#a0a0b8",
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.color = "#f0f0ff"))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.color = "#a0a0b8"))
              }
            >
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <button
              id="cart-button"
              onClick={() => setIsCartOpen(true)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#a0a0b8",
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.color = "#f0f0ff"))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.color = "#a0a0b8"))
              }
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "linear-gradient(135deg, #7c5cfc, #9575ff)",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 700,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 12px rgba(124,92,252,0.6)",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#a0a0b8",
                display: "none",
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            style={{
              background: "rgba(10,10,15,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "16px 24px 24px",
            }}
            className="mobile-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#a0a0b8",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
