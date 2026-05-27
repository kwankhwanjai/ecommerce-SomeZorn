import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="border-t border-[#e7dcc8]">
      <div className="px-3 pt-8 text-center sm:pt-12">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8f6f45]">
          Our Story
        </p>
        <div className="text-2xl sm:text-3xl">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>
      </div>

      <section className="my-10 grid gap-8 rounded-[28px] bg-[#fffaf1] p-4 shadow-[0_18px_45px_rgba(73,52,28,0.08)] sm:p-7 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <div className="overflow-hidden rounded-[24px]">
          <img
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            src={assets.about_img}
            alt="About SomeZorn"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 text-sm leading-7 text-[#6f604d] sm:text-base">
          <p>
            SomeZorn is a curated second-hand clothing store focused on
            simplicity, quality, and individuality. Each piece is carefully
            selected to bring together timeless style and everyday wearability.
          </p>

          <p>
            We believe in giving clothes a second life while helping people
            express themselves through unique and thoughtful fashion choices.
            Clean, effortless, and intentional — that’s what defines SomeZorn.
          </p>

          <div className="mt-2 rounded-2xl border border-[#e1d2b9] bg-white p-5">
            <p className="mb-2 font-semibold text-[#3f3325]">Our Mission</p>
            <p>
              We are committed to reducing waste through thoughtful curation,
              while encouraging a more conscious and personal approach to style.
              Less excess, more intention — that’s the direction we move in.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6 text-center text-2xl sm:text-3xl">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div className="rounded-2xl border border-[#e1d2b9] bg-white px-6 py-7 transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(73,52,28,0.10)]">
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eedc] text-[#7a5b35]">
              01
            </span>
            <b className="text-[#3f3325]">Quality Assurance</b>
            <p className="mt-3 leading-6 text-[#756855]">
              We carefully inspect every item to ensure quality, cleanliness,
              and wearability, so you can feel confident in what you wear.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e1d2b9] bg-white px-6 py-7 transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(73,52,28,0.10)]">
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eedc] text-[#7a5b35]">
              02
            </span>
            <b className="text-[#3f3325]">Convenience</b>
            <p className="mt-3 leading-6 text-[#756855]">
              We make second-hand shopping simple and effortless, from browsing
              to checkout, with a clear and easy experience.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e1d2b9] bg-white px-6 py-7 transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(73,52,28,0.10)]">
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eedc] text-[#7a5b35]">
              03
            </span>
            <b className="text-[#3f3325]">Exceptional Customer Service</b>
            <p className="mt-3 leading-6 text-[#756855]">
              We provide clear communication and attentive support at every
              step, so every order feels smooth, reliable, and cared for.
            </p>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
};

export default About;
