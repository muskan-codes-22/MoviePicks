import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const rating = movie.vote_average;
  const hasRating = rating && rating > 0;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="card-poster-wrap">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", background: "var(--surface-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-lo)", fontSize: "40px"
            }}>🎬</div>
          )}
          <div className={`card-rating ${!hasRating ? "no-rating" : ""}`}>
            ★ {hasRating ? rating.toFixed(1) : "N/A"}
          </div>
          <div className="card-overlay">
            <span className="card-overlay-cta">View Details →</span>
          </div>
        </div>
        <div className="card-info">
          <p className="card-title">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;