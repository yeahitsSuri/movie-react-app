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
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ReviewsReducer from "./reducers/reviews-reducer";
import AuthReducer from "./reducers/auth-reducer";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import RegisterScreen from './register-page';

const rootReducer = combineReducers({
                                        reviews: ReviewsReducer,
                                        users: AuthReducer
                                    });

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
                                        reducer: persistedReducer,
                                        devTools: process.env.NODE_ENV !== 'production',
                                        middleware: [thunk]
                                    });

export const persistor = persistStore(store);

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
        <Provider store={store}>
            <Router>
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
                        <Route path='/register' element={<RegisterScreen/>}/>

                        <Route
                            path="/search"
                            element={<SearchPage
                                movies={movies}
                                setMovies={setMovies}
                                setSearchKey={setSearchKey}
                                addFavoriteMovie={addFavoriteMovie}/>}/>

                        <Route
                            path="/details/:id"
                            element={
                                <MovieIntroScreen details={movies} favorites={favorites}/>
                            }/>

                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
