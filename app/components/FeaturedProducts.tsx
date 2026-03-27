import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type Product = {
  id: string;
  handle: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  image?: string | null;
};

export default async function FeaturedProducts() {
  const products: Product[] = await getProducts();

  return (
    <section
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 24px 100px",
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: "56px" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#7c5cfc",
            background: "rgba(124,92,252,0.12)",
            border: "1px solid rgba(124,92,252,0.25)",
            borderRadius: "20px",
            padding: "4px 14px",
            marginBottom: "16px",
          }}
        >
          ✦ Curated for You
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#f0f0ff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c5cfc, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Collection
            </span>
          </h2>
          <p style={{ color: "#606078", fontSize: "14px" }}>
            {products.length} products available
          </p>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product: Product, index: number) => (
          <div
            key={product.id}
            style={{
              background: "#16161f",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px",
              overflow: "hidden",
              transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              animationDelay: `${index * 0.1}s`,
            }}
            className="product-card"
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                height: "300px",
                background: "linear-gradient(135deg, #1a1a28 0%, #0f0f1a 100%)",
                overflow: "hidden",
              }}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="product-img"
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    opacity: 0.1,
                  }}
                >
                  👟
                </div>
              )}

              {/* Category badge */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  background: "rgba(10,10,15,0.75)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#a0a0b8",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {product.category || "Footwear"}
              </div>

              {/* Stars */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  display: "flex",
                  gap: "2px",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    fill={i < 4 ? "#f59e0b" : "transparent"}
                    color={i < 4 ? "#f59e0b" : "#606078"}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "22px" }}>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#f0f0ff",
                  marginBottom: "6px",
                  letterSpacing: "-0.02em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.name}
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                }}
              >
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
                  {product.currency} {parseFloat(product.price).toFixed(2)}
                </span>
                <span style={{ fontSize: "12px", color: "#606078" }}>
                  Free shipping
                </span>
              </div>

              <Link
                href={`/products/${product.handle}`}
                id={`view-product-${product.handle}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  background: "linear-gradient(135deg, #7c5cfc, #9575ff)",
                  color: "white",
                  borderRadius: "12px",
                  padding: "13px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                  boxShadow: "0 4px 16px rgba(124,92,252,0.25)",
                }}
                className="view-btn"
              >
                View Product <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-6px);
          border-color: rgba(124,92,252,0.35) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,92,252,0.15) !important;
        }
        .product-card:hover .product-img {
          transform: scale(1.06);
        }
        .view-btn:hover {
          opacity: 0.88;
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
