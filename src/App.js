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
  const [favorites, setFavorites] = useState([]);

  const getMovieFromAPI = async (searchKey) => {
    const url = `http://www.omdbapi.com/?s=${searchKey}&apikey=a52e368a`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieFromAPI(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('movie-react-app-favs'));
    setFavorites(movieFavs || []); // use an empty array if movieFavs is null
  }, []);

  const saveToLocal = (item) => {
    localStorage.setItem('movie-react-app-favs', JSON.stringify(item));
  };

  const addFavoriteMovie = (movie) => {
    // Check if the movie is already in the favorites list
    const isAlreadyFavorite = favorites.some((favorite) => favorite.imdbID === movie.imdbID);
  
    // If the movie is not already in the favorites list, add it
    if (!isAlreadyFavorite) {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList);
      saveToLocal(newFavoriteList);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocal(newFavoriteList);
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
                favorites={favorites}
                addFavoriteMovie={addFavoriteMovie}
                removeFavoriteMovie={removeFavoriteMovie}
              />
            }
          />

          <Route
            path="/movies/:id"
            element={
              <MovieIntroScreen movies={movies} favorites={favorites} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
