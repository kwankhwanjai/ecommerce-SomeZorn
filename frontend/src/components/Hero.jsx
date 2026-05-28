import { Link } from "react-router-dom";
import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden px-3 pt-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#f8f8fa] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:px-8 sm:py-9 lg:px-12 lg:py-12">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-100/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] bg-[length:18px_18px]" />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gray-600 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              New Collection
            </div>

            <h1 className="mx-auto max-w-[720px] text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-gray-900 sm:text-[72px] sm:leading-[0.96] lg:mx-0 lg:text-[88px]">
              Modern pieces,
              <br />
              timeless mood.
            </h1>

            <p className="mx-auto mt-5 max-w-[480px] text-sm leading-7 text-gray-500 sm:text-[15px] lg:mx-0">
              Curated secondhand fashion with soft silhouettes, monochrome
              tones, and calm everyday confidence.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to="/collection"
                className="rounded-full bg-gray-900 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
              >
                Shop Now
              </Link>

              <Link
                to="/collection"
                className="rounded-full border border-gray-200 bg-white/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-gray-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[500px] lg:max-w-none">
            <div className="relative overflow-hidden rounded-[30px] border border-white/30 bg-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:rounded-[36px]">
              <img
                src={model}
                alt="SomeZorn secondhand fashion editorial model"
                className="h-[330px] w-full object-cover object-[center_30%] sm:h-[540px] lg:h-[560px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />

              <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/30 bg-white/25 px-4 py-3 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:px-5 sm:py-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-500">
                  Editorial Drop
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Minimal silhouettes for everyday wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
