import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt=""
        />
        <h3>{movie.title}</h3>
        <p>{movie.vote_average}</p>
      </div>
    </Link>
  );
}

export default MovieCard;