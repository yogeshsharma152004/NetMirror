import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Watch Everywhere",
      desc: "Stream on your phone, tablet, laptop, and TV without paying more.",
      icon: "📺",
    },
    {
      title: "AI Powered Search",
      desc: "Tell our AI what mood you're in and get perfect movie recommendations instantly.",
      icon: "✦",
    },
    {
      title: "Your Watchlist",
      desc: "Save movies you love and access them anytime from any device.",
      icon: "🎬",
    },
    {
      title: "New Releases",
      desc: "Always up to date with the latest trending and now playing movies worldwide.",
      icon: "🔥",
    },
  ];

  const faqs = [
    {
      q: "What is NetMirror?",
      a: "NetMirror is an AI-powered movie discovery platform. Browse trending movies, get AI recommendations, and build your personal watchlist.",
    },
    {
      q: "How does AI Search work?",
      a: "Just type what kind of movie you want — like 'scary movies for night' or 'feel good romantic films' — and our AI will suggest the perfect matches.",
    },
    {
      q: "Is NetMirror free to use?",
      a: "Yes! NetMirror is completely free. Just create an account and start exploring thousands of movies.",
    },
    {
      q: "Can I save movies to watch later?",
      a: "Absolutely! Add any movie to your Watchlist and access it anytime after logging in.",
    },
  ];

  return (
    <div
      className="min-h-screen text-white relative"
      style={{ background: "#07050f" }}
    >
      {/* Background Orbs */}
      <div
        className="orb"
        style={{
          width: "clamp(300px, 50vw, 600px)",
          height: "clamp(300px, 50vw, 600px)",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.18),transparent 70%)",
          top: "-150px",
          left: "-150px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(200px, 40vw, 500px)",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.1),transparent 70%)",
          top: "300px",
          right: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "clamp(200px, 35vw, 400px)",
          height: "clamp(200px, 35vw, 400px)",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.12),transparent 70%)",
          bottom: "200px",
          left: "30%",
        }}
      />

      {/* Header */}
      <div
        className="fixed top-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between"
        style={{
          background: "rgba(7,5,15,0.55)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-black"
            style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
          >
            ▶
          </div>
          <div className="text-lg sm:text-xl font-black tracking-widest">
            <span className="text-white">NET</span>
            <span
              style={{
                background: "linear-gradient(135deg,#a855f7,#fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MIRROR
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(251,191,36,0.2))",
            border: "1px solid rgba(168,85,247,0.4)",
            color: "#c084fc",
          }}
        >
          Sign In
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8  pt-20 "
        style={{
          background:
            "linear-gradient(to bottom,rgba(7,5,15,0) 0%,rgba(7,5,15,0.8) 100%)",
        }}
      >
        <div className="relative z-10 max-w-3xl w-full">
          <div
            className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-black tracking-widest"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            ✦ AI POWERED MOVIE DISCOVERY
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight tracking-tight"
            style={{
              background:
                "linear-gradient(135deg,#fff 30%,#c084fc 70%,#fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Unlimited Movies, Discover More
          </h1>

          <p
            className="text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Explore thousands of movies, get AI-powered recommendations, and
            build your personal watchlist — all in one place.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-7 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-base sm:text-lg text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
          >
            Get Started →
          </button>
        </div>

        <div
          className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <span className="text-xs tracking-widest">SCROLL DOWN</span>
          <div
            className="w-px h-6 sm:h-8"
            style={{
              background:
                "linear-gradient(to bottom,rgba(168,85,247,0.5),transparent)",
            }}
          />
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 relative z-10">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
          <div
            className="px-3 py-1 rounded-lg text-xs font-black tracking-widest"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            ✦ TRENDING NOW
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Top Picks This Week
          </h2>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden p-4 sm:p-6"
          style={{
            background: "rgba(168,85,247,0.04)",
            border: "1px solid rgba(168,85,247,0.12)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="text-center">
              <p
                className="text-lg sm:text-2xl font-black mb-4"
                style={{
                  background: "linear-gradient(135deg,#fff,#c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sign in to see trending movies
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-white cursor-pointer text-sm sm:text-base"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#9f67ff)",
                }}
              >
                Sign In Now
              </button>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 filter blur-sm pointer-events-none overflow-hidden">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-xl"
                style={{
                  width: "clamp(100px, 15vw, 140px)",
                  height: "clamp(150px, 22vw, 200px)",
                  background: `linear-gradient(${135 + i * 20}deg, rgba(120,60,255,0.3), rgba(255,200,50,0.15))`,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-black tracking-widest"
            style={{
              background: "rgba(168,85,247,0.1)",
              border: "1px solid rgba(168,85,247,0.2)",
              color: "#c084fc",
            }}
          >
            ✦ FEATURES
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{
              background: "linear-gradient(135deg,#fff,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            More Reasons to Join
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(168,85,247,0.12)",
              }}
            >
              <div
                className="absolute top-0 left-4 right-4 h-px"
                style={{
                  background:
                    "linear-gradient(to right,transparent,rgba(168,85,247,0.4),transparent)",
                }}
              />
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-black mb-2 text-white">
                {feature.title}
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{
              background: "linear-gradient(135deg,#fff,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(168,85,247,0.12)",
              }}
            >
              <summary
                className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold cursor-pointer flex items-center justify-between list-none"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {faq.q}
                <span style={{ color: "#a855f7" }}>+</span>
              </summary>
              <div
                className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        className="px-4 sm:px-8 py-16 sm:py-20 text-center relative z-10"
        style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}
      >
        <h2
          className="text-3xl sm:text-4xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg,#fff,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ready to Watch?
        </h2>
        <p
          className="text-xs sm:text-sm mb-6 sm:mb-8"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Join NetMirror today — it's free!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-base sm:text-lg text-white cursor-pointer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
        >
          Get Started →
        </button>
      </div>

      {/* Footer */}
      <div
        className="px-4 sm:px-8 py-6 sm:py-8 relative z-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
            >
              ▶
            </div>
            <span className="text-sm font-black tracking-widest">
              <span className="text-white">NET</span>
              <span
                style={{
                  background: "linear-gradient(135deg,#a855f7,#fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MIRROR
              </span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 NetMirror. Built with ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
