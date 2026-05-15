import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden pt-3">
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-[#fffdf9] via-white to-[#f8f4ec] shadow-[0_20px_55px_rgba(0,0,0,0.06)]">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute -right-10 top-8 h-[180px] w-[180px] rounded-full bg-[#ffe7aa] opacity-40 blur-[80px] sm:right-[5%] sm:h-[320px] sm:w-[320px] sm:blur-[110px]" />
          <div className="absolute bottom-0 left-0 h-[150px] w-[150px] rounded-full bg-[#ece7dd] opacity-70 blur-[80px] sm:left-[20%] sm:h-[240px] sm:w-[240px]" />
          <div className="absolute right-5 bottom-12 h-[130px] w-[130px] rounded-full border border-[#ddd] opacity-40 sm:right-[12%] sm:bottom-[18%] sm:h-[220px] sm:w-[220px]" />
        </div>

        <div className="relative z-10 flex min-h-[300px] items-center px-5 py-7 sm:min-h-[430px] sm:px-14 sm:py-12 lg:min-h-[520px] lg:px-20">
          {/* LEFT */}
          <div className="w-[58%] sm:flex-1">
            <div className="mb-3 flex items-center gap-2 sm:mb-5 sm:gap-3">
              <span className="h-[2px] w-6 bg-black sm:w-10" />

              <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-gray-500 sm:text-xs sm:tracking-[0.32em]">
                New Collection
              </p>
            </div>

            <h1 className="text-[32px] font-bold leading-[0.92] text-[#262626] sm:text-6xl lg:text-7xl">
              Minimal
              <br />
              Streetwear
            </h1>

            <p className="mt-3 max-w-[230px] text-[11px] leading-5 text-gray-500 sm:mt-5 sm:max-w-[470px] sm:text-base sm:leading-8">
              Discover modern essentials designed with comfort, confidence and
              everyday movement in mind.
            </p>

            <div className="mt-5 flex gap-2 sm:mt-8 sm:gap-4">
              <button className="rounded-full bg-[#ffd777] px-4 py-2 text-[11px] font-semibold shadow-sm transition hover:scale-105 sm:px-8 sm:py-4 sm:text-sm">
                Shop Now →
              </button>

              <button className="rounded-full border border-gray-300 px-4 py-2 text-[11px] transition hover:bg-black hover:text-white sm:px-8 sm:py-4 sm:text-sm">
                Explore
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex w-[42%] justify-end sm:flex-1 sm:justify-center">
            <img
              src={model}
              alt=""
              className="w-[135px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.14)] transition duration-500 hover:scale-[1.02] sm:w-[330px] lg:w-[430px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
