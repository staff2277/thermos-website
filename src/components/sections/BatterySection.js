export default function BatterySection() {
  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-12 lg:px-24 pointer-events-none z-10">
      {/* Battery Content Overlay - Aligned Left */}
      <div className="w-full flex justify-start">
        <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-sm border-[0.05] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-8 pointer-events-auto transform transition-all duration-700 hover:bg-white/15">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-xs">
                Smart Tech
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.05] tracking-tight">
              24-Hour <br />
              <span className="text-accent">Battery Life.</span>
            </h2>
          </div>

          <p className="text-md text-white/80 max-w-md leading-relaxed font-outfit">
            Our advanced battery tech ensures your temperature tracking and LED ring stay active all day. Recharge in just 45 minutes using the included magnetic fast charger.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">24h</span>
              <span className="text-xs text-white/60 uppercase tracking-widest">Active Use</span>
            </div>
            <div className="w-[1px] h-10 bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">45m</span>
              <span className="text-xs text-white/60 uppercase tracking-widest">Fast Charge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
