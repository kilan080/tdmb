// Opra.jsx
import { useState, useEffect } from "react";
import "./latest_thriller.css";

const tabs = [
  { value: "popular",     path: "https://api.themoviedb.org/3/tv/airing_today" },
  { value: "streaming",   path: "https://api.themoviedb.org/3/movie/now_playing" },
  { value: "onTV",        path: "https://api.themoviedb.org/3/trending/tv/day" },
  { value: "forRent",     path: "https://api.themoviedb.org/3/movie/now_playing" },
  { value: "inTheaters",  path: "https://api.themoviedb.org/3/movie/upcoming" },
];

const token = "YOUR_TMDB_BEARER_TOKEN_HERE";

export default function Opra() {
  const [path, setPath]                   = useState(tabs[0].path);
  const [activeTab, setActiveTab]         = useState(tabs[0].value);
  const [movies, setMovies]               = useState([]);
  const [loading, setLoading]             = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  // Switch tabs
  const handleSetPathname = (value, newPath) => {
    setActiveTab(value);
    setPath(newPath);
  };

  // Fetch movies + their first YouTube trailer (embed URL)
  useEffect(() => {
    if (!path) return;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(path, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch list");
        const { results = [] } = await res.json();

        const withVideos = await Promise.all(
          results.map(async (item) => {
            const mediaType = item.media_type || (item.title ? "movie" : "tv");
            const id = item.id;
            let videoUrl = null;

            // Pick the right endpoint
            const url =
              mediaType === "movie"
                ? `https://api.themoviedb.org/3/movie/${id}/videos`
                : `https://api.themoviedb.org/3/tv/${id}/videos`;

            const trailerRes = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (trailerRes.ok) {
              const { results: vids = [] } = await trailerRes.json();
              const yt = vids.find(
                (v) =>
                  v.site === "YouTube" &&
                  (v.type === "Trailer" || v.type === "Teaser")
              );
              if (yt) {
                // Build embed URL
                videoUrl = `https://www.youtube.com/embed/${yt.key}`;
              }
            }

            return { ...item, videoUrl };
          })
        );

        setMovies(withVideos);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [path]);

  return (
    <>
      <div className="opera-container">
        <header className="opera-header">
          <h2 className="opera-title">Latest Trailer</h2>
          <nav className="opera-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`opera-tab-btn ${
                  activeTab === tab.value ? "opera-active" : ""
                }`}
                onClick={() => handleSetPathname(tab.value, tab.path)}
              >
                {tab.value}
              </button>
            ))}
          </nav>
        </header>

        {loading && <p className="opera-loading">Loading...</p>}

        <div className="opera-movie-list">
          {movies.map((movie, i) => (
            <div className="opera-movie-card" key={movie.id || i}>
              <div className="opera-movie-image-container">
                <img
                  src={
                    movie.backdrop_path ||
                    movie.poster_path ||
                    movie.profile_path
                      ? `https://image.tmdb.org/t/p/w500${
                          movie.backdrop_path ||
                          movie.poster_path ||
                          movie.profile_path
                        }`
                      : "https://via.placeholder.com/500x281?text=No+Image"
                  }
                  alt={movie.title || movie.name || "Untitled"}
                />
                <div
                  className="opera-play-icon"
                  onClick={() => {
                    if (movie.videoUrl) {
                      setSelectedVideoUrl(movie.videoUrl);
                    } else {
                      alert("Trailer not available");
                    }
                  }}
                >
                  ▶
                </div>
              </div>
              <div className="opera-movie-info">
                <p className="opera-movie-title">
                  {movie.title || movie.name}
                </p>
                <p className="opera-movie-subtitle">
                  {movie.overview?.slice(0, 50)}…
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideoUrl && (
        <div
          className="video-modal"
          onClick={() => setSelectedVideoUrl(null)}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-close"
              onClick={() => setSelectedVideoUrl(null)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="500"
              src={selectedVideoUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
