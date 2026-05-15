import model from "../assets/model.png";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden pt-3">
      <div className="relative rounded-[36px] bg-gradient-to-br from-[#fffdf9] via-white to-[#f8f4ec] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.06)]">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="
          absolute top-[10%] right-[5%]
          w-[320px] h-[320px]
          bg-[#ffe7aa]
          opacity-40 blur-[110px]
          rounded-full
          "
          />

          <div
            className="
          absolute bottom-0 left-[20%]
          w-[240px] h-[240px]
          bg-[#ece7dd]
          opacity-70 blur-[100px]
          rounded-full
          "
          />

          <div
            className="
          absolute right-[12%] bottom-[18%]
          w-[220px] h-[220px]
          border border-[#ddd]
          rounded-full
          opacity-40
          "
          />
        </div>

        <div
          className="
        relative z-10
        flex flex-col lg:flex-row
        items-center
        min-h-[520px]
        px-8
        sm:px-14
        lg:px-20
        py-12
        "
        >
          {/* LEFT */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-black" />

              <p
                className="
              text-xs
              tracking-[0.35em]
              uppercase
              text-gray-500
              "
              >
                New Collection
              </p>
            </div>

            <h1
              className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-bold
            leading-[0.9]
            text-[#262626]
            "
            >
              Minimal
              <br />
              Streetwear
            </h1>

            <p
              className="
            mt-6
            max-w-[470px]
            text-gray-500
            leading-8
            text-sm
            sm:text-base
            "
            >
              Discover modern essentials designed with comfort, confidence and
              everyday movement in mind.
            </p>

            <div className="flex gap-4 mt-10">
              <button
                className="
              bg-[#ffd777]
              px-8 py-4
              rounded-full
              font-semibold
              hover:scale-105
              transition
              shadow-sm
              "
              >
                Shop Now →
              </button>

              <button
                className="
              border
              border-gray-300
              px-8 py-4
              rounded-full
              hover:bg-black
              hover:text-white
              transition
              "
              >
                Explore
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="
          flex-1
          flex
          justify-center
          mt-12
          lg:mt-0
          relative
          "
          >
            <img
              src={model}
              alt=""
              className="
              w-[240px]
              sm:w-[330px]
              lg:w-[430px]
              object-contain
              drop-shadow-[0_30px_45px_rgba(0,0,0,.15)]
              hover:scale-[1.02]
              transition
              duration-500
              "
            />
          </div>
        </div>

        {/* indicators */}
        <div
          className="
        absolute
        bottom-8
        left-10
        flex gap-3
        "
        ></div>
      </div>
    </section>
  );
};

export default Hero;
