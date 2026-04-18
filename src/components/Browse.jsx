import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import GptSearch from "./GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();
  useHorrorMovies();

  return (
    <div className="min-h-screen relative" style={{ background: "#07050f" }}>
      {/* Background Orbs */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.15),transparent 70%)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.08),transparent 70%)",
          top: "200px",
          right: "-80px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.1),transparent 70%)",
          bottom: "200px",
          left: "35%",
        }}
      />

      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
