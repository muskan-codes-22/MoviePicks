function Sidebar({ setSort, setFilter, toggleDark }) {
  return (
    <div>
      <h3>Filters</h3>

      <button onClick={() => setSort("rating")}>
        Sort by Rating
      </button>

      <button onClick={() => setSort("title")}>
        Sort by Title
      </button>

      <button onClick={() => setFilter(7)}>
        Rating &gt; 7
      </button>

      <button onClick={toggleDark}>
        Dark Mode
      </button>
    </div>
  );
}

export default Sidebar;