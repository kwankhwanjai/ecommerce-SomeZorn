import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  const reasons = [
    {
      number: "01",
      title: "Quality Assurance",
      text: "Every piece is carefully inspected for quality, cleanliness, and wearability, so you can shop second-hand with confidence.",
    },
    {
      number: "02",
      title: "Thoughtful Curation",
      text: "We select pieces with timeless shapes, everyday comfort, and quiet character — made to fit naturally into your wardrobe.",
    },
    {
      number: "03",
      title: "Easy Experience",
      text: "From browsing to checkout, we keep the shopping experience simple, clear, and effortless.",
    },
  ];

  return (
    <main className="border-t border-gray-200">
      {/* Header */}
      <section className="px-3 pt-8 text-center sm:px-4 sm:pt-12">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
          Our Story
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="ABOUT" text2="US" />
        </div>

        <p className="mx-auto mt-3 max-w-[560px] text-sm leading-6 text-gray-500">
          A curated second-hand clothing store built around simplicity,
          individuality, and everyday wearability.
        </p>
      </section>

      {/* Story */}
      <section className="my-10 grid gap-8 rounded-[28px] bg-[#f8f8fa] p-4 sm:p-6 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:p-8">
        <div className="overflow-hidden rounded-[24px] bg-gray-100">
          <img
            className="h-full min-h-[320px] w-full object-cover transition duration-700 hover:scale-[1.03] md:min-h-[520px]"
            src={assets.about_img}
            alt="About SomeZorn"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 text-sm leading-7 text-gray-600 sm:text-base">
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

          <div className="mt-2 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-gray-900">
              Our Mission
            </p>

            <p className="text-sm leading-7 text-gray-600">
              We are committed to reducing waste through thoughtful curation,
              while encouraging a more conscious and personal approach to style.
              Less excess, more intention — that’s the direction we move in.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
            Why SomeZorn
          </p>

          <div className="text-2xl sm:text-3xl">
            <Title text1="WHY" text2="CHOOSE US" />
          </div>
        </div>

        <div className="grid gap-4 text-sm md:grid-cols-3">
          {reasons.map((item) => (
            <article
              key={item.number}
              className="rounded-[24px] border border-gray-200 bg-white px-6 py-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            >
              <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                {item.number}
              </span>

              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 leading-6 text-gray-500">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </main>
  );
};

export default About;
