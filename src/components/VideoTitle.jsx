import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-end pb-24 px-12 text-white"
      style={{
        background:
          "linear-gradient(to right,rgba(7,5,15,0.92) 40%,transparent 80%)",
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-4 w-fit px-3 py-1 rounded-lg text-xs font-black tracking-widest"
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
        className="text-6xl font-black mb-4 leading-none tracking-tight"
        style={{
          background: "linear-gradient(135deg,#fff 40%,#c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h1>

      {/* Overview */}
      <p
        className="w-5/12 text-sm leading-relaxed mb-6"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-black text-white text-sm cursor-pointer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
        >
          ▶ Play Now
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer"
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
