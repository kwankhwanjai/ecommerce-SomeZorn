import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="mx-auto mt-24 max-w-3xl px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
        Join Our Community
      </p>

      <h2 className="mt-4 text-3xl font-medium text-stone-900 sm:text-4xl">
        Vintage finds worth discovering
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
        Subscribe to receive updates on new arrivals, curated collections, and
        special releases from SOMEZORN.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mx-auto mt-10 flex max-w-2xl flex-col overflow-hidden rounded-xl border border-stone-300 bg-white sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="flex-1 px-5 py-4 text-sm outline-none"
        />

        <button
          type="submit"
          className="bg-stone-900 px-8 py-4 text-xs font-medium uppercase tracking-wider text-white transition hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;
