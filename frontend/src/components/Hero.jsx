import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="relative w-full overflow-visible">
      <div className="relative overflow-visible rounded-[32px] bg-white min-h-[430px] sm:min-h-[500px] lg:min-h-[560px] px-7 sm:px-14 lg:px-20 shadow-[0_24px_70px_rgba(0,0,0,0.07)]">
        {/* background */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
          <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-[#f6e7c8]/70 blur-3xl" />
          <div className="absolute right-[28%] bottom-[8%] h-52 w-52 rounded-full bg-[#eef0e6]/90 blur-3xl" />
          <div className="absolute right-[10%] bottom-10 h-[260px] w-[260px] rounded-full border border-[#d8c6aa]/50" />
          <div className="absolute right-[14%] bottom-20 h-[180px] w-[180px] rounded-full border border-[#d8c6aa]/40" />
        </div>

        {/* content */}
        <div className="relative z-20 flex min-h-[430px] sm:min-h-[500px] lg:min-h-[560px] items-center">
          <div className="max-w-[520px] pr-[95px] sm:pr-0 text-[#2d2924]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#2d2924]" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase">
                Our Bestsellers
              </p>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
              Some Zorn
            </h1>

            <p className="mt-5 max-w-[420px] text-sm sm:text-base leading-relaxed text-[#6b6258]">
              Discover effortless streetwear pieces with a soft, minimal and
              confident mood.
            </p>

            <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ffd777] px-7 py-3 text-sm font-bold text-[#2d2924] shadow-sm transition hover:scale-[1.03]">
              SHOP NOW
              <span className="text-lg">»</span>
            </button>
          </div>
        </div>

        {/* model image */}
        <img
          src={model}
          alt=""
          className="
    pointer-events-none absolute z-30 object-contain select-none

    right-[-10px] bottom-[20px] w-[130px]

    sm:right-[10px] sm:bottom-[-40px] sm:w-[260px]
    md:right-[40px] md:bottom-[-70px] md:w-[340px]
    lg:right-[70px] lg:bottom-[-90px] lg:w-[420px]

    drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)]
  "
        />

        {/* dots */}
        <div className="absolute bottom-8 left-8 sm:left-14 lg:left-20 z-40 flex gap-3">
          <span className="h-[5px] w-14 rounded-full bg-[#2d2924]" />
          <span className="h-[5px] w-14 rounded-full bg-[#2d2924]/20" />
          <span className="h-[5px] w-14 rounded-full bg-[#2d2924]/20" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
