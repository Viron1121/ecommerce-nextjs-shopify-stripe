import FeaturedProducts from "./components/FeaturedProducts";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";

type Product = {
  id: string;
  name: string;
  image?: string | null;
};

export default async function Home() {
  const products: Product[] = await getProducts();

  const productsWithImages = products.filter(p => p.image);
  const randomProduct =
    productsWithImages[Math.floor(Math.random() * productsWithImages.length)];

  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Elevate Your <br /> Every Step
              </h1>
              <p className="mt-6 max-w-xl text-gray-600">
                Discover premium footwear designed for comfort, style, and performance.
              </p>
            </div>

            {/* RIGHT Content */}
            {randomProduct?.image && (
              <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
                <Image
                  src={randomProduct.image}
                  alt={randomProduct.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            )}

          </div>
        </div>
      </section>

      <FeaturedProducts />
    </>
  );
}
