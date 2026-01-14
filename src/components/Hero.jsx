export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-surface">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2500"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <span className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
          New Arrival
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
          Elevate Your Everyday.
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Discover our curated collection of premium essentials. 
          Designed for the modern lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black font-semibold py-4 px-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
}
