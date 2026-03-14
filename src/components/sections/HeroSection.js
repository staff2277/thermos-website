import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 text-center text-white">
        <h1 className="text-outfit-72 tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          The Future of Hydration
        </h1>
        <p className="text-outfit-24 text-white/80 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Experience the most advanced smart water bottle ever designed. Stay
          tracked, stay healthy.
        </p>

        <div className="flex items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Link
            href="/shop"
            className="px-8 py-4 bg-white text-black rounded-full text-outfit-16 hover:scale-105 transition-transform active:scale-95 shadow-xl"
          >
            Shop Now
          </Link>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-outfit-16 hover:bg-white/20 transition-all active:scale-95">
            Watch Film
          </button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
