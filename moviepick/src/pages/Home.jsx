import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Redux data
  const movies = useSelector((state) => state.movies.list);

  // Local state for UI features
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // SEARCH FUNCTION
  const handleSearch = async () => {
    if (!query) return;
    const res = await searchMovies(query);
    dispatch(setMovies(res.data.results));
  };

  // Sync Redux → Local state
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  // SORT FUNCTION
  const handleSort = (type) => {
    let sorted = [...filteredMovies];

    if (type === "rating") {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (type === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(sorted);
  };

  // FILTER FUNCTION
  const handleFilter = (rating) => {
    const filtered = movies.filter((m) => m.vote_average >= rating);
    setFilteredMovies(filtered);
  };

  return (
    <div className={darkMode ? "dark" : ""} style={{ padding: "20px" }}>
      
      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CONTROLS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleSort("rating")}>
          Sort by Rating
        </button>

        <button onClick={() => handleSort("title")}>
          Sort by Title
        </button>

        <button onClick={() => handleFilter(7)}>
          Rating ≥ 7
        </button>

        <button onClick={() => setFilteredMovies(movies)}>
          Reset
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>
      </div>

      {/* MOVIE LIST */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default Home;