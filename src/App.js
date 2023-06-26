import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import HomePage from "./home-page/HomePage";
import MovieIntroScreen from "./details-page/MovieIntroScreen"
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
    const adminFavorites = [];
    localStorage.setItem("admin-favorites", JSON.stringify(adminFavorites));

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
                                <HomePage/>
                            }
                        />

                        <Route path="/login" element={<LoginScreen/>}/>

                        <Route
                            path="/search"
                            element={<SearchPage/>}/>

                        <Route path='/register' element={<RegisterScreen/>}/>

                        <Route
                            path="/details/:id"
                            element={
                                <MovieIntroScreen/>
                            }/>

                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </Provider>
        </Router>
    );
}

export default App;