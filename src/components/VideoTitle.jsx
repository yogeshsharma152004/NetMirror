import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-end pb-28 sm:pb-24 lg:pb-32 px-5 sm:px-8 lg:px-12 text-white "
      style={{
        background:
          "linear-gradient(to top,rgba(7,5,15,0.85) 0%, rgba(7,5,15,0.4) 50%, transparent 100%)",
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-3 sm:mb-4 w-fit px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black tracking-widest"
        style={{
          background: "rgba(251,191,36,0.1)",
          border: "1px solid rgba(251,191,36,0.3)",
          color: "#fbbf24",
        }}
      >
        ▶ NOW PLAYING
      </div>

      {/* Title */}
      <h1
        className="text-2xl sm:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight tracking-tight max-w-xs sm:max-w-lg lg:max-w-2xl"
        style={{
          background: "linear-gradient(135deg,#fff 40%,#c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          wordBreak: "break-word",
        }}
      >
        {title}
      </h1>

      {/* Overview — hidden on mobile, visible sm+ */}
      <p
        className="hidden sm:block w-full sm:w-8/12 lg:w-5/12 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          className="flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-white text-xs sm:text-sm cursor-pointer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
        >
          ▶ Play Now
        </button>
        <button
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
        >
          + Watchlist
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
