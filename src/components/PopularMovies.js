import React, { useState, useEffect } from 'react';

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

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
    getPopularMovies();
  }, []);

  return (
    <div>
      {popularMovies.map((movie) => (
        <div key={movie.imdbID}>{movie.Title}</div>
      ))}
    </div>
  );
};

export default PopularMovies;
