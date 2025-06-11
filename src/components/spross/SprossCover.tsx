const Cover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute flex items-center justify-center inset-0 bg-[length:40px_40px] border border-neutral-300 overflow-hidden rounded-full text-neutral-400"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <svg
          width="75"
          height="75"
          viewBox="0 0 24 24"
          style={{
            mask: "linear-gradient(-45deg, transparent, black)",
          }}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M7 20h10m-7 0c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3c-1.2-.6-2.3-1.9-3-4.2c2.8-.5 4.4 0 5.5.8M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4c1-1 1.6-2.3 1.7-4.6c-2.7.1-4 1-4.9 2" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Cover
