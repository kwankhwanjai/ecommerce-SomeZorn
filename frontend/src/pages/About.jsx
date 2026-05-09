import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
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
          <b className="text-gray-800">Our Mission</b>
          <p>
            We are committed to reducing waste through thoughtful curation,
            while encouraging a more conscious and personal approach to style.
            Less excess, more intention — that’s the direction we move in.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Quality Assurance :</b>
          <p className="text-gray-500">
            We carefully inspect every item to ensure quality, cleanliness, and
            wearability. Each piece is selected with attention to detail, so you
            can feel confident in what you wear.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-500">
            We make second-hand shopping simple and effortless. From browsing to
            checkout, every step is designed to be smooth, clear, and easy to
            use.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Eceptional Customer Service :</b>
          <p className="text-gray-500">
            We are committed to providing a smooth and reliable experience, with
            clear communication and attentive support at every step. Every
            interaction is handled with care to ensure you feel confident,
            valued, and satisfied.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
