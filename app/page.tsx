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
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32 noise min-h-[90vh] flex items-center justify-center">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cfc] opacity-20 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#c4b5fd] opacity-10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">

            {/* LEFT CONTENT */}
            <div className="animate-fadeInUp">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(124,92,252,0.25)] bg-[rgba(124,92,252,0.12)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#7c5cfc]">
                ✦ New Arrivals
              </div>
              <h1 className="text-5xl lg:text-[72px] font-extrabold leading-[1.05] text-[var(--text-primary)] tracking-tight">
                Elevate Your <br />
                <span className="gradient-text">Every Step</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed">
                Discover premium footwear designed for comfort, style, and uncompromised performance. Experience the next generation of movement, curated exclusively for you.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#featured" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#7c5cfc] to-[#9575ff] px-8 text-sm font-bold text-white shadow-[0_4px_16px_rgba(124,92,252,0.25)] transition-all hover:scale-[0.98] hover:opacity-90">
                  Explore Collection
                </a>
              </div>
            </div>

            {/* RIGHT Content */}
            {randomProduct?.image && (
              <div className="relative mx-auto w-full max-w-md md:max-w-none h-[450px] lg:h-[600px] rounded-[32px] overflow-hidden border border-[var(--border)] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(124,92,252,0.15)] animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)]"></div>
                <Image
                  src={randomProduct.image}
                  alt={randomProduct.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105 opacity-90 dark:mix-blend-lighten"
                />

                {/* Decorative Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-4 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(124,92,252,0.2)] text-[#c4b5fd]">
                      ✦
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">Featured Drop</h3>
                      <p className="truncate text-xs text-[var(--text-muted)]">{randomProduct.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <FeaturedProducts />
    </>
  );
}
