import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './MoviesPage.module.css';

export const MoviesPage = () => {
  const [movie, setMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);

  function onSearchMovie(evt) {
    evt.preventDefault();
    setMovie(evt.target.input.value);
    evt.target.input.value = '';
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d7f38521886bf40bd20fcb4d0d1274a9&query=${movie}`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        setMovieList(data.results);
      })
      .catch(error => console.log(error));
  }, [movie]);

  return (
    <>
      <form onSubmit={onSearchMovie} className={s.form}>
        <input type="text" name="input" className={s.input} />
        <button type="submit" name="button">
          Search
        </button>
      </form>

      {movieList && (
        <ul>
          {movieList.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
