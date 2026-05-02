import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return (
    <div className="details-page dark">
      <div className="empty-state">
        <div className="empty-icon">⏳</div>
        <p className="empty-title">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="details-page dark">
      {movie.backdrop_path && (
        <div className="details-backdrop">
          <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="" />
        </div>
      )}

      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="details-body">
        <div className="details-poster">
          <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="details-meta">
          <h1>{movie.title}</h1>
          <div className="details-rating">★ {movie.vote_average?.toFixed(1)} / 10</div>
          <p className="details-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;