import axios from "axios";

const API_KEY = "4f37172730c513220c97f8426a01ecab";

export const searchMovies = (query) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
};

export const getMovieDetails = (id) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
};