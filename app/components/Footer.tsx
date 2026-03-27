"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Zap } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: ["New Arrivals", "Men", "Women", "Collections", "Sale"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["FAQ", "Shipping", "Returns", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d0d14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "64px 24px 40px",
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "56px",
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
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
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#f0f0ff",
                  letterSpacing: "-0.04em",
                }}
              >
                Shozada
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#606078",
                maxWidth: "260px",
                marginBottom: "24px",
              }}
            >
              Premium footwear engineered for comfort, style, and performance.
              Step into the future.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#606078",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(124,92,252,0.15)";
                    el.style.color = "#7c5cfc";
                    el.style.borderColor = "rgba(124,92,252,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.05)";
                    el.style.color = "#606078";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {section.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "14px",
                        color: "#606078",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#a0a0b8")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "#606078")
                      }
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#606078" }}>
            © {new Date().getFullYear()} Shozada. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "#606078",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#a0a0b8")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#606078")
                }
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
