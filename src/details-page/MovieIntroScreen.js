import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch} from "react-redux";
import DetailsUserList from "../components/DetailsUserList";

const MovieIntroScreen = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const dispatch = useDispatch();
  const thisMovieFavoredBy = localStorage.getItem(id);
  const thisMovieFavoredByList = thisMovieFavoredBy ? JSON.parse(thisMovieFavoredBy) : [];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `http://www.omdbapi.com/?i=${id}&apikey=a52e368a`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setMovieDetails(responseJson);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  if (movieDetails.Response === 'False') {
    return <div>CANNOT FIND THIS MOVIE.</div>;
  }

  return (
    <div className='row mt-3'>
      <div className='col-md-4 d-none d-md-block d-lg-block d-xl-block d-xxl-block list-group'>
        <img src={movieDetails.Poster} alt={movieDetails.Title} style={{ width: '100%' }} />
      </div>
      <div className='col-md-6'>
        <h1>{movieDetails.Title}</h1>
        <p>
          <strong>Release Year:</strong> {movieDetails.Year}
        </p>
        <p>
          <strong>Movie Type:</strong> {movieDetails.Type}
        </p>
        <p>
          <strong>Rated:</strong> {movieDetails.Rated}
        </p>
        <p>
          <strong>Runtime:</strong> {movieDetails.Runtime}
        </p>
        <p>
          <strong>Genre:</strong> {movieDetails.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movieDetails.Director}
        </p>
        <p>
          <strong>Writer:</strong> {movieDetails.Writer}
        </p>
        <p>
          <strong>Actors:</strong> {movieDetails.Actors}
        </p>
        <p>
          <strong>Plot:</strong> {movieDetails.Plot}
        </p>
        <p>
          <strong>Language:</strong> {movieDetails.Language}
        </p>
        <p>
          <strong>Country:</strong> {movieDetails.Country}
        </p>
        <p>
          <strong>Awards:</strong> {movieDetails.Awards}
        </p>
        <h3>Ratings:</h3>
        {movieDetails.Ratings.map((rating, index) => (
          <div key={index}>
            <p>
              <strong>Source:</strong> {rating.Source}
              <strong> Rating:</strong> {rating.Value}
            </p>
          </div>
        ))}
        <p>
          <strong>Metascore:</strong> {movieDetails.Metascore}
        </p>
        <p>
          <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
        </p>
        <p>
          <strong>IMDb Votes:</strong> {movieDetails.imdbVotes}
        </p>
        <p>
          <strong>Total Seasons:</strong> {movieDetails.totalSeasons}
        </p>
      </div>

      <div className="col-md-2">
        <h3>Users who added this movie to their favorites</h3>
        <DetailsUserList users={thisMovieFavoredByList}/>
      </div>

    </div>
  );
};

export default MovieIntroScreen;
