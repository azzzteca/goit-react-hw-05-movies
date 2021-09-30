import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import s from './MoviesPage.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const [movie, setMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);

  function onSearchMovie(evt) {
    evt.preventDefault();
    setMovie(evt.target.input.value.trim());
    evt.target.input.value = '';
  }

  useEffect(() => {
    if (!movie) {
      return;
    }
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d7f38521886bf40bd20fcb4d0d1274a9&query=${movie}`,
    )
      .then(response => {
        if (!response.ok) {
          toast('Wow so easy!');
          throw new Error();
        }
        return response.json();
      })
      .then(data => {
        setMovieList(data.results);
      })
      .catch(toast.error('Please insert correct movie name'));
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
      <ToastContainer />
    </>
  );
}
