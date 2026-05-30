import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  const contactItems = [
    {
      label: "Email",
      value: "support@somezorn.com",
    },
    {
      label: "Tel",
      value: "000-000-0000",
    },
  ];

  return (
    <main className="overflow-hidden border-t border-gray-200">
      {/* Header */}
      <section className="px-4 pt-10 text-center sm:pt-14">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
          Get in Touch
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="CONTACT" text2="US" />
        </div>

        <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-gray-500 sm:text-base">
          Whether you have a question, need styling help, or simply want to say
          hello — we’d love to hear from you.
        </p>
      </section>

      {/* Main Contact Card */}
      <section className="mx-auto my-10 max-w-6xl px-4 sm:my-14">
        <div className="rounded-[28px] bg-[#f8f8fa] p-4 sm:rounded-[32px] sm:p-6 lg:p-8">
          <div className="grid items-stretch gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[24px] bg-gray-100">
              <img
                className="h-[300px] w-full object-cover sm:h-[430px] lg:h-full"
                src={assets.contact_img}
                alt="SomeZorn contact"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/30 bg-white/80 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:w-72">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                  SomeZorn Studio
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Curated second-hand pieces with comfort, character, and
                  timeless style.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center py-2 sm:px-2 lg:px-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
                Our Store
              </p>

              <h2 className="max-w-md text-3xl font-medium leading-tight text-gray-900 sm:text-4xl">
                From one closet to another, fashion never dies.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                Based in CNX · crafted with care in TH. For questions about
                products, orders, styling, or collaboration, feel free to reach
                out.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                      {item.label}
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm">
                <p className="font-medium text-gray-900">Careers at SomeZorn</p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Interested in working with us or joining future projects? Send
                  us your story.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:support@somezorn.com"
                  className="rounded-full bg-gray-900 px-8 py-3 text-center text-sm font-medium text-white transition duration-300 hover:bg-gray-700"
                >
                  Contact Us
                </a>

                <button
                  type="button"
                  className="rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition duration-300 hover:bg-gray-100"
                >
                  View Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </main>
  );
};

export default Contact;
