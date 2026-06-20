{
  list.map((item) => (
    <div
      key={item._id}
      className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-gray-100 px-4 py-4 text-sm text-gray-600 transition-all duration-300 last:border-b-0 hover:bg-gray-50/80 md:grid-cols-[90px_2fr_1fr_1fr_90px] md:px-5"
    >
      <img
        className="h-14 w-14 rounded-2xl border border-gray-200 object-cover"
        src={item.image?.[0]}
        alt={item.name}
      />

      <div className="min-w-0">
        <p className="truncate font-medium text-gray-900">{item.name}</p>
        <p className="mt-1 text-xs text-gray-500 md:hidden">
          {item.category} · {currency}
          {item.price}
        </p>
      </div>

      <p className="hidden text-gray-500 md:block">{item.category}</p>

      <p className="hidden font-medium text-gray-900 md:block">
        {currency}
        {item.price}
      </p>

      <button
        onClick={() => removeProduct(item._id)}
        className="rounded-full border border-rose-100 bg-rose-50/80 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-all duration-300 hover:bg-rose-100 hover:text-rose-700"
      >
        Remove
      </button>
    </div>
  ));
}
