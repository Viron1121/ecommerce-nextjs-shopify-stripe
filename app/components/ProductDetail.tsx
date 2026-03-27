import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  images: string[];
  sizes?: string[];
};

type Props = {
  product: Product;
  onClose: () => void;
};

export default function ProductDetail({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Images */}
          <div className="space-y-2">
            {product.images.map((img, i) => (
              <div key={i} className="relative w-full h-80">
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
              <p className="mt-4 text-2xl font-semibold">
                {product.currency} {product.price}
              </p>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <p className="font-medium mb-2">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="border rounded px-3 py-2 hover:bg-gray-100"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <button className="mt-6 w-full rounded-full bg-black py-3 text-white text-sm font-medium hover:bg-gray-900">
              Add to Cart
            </button>

            {/* Shipping/Returns */}
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <p>🚚 Free Shipping on orders over $150</p>
              <p>🔄 Free Returns — 30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
