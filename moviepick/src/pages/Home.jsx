import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSort, setActiveSort] = useState(null);
  const [activeNav, setActiveNav] = useState("discover");

  // Dashboard tracking
  const [searchHistory, setSearchHistory] = useState([]);
  const [totalSearches, setTotalSearches] = useState(0);
  const [lastSearch, setLastSearch] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await searchMovies(query);
    dispatch(setMovies(res.data.results));
    setActiveSort(null);
    setActiveNav("discover");

    const newEntry = { term: query, count: res.data.results.length };
    setSearchHistory((prev) => [newEntry, ...prev].slice(0, 5));
    setTotalSearches((prev) => prev + 1);
    setLastSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSort = (type) => {
    let sorted = [...filteredMovies];
    if (type === "rating") sorted.sort((a, b) => b.vote_average - a.vote_average);
    if (type === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredMovies(sorted);
    setActiveSort(type);
  };

  const handleFilter = (rating) => {
    setFilteredMovies(movies.filter((m) => m.vote_average >= rating));
    setActiveSort("filter7");
  };

  const handleReset = () => {
    setFilteredMovies(movies);
    setActiveSort(null);
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    searchMovies(term).then((res) => {
      dispatch(setMovies(res.data.results));
      setLastSearch(term);
      setActiveNav("discover");
    });
  };

  const avgRating =
    movies.length > 0
      ? (movies.reduce((s, m) => s + m.vote_average, 0) / movies.length).toFixed(1)
      : "—";

  const topRated = movies.length > 0
    ? [...movies].sort((a, b) => b.vote_average - a.vote_average)[0]
    : null;

  return (
    <div className={`layout ${darkMode ? "dark" : "light"}`}>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">🎥</span>
          <span className="logo-text">Movie<b>Picks</b></span>
        </div>

        <p className="sidebar-section-label">NAVIGATION</p>
        <nav className="sidebar-nav">
          {[
            { id: "discover", icon: "🎬", label: "Discover" },
            { id: "trending", icon: "🔥", label: "Trending" },
          ].map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "nav-item--active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dashboard stats */}
        <p className="sidebar-section-label">DASHBOARD</p>
        <div className="dash-stats">
          <div className="dash-stat">
            <span className="dash-stat-value">{totalSearches}</span>
            <span className="dash-stat-label">Searches</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value">{movies.length}</span>
            <span className="dash-stat-label">Results</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value">{avgRating}</span>
            <span className="dash-stat-label">Avg ★</span>
          </div>
        </div>

        {topRated && (
          <div className="dash-top-card">
            <span className="dash-top-label">🏆 Top Pick</span>
            <p className="dash-top-title">{topRated.title}</p>
            <span className="dash-top-score">★ {topRated.vote_average.toFixed(1)}</span>
          </div>
        )}

        {/* Recent searches */}
        {searchHistory.length > 0 && (
          <>
            <p className="sidebar-section-label">RECENT SEARCHES</p>
            <div className="recent-list">
              {searchHistory.map((entry, i) => (
                <button
                  key={i}
                  className="recent-item"
                  onClick={() => handleQuickSearch(entry.term)}
                >
                  <span className="recent-icon">🔍</span>
                  <span className="recent-term">{entry.term}</span>
                  <span className="recent-badge">{entry.count}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="sidebar-footer">
          <button
            className={`dark-toggle ${darkMode ? "dark-toggle--on" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="toggle-track"><span className="toggle-thumb" /></span>
            <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <div className="main-panel">
        <header className="topbar">
          <div>
            <h1 className="topbar-title">Discover Movies</h1>
            <p className="topbar-sub">
              {lastSearch ? `Showing results for "${lastSearch}"` : "Search and explore millions of titles"}
            </p>
          </div>
          <div className="topbar-avatar">M</div>
        </header>

        <div className="search-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-search" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="filter-bar">
          <span className="filter-label">Sort & Filter</span>
          <button className={`chip ${activeSort === "rating" ? "chip--active" : ""}`} onClick={() => handleSort("rating")}>↓ Top Rated</button>
          <button className={`chip ${activeSort === "title" ? "chip--active" : ""}`} onClick={() => handleSort("title")}>A–Z Title</button>
          <button className={`chip ${activeSort === "filter7" ? "chip--active" : ""}`} onClick={() => handleFilter(7)}>★ Rating ≥ 7</button>
          <button className="chip chip--reset" onClick={handleReset}>✕ Reset</button>
          {filteredMovies.length > 0 && (
            <span className="results-count">{filteredMovies.length} results</span>
          )}
        </div>

        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <p className="empty-title">Search for a movie to get started</p>
              <p className="empty-sub">Try "Inception", "Raazi", or "Dhurandhar"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;