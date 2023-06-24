import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import HomePage from './screen/HomePage';
import MovieIntroScreen from './screen/MovieIntroScreen';
import SearchBar from './components/SearchBar'
import WebHeader from './components/WebHeader';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovieFromAPI = async (searchKey) => {
    const url = `http://www.omdbapi.com/?s=${searchKey}&apikey=a52e368a`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const getPopularMovies = async () => {
    const url = `http://www.omdbapi.com/?s=&apikey=a52e368a&plot=full&type=movie&r=json`;
    const response = await fetch(url);
    const responseJson = await response.json();
  
    if (responseJson.Response === 'True') {
      const sortedMovies = responseJson.Search.sort((a, b) => {
        return parseInt(b.imdbVotes.replace(/,/g, ''), 10) - parseInt(a.imdbVotes.replace(/,/g, ''), 10);
      });
      const popularMovies = sortedMovies.slice(0, 20);
      setPopularMovies(popularMovies);
    } else {
      console.error(responseJson.Error);
    }
  };

  useEffect(() => {
    getMovieFromAPI(searchKey);
    getPopularMovies();
  }, [searchKey]);

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('movie-react-app-favs'));
    setFavourites(movieFavs || []); // use an empty array if movieFavs is null
  }, []);

  const saveToLocal = (item) => {
    localStorage.setItem('movie-react-app-favs', JSON.stringify(item));
  };

  const addFavouriteMovie = (movie) => {
    // Check if the movie is already in the favorites list
    const isAlreadyFavorite = favourites.some((favorite) => favorite.imdbID === movie.imdbID);
  
    // If the movie is not already in the favorites list, add it
    if (!isAlreadyFavorite) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocal(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocal(newFavouriteList);
  };

  return (
    <Router>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-3 mb-4'>
          <WebHeader header='FakeIMDB'/>
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route
            path="/home"
            element={
              <HomePage
                movies={movies}
                favourites={favourites}
                popularMovies={popularMovies}
                addFavouriteMovie={addFavouriteMovie}
                removeFavouriteMovie={removeFavouriteMovie}
              />
            }
          />

          <Route
            path="/movies/:id"
            element={
              <MovieIntroScreen movies={movies} favourites={favourites} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
