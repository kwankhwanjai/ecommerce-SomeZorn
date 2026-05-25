import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden px-3 pt-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[24px] bg-[#f5eedc] px-4 py-5 shadow-[0_18px_45px_rgba(73,52,28,0.10)] sm:rounded-[42px] sm:px-8 sm:py-9 lg:px-12 lg:py-11">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-8 h-52 w-52 rounded-full bg-[#d9b26f]/20 blur-3xl" />
          <div className="absolute -right-28 bottom-10 h-64 w-64 rounded-full bg-[#8f6f45]/15 blur-3xl" />

          {/* ซ่อน pattern บนมือถือ ลดความรก */}
          <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_1px_1px,rgba(75,57,34,0.10)_1px,transparent_0)] bg-[length:18px_18px] opacity-25 sm:block" />
        </div>

        <div className="relative z-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          {/* Text */}
          <div>
            {/* ซ่อน badge บนมือถือ */}
            <div className="mb-3 hidden items-center gap-2 rounded-full border border-[#b89b6b]/40 bg-white/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7a6240] backdrop-blur sm:inline-flex sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5e34]" />
              New Curated Drop
            </div>

            <h1 className="max-w-[720px] text-[32px] font-bold leading-[0.98] tracking-[-0.05em] text-[#241d16] sm:text-[68px] sm:leading-[0.95] sm:tracking-[-0.055em] lg:text-[82px]">
              Vintage pieces,
              <br />
              naturally yours.
            </h1>

            <p className="mt-3 max-w-[330px] text-[12px] leading-6 text-[#665742] sm:mt-5 sm:max-w-[430px] sm:text-[15px] sm:leading-7">
              Curated secondhand essentials with soft textures, earthy tones,
              and timeless character for everyday calm confidence.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
              <button className="rounded-full bg-[#241d16] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#5a3d22] sm:px-6 sm:py-3 sm:text-xs">
                Shop Now →
              </button>

              {/* ซ่อน tag บนมือถือ */}
              <span className="hidden rounded-full border border-[#b89b6b]/50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6d5737] sm:block sm:px-5 sm:py-3 sm:text-xs">
                Secondhand / Timeless
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto mt-1 w-full max-w-[285px] sm:max-w-[520px] lg:mt-0 lg:max-w-none">
            <div className="relative overflow-hidden rounded-[22px] border-[6px] border-[#fff8e9] bg-[#d2b78b] shadow-[0_18px_38px_rgba(73,52,28,0.14)] sm:rounded-[38px] sm:border-[10px] sm:shadow-[0_20px_45px_rgba(73,52,28,0.16)]">
              <img
                src={model}
                alt="Secondhand vintage fashion look"
                className="h-[225px] w-full object-cover object-[center_34%] sm:h-[500px] lg:h-[560px]"
              />

              {/* ซ่อน text card บนมือถือ */}
              <div className="absolute bottom-3 left-3 right-3 hidden rounded-[18px] border border-white/35 bg-[#fff8e9]/80 px-3 py-2.5 backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:block sm:rounded-[22px] sm:px-4 sm:py-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6c5130] sm:text-[11px]">
                  Earth tone edit
                </p>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-[#2d2419] sm:text-sm">
                  Soft vintage styling for everyday wear.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 hidden w-[190px] rotate-3 overflow-hidden rounded-[24px] border-[8px] border-[#fff8e9] bg-[#b9874f] shadow-xl sm:block lg:-right-8">
              <img
                src={model}
                alt="Vintage detail"
                className="h-[210px] w-full object-cover object-[center_58%]"
              />
            </div>
          </div>
        </div>

        {/* Bottom info - ซ่อนบนมือถือ */}
        <div className="relative z-10 mt-8 hidden gap-3 border-t border-[#9b7a4f]/20 pt-5 sm:grid sm:grid-cols-3 lg:mt-10">
          {[
            ["01", "Curated slowly"],
            ["02", "Natural vintage mood"],
            ["03", "Everyday comfort"],
          ].map(([num, text]) => (
            <div
              key={num}
              className="rounded-2xl border border-[#b89b6b]/25 bg-white/25 px-4 py-3 backdrop-blur"
            >
              <p className="text-[11px] font-bold text-[#8b5e34]">{num}</p>
              <p className="mt-1 text-sm font-semibold text-[#33281b]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
