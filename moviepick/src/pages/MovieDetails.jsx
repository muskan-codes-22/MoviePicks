import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const darkMode = true;

  useEffect(() => {
    getMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) {
    return (
      <div className={`details-page ${darkMode ? "dark" : "light"}`}>
        <div className="empty-state">
          <div className="empty-icon"></div>
          <p className="empty-title">Loading movie details...</p>
        </div>
      </div>
    );
  }

  const genres = movie.genres ? movie.genres.map((g) => g.name) : [];
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return (
    <div className={`details-page ${darkMode ? "dark" : "light"}`}>
      <div className="details-topbar">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back to results
        </button>
      </div>

      <div className="details-body">
        <div className="details-left">
          <div className="details-poster">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="details-poster-placeholder">🎬</div>
            )}
          </div>

          <div className="details-facts">
            {movie.vote_average > 0 && (
              <div className="fact-item">
                <span className="fact-label">Rating</span>
                <span className="fact-value rating-gold">
                  ★ {movie.vote_average.toFixed(1)} / 10
                </span>
              </div>
            )}

            {year && (
              <div className="fact-item">
                <span className="fact-label">Year</span>
                <span className="fact-value">{year}</span>
              </div>
            )}

            {runtime && (
              <div className="fact-item">
                <span className="fact-label">Runtime</span>
                <span className="fact-value">{runtime}</span>
              </div>
            )}

            {movie.original_language && (
              <div className="fact-item">
                <span className="fact-label">Language</span>
                <span className="fact-value">
                  {movie.original_language.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="details-right">
          <h1 className="details-title">{movie.title}</h1>

          {movie.tagline && (
            <p className="details-tagline">"{movie.tagline}"</p>
          )}

          {genres.length > 0 && (
            <div className="details-genres">
              {genres.map((g) => (
                <span key={g} className="genre-pill">
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="details-divider"></div>

          <h2 className="details-section-title">Overview</h2>

          <p className="details-overview">
            {movie.overview || "No overview available for this title."}
          </p>

          {movie.vote_count > 0 && (
            <p className="details-votes">
              {movie.vote_count.toLocaleString()} votes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;