import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

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