import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import HomePage from "./home-page/HomePage";
import MovieIntroScreen from './home-page/MovieIntroScreen';
import WebHeader from './components/WebHeader';
import SearchPage from './search-page/index.js';
import ProfilePage from './profile-page';
import LoginScreen from "./log-in-page";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";

import {Provider} from "react-redux";
import RegisterScreen from './register-page';

const store = configureStore({
                                 reducer: {
                                     user: authReducer
                                 }
                             });

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
      
      if (movieFavs) {
          const sortedFavorites = movieFavs.slice().reverse();
          setFavorites(sortedFavorites);
      } else {
          setFavorites(movieFavs || []);
      }
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
            <Provider store={store}>
                <div className='container-fluid movie-app'>
                    <div className='row d-flex align-items-center mt-3 mb-4'>
                        <WebHeader header='FakeIMDB'/>
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

                        <Route path="/login" element={<LoginScreen/>}/>

                        <Route
                            path="/search"
                            element={<SearchPage
                                movies={movies}
                                setMovies={setMovies}
                                setSearchKey={setSearchKey}
                                addFavoriteMovie={addFavoriteMovie}/>}/>

                        <Route path='/register' element={<RegisterScreen/>}/>

                        <Route
                            path="/details/:id"
                            element={
                                <MovieIntroScreen details={movies} favorites={favorites}/>
                            }/>

                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
