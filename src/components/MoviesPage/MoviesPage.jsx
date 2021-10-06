import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { clearLocalStorage } from '../servises/clearLocalStorage';
import s from './MoviesPage.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const [movieList, setMovieList] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  clearLocalStorage();

  function onSearchMovie(evt) {
    evt.preventDefault();
    history.push({
      ...location,
      search: `query=${evt.target.input.value.trim()}`,
    });
    evt.target.input.value = '';
  }

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) {
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d7f38521886bf40bd20fcb4d0d1274a9&query=${query}`,
    )
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        setMovieList(data.results);
        if (data.results.length === 0) {
          toast.error('Enter please correct movie name ');
        }
      })
      .catch(error => toast.error('Ooops.... try please again'));
  }, [query]);

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
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: location,
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <ToastContainer />
    </>
  );
}
