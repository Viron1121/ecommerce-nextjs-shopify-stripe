import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import { Star, Truck, RotateCcw, Shield } from "lucide-react";

type Product = {
  id: string;
  handle: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  image?: string | null;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const products: Product[] = await getProducts();
  const product = products.find((p) => p.handle === handle);

  if (!product) return notFound();

  const features = [
    { icon: <Truck size={16} />, text: "Free delivery over $150" },
    { icon: <RotateCcw size={16} />, text: "Free 30-day returns" },
    { icon: <Shield size={16} />, text: "2-year warranty" },
  ];

  const sizes = ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(124,92,252,0.1) 0%, transparent 60%), #0a0a0f",
        padding: "60px 24px 100px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "36px" }}>
          <span style={{ color: "#606078", fontSize: "13px" }}>
            <a href="/" style={{ color: "#7c5cfc", textDecoration: "none" }}>
              Home
            </a>{" "}
            /{" "}
            <a href="/#featured" style={{ color: "#7c5cfc", textDecoration: "none" }}>
              Collection
            </a>{" "}
            /{" "}
            <span style={{ color: "#a0a0b8" }}>{product.name}</span>
          </span>
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "56px",
            alignItems: "start",
          }}
          className="product-grid"
        >
          {/* IMAGE */}
          <div>
            <div
              style={{
                position: "relative",
                height: "580px",
                borderRadius: "28px",
                overflow: "hidden",
                background: "linear-gradient(135deg, #1a1a28 0%, #0f0f1a 100%)",
                border: "1px solid rgba(124,92,252,0.15)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              )}
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,10,15,0.5) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Category badge */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "18px",
                  background: "rgba(10,10,15,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#a0a0b8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {product.category || "Footwear"}
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div>
            {/* Category + Stars */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#7c5cfc",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {product.category || "Footwear"}
              </span>
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < 4 ? "#f59e0b" : "transparent"}
                    color={i < 4 ? "#f59e0b" : "#606078"}
                  />
                ))}
                <span
                  style={{ fontSize: "13px", color: "#606078", marginLeft: "6px" }}
                >
                  (128 reviews)
                </span>
              </div>
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: "#f0f0ff",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ marginBottom: "32px" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #7c5cfc, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {product.currency} {parseFloat(product.price).toFixed(2)}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  fontSize: "13px",
                  color: "#606078",
                }}
              >
                Tax included
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.07)",
                marginBottom: "28px",
              }}
            />

            {/* Size */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#f0f0ff",
                  }}
                >
                  Select Size
                </p>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7c5cfc",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Size guide →
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
                id="size-selector"
              >
                {sizes.map((size) => (
                  <button
                    key={size}
                    data-size={size}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "10px 16px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#a0a0b8",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    className="size-btn"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart – client component */}
            <AddToCartButton product={product} sizes={sizes} />

            {/* Features */}
            <div
              style={{
                marginTop: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {features.map((f) => (
                <div
                  key={f.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#a0a0b8",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#7c5cfc" }}>{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .size-btn:hover {
          background: rgba(124,92,252,0.12) !important;
          border-color: rgba(124,92,252,0.4) !important;
          color: #7c5cfc !important;
        }
      `}</style>
    </section>
  );
}
