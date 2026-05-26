import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="overflow-hidden border-t border-[#eadfca]">
      {/* Header */}
      <section className="relative px-4 pt-12 text-center sm:pt-16">
        <p className="mb-3 text-xs tracking-[0.35em] text-[#9b7a4d]">
          GET IN TOUCH
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1={"CONTACT"} text2={"US"} />
        </div>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#7b6a55] sm:text-base">
          Whether you have a question, need styling help, or simply want to say
          hello — we’d love to hear from you.
        </p>
      </section>

      {/* Main Contact Card */}
      <section className="mx-auto my-12 max-w-6xl px-4 sm:my-16">
        <div className="relative overflow-hidden rounded-[28px] border border-[#eadfca] bg-white p-3 shadow-[0_15px_40px_rgba(89,63,32,0.08)] sm:rounded-[38px] sm:p-5">
          <div className="grid items-stretch gap-6 rounded-[22px] bg-[#fffaf2] p-4 sm:rounded-[30px] sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[22px] bg-[#eee1c9] sm:rounded-[28px]">
              <img
                className="h-[300px] w-full object-cover sm:h-[430px] lg:h-full"
                src={assets.contact_img}
                alt="SomeZorn contact"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/75 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:w-72">
                <p className="text-xs tracking-[0.25em] text-[#8b6a3d]">
                  SOMEZORN STUDIO
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5d4b35]">
                  Curated secondhand pieces with comfort, character and timeless
                  style.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center px-1 py-3 sm:px-4 lg:px-8">
              <p className="mb-3 text-xs tracking-[0.32em] text-[#9b7a4d]">
                OUR STORE
              </p>

              <h2 className="max-w-md text-3xl font-medium leading-tight text-[#3f3325] sm:text-4xl">
                From one closet to another, fashion never dies.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#7b6a55] sm:text-base">
                Based in CNX · crafted with care in TH. For questions about
                products, orders, styling, or collaboration, feel free to reach
                out.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#eadfca] bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9b7a4d]">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-[#4d3d2b]">
                    support@somezorn.com
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eadfca] bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9b7a4d]">
                    Tel
                  </p>
                  <p className="mt-2 text-sm text-[#4d3d2b]">000-000-0000</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#eadfca] bg-white p-5">
                <p className="font-medium text-[#3f3325]">
                  Careers at SomeZorn
                </p>
                <p className="mt-2 text-sm leading-6 text-[#7b6a55]">
                  Interested in working with us or joining future projects? Send
                  us your story.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-full bg-[#4b3825] px-8 py-3 text-sm text-white transition duration-300 hover:bg-[#8b5e34]">
                  Contact Us
                </button>

                <button className="rounded-full border border-[#b99563] bg-white px-8 py-3 text-sm text-[#5d4228] transition duration-300 hover:bg-[#f1dfbf]">
                  View Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;
