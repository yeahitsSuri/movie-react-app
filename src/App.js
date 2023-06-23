import React, { useState } from 'react';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([
    {
      "Title": "Game of Thrones",
      "Year": "2011–2019",
      "imdbID": "tt0944947",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg"
  },
  {
      "Title": "Squid Game",
      "Year": "2021–",
      "imdbID": "tt10919420",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg"
  },
  {
      "Title": "Sherlock Holmes: A Game of Shadows",
      "Year": "2011",
      "imdbID": "tt1515091",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQwMzQ5Njk1MF5BMl5BanBnXkFtZTcwNjIxNzIxNw@@._V1_SX300.jpg"
  },
  ])
  return <div>
    <MovieList movies = {movies}/>
  </div>
};

export default App;
