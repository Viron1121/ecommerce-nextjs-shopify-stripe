"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { ShoppingBag, Check } from "lucide-react";

type Product = {
  id: string;
  handle: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  image?: string | null;
};

export default function AddToCartButton({
  product,
  sizes,
}: {
  product: Product;
  sizes: string[];
}) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  function handleAdd() {
    if (!selectedSize) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    addToCart({
      id: product.id,
      handle: product.handle,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div>
      {/* Size buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => { setSelectedSize(size); setError(false); }}
            style={{
              background:
                selectedSize === size
                  ? "rgba(124,92,252,0.2)"
                  : "rgba(255,255,255,0.04)",
              border:
                selectedSize === size
                  ? "1px solid rgba(124,92,252,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              color: selectedSize === size ? "#7c5cfc" : "#a0a0b8",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {error && (
        <p
          style={{
            fontSize: "13px",
            color: "#ef4444",
            marginBottom: "12px",
            fontWeight: 500,
          }}
        >
          ⚠ Please select a size first
        </p>
      )}

      <button
        id="add-to-cart-btn"
        onClick={handleAdd}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          background: added
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : "linear-gradient(135deg, #7c5cfc, #9575ff)",
          color: "white",
          border: "none",
          borderRadius: "14px",
          padding: "18px",
          fontSize: "15px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: added
            ? "0 8px 24px rgba(34,197,94,0.35)"
            : "0 10px 32px rgba(124,92,252,0.35)",
          transition: "all 0.25s ease",
          letterSpacing: "0.01em",
        }}
      >
        {added ? (
          <>
            <Check size={18} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
