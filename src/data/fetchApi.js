// services.js
import axios from 'axios';

// The base URL and API key for the TMDB API
const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '1e1ecee8372720407be6ff47a712b42c';


//Function that fetches the popular movies
export const fetchPopularMovies = async (limit = 8) => {
    try {
      // Make a GET request to the /movie/popular endpoint with the API key as a parameter
      const response = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
      // Get the results array from the response data
      const results = response.data.results;
      // Add the poster path to each movie object
      results.forEach((movie) => (movie.poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`));
      // Slice the results array to return only the limit number of movies
      return results.slice(0, limit);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
};


//Function that fetches the newely released movies
export const fetchNewMovies = async (region = 'US', limit = 8) => {
  try {
    const response = await axios.get(
      `${URL}movie/now_playing?api_key=${API_KEY}&region=${region}`
    );
    const results = response.data.results;
    results.forEach(
      (movie) => (movie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    );
    return results.slice(0, limit);
  } catch (error) {
    console.error(error);
  }
};


// A function that fetches korean movies
export const fetchTVshows = async (region = 'KR', limit = 8, genre = 18) => {
  try {
    // Make a GET request to the /movie/now_playing endpoint with the API key, region, and genre as parameters
    // Make a GET request to the /tv/popular endpoint with the API key and original language as parameters
    const response = await axios.get(
      `${URL}tv/popular?api_key=${API_KEY}&with_original_language=ko`
    );
    // Get the results array from the response data
    const results = response.data.results;
    // Add the poster path to each movie object
    results.forEach(
      (movie) => (movie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    );
    // Slice the results array to return only the limit number of movies
    return results.slice(0, limit);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};

export const fetchHorrorMovies = async (region = 'US', limit = 8) => {
  try {
    // Replace the URL with the new one
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`
    );
    const results = response.data.results;
    results.forEach(
      (movie) => (movie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    );
    return results.slice(0, limit);
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllAnime = async (region = 'US', limit = 8) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16`
    );
    const results = response.data.results;
    results.forEach(
      (movie) => (movie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    );
    return results.slice(0, limit);
  } catch (error) {
    console.error(error);
  }
};



export const fetchAllMovies = async (region = 'US', limit = 40) => {
  try {
    let results = [];
    let page = 1;
    while (results.length < limit) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );
      const movies = response.data.results;
      movies.forEach(
        (movie) => (movie.poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`)
      );
      results = results.concat(movies);
      page++;
    }
    return results.slice(0, limit);
  } catch (error) {
    console.error(error);
  }
};




  
// A function that fetches the movie details by id from the TMDB API
export const fetchMovieDetails = async (movie_id) => {
  try {
    // Make a GET request to the /movie/{movie_id} endpoint with the API key and append_to_response parameters
    const response = await axios.get(
      `${URL}movie/${movie_id}?api_key=${API_KEY}&append_to_response=videos,credits,images`
    );
    // Get the data object from the response
    const data = response.data;
    // Add the poster path and backdrop path to the data object
    data.poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    data.backdrop = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
    // Return the data object
    return data;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};