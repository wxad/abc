const Cover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute flex items-center justify-center inset-0 bg-size-[40px_40px] border border-neutral-300 overflow-hidden rounded-full text-neutral-400"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <svg
          className="rotate-90"
          width="75"
          height="75"
          viewBox="0 0 24 24"
          style={{
            mask: "linear-gradient(45deg, transparent, black)",
          }}
        >
          <path
            fill="currentColor"
            d="M7.06 8.94L5 8l2.06-.94L8 5l.94 2.06L11 8l-2.06.94L8 11zM8 21l.94-2.06L11 18l-2.06-.94L8 15l-.94 2.06L5 18l2.06.94zm-3.63-8.63L3 13l1.37.63L5 15l.63-1.37L7 13l-1.37-.63L5 11zM12 12c0-2.73 1.08-5.27 2.75-7.25L12 2h7v7l-2.82-2.82C14.84 7.82 14 9.88 14 12c0 3.32 2.1 6.36 5 7.82V22c-4.09-1.59-7-5.65-7-10"
          />
        </svg>
      </div>
    </div>
  )
}

export default Cover
