import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden pt-3">
      <div className="relative overflow-hidden rounded-[28px] bg-[#f6f0df] px-4 py-6 sm:rounded-[36px] sm:px-8 sm:py-9 lg:px-10">
        {/* TOP */}
        <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_280px] lg:items-start">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#7b6f5a]">
              New Collection
            </p>

            <h1 className="max-w-[780px] text-[42px] font-bold leading-[0.95] tracking-[-0.055em] text-[#202020] sm:text-[64px] lg:text-[76px]">
              Minimal pieces.
              <br />
              Everyday stories.
            </h1>
          </div>

          <div className="hidden pt-5 text-right lg:block">
            <p className="mb-5 text-[14px] leading-6 text-[#5f5748]">
              Curated secondhand essentials with comfort, character and timeless
              style.
            </p>

            <button className="rounded-full bg-[#202020] px-6 py-3 text-xs font-semibold text-white transition hover:scale-105">
              Shop Now →
            </button>
          </div>
        </div>

        {/* IMAGE COLLAGE */}
        {/* IMAGE COLLAGE */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-12 sm:gap-4 lg:mt-8">
          <div className="overflow-hidden rounded-[24px] bg-[#d9c49d] sm:col-span-5 sm:rounded-[30px]">
            <img
              src={model}
              alt="Secondhand fashion look"
              className="h-[300px] w-full object-cover object-[center_32%] sm:h-[330px] lg:h-[360px]"
            />
          </div>

          <div className="hidden overflow-hidden rounded-[24px] bg-[#bd7837] sm:col-span-7 sm:block sm:rounded-[30px]">
            <img
              src={model}
              alt="Secondhand oversized jacket detail"
              className="h-[330px] w-full object-cover object-[center_42%] lg:h-[360px]"
            />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="relative z-10 mx-auto mt-7 max-w-[680px] text-center sm:mt-8">
          <h2 className="text-[22px] font-bold leading-tight tracking-[-0.035em] text-[#242424] sm:text-[30px] lg:text-[34px]">
            Curated secondhand fashion for calm, confident everyday looks.
          </h2>

          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-6 text-[#6f6758] lg:hidden">
            Comfort, character and timeless style in every piece.
          </p>

          <button className="mt-5 rounded-full bg-[#202020] px-6 py-3 text-xs font-semibold text-white transition hover:scale-105 lg:hidden">
            Shop Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
