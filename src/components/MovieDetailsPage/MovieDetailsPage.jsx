import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { clearLocalStorage } from '../servises/clearLocalStorage';
import noPoster from '../../images/noPoster.jpg';
import s from './MovieDetailsPage.module.css';

const MovieCastsView = lazy(() => import('../views/MovieCastsView'));
const MovieReviewsView = lazy(() => import('../views/MovieReviewsView.jsx'));

clearLocalStorage();

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    if (!location.state) return;
    localStorage.setItem('state', JSON.stringify(location.state));
  });

  function goBack() {
    const goBack = JSON.parse(localStorage.getItem('state'));
    history.push(goBack ?? '/');
    clearLocalStorage();
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      <button type="button" className={s.goBackButton} onClick={goBack}>
        Go back
      </button>
      {movie ? (
        <>
          <div className={s.movieCard}>
            <div className={s.movieThumb}>
              <img
                src={
                  movie.poster_path
                    ? `${BASE_IMG_URL}${movie.poster_path}`
                    : `${noPoster}`
                }
                alt={movie.name ?? movie.original_title}
                className={s.moviePoster}
              />
            </div>
            <div>
              <h2>
                {movie.name ?? movie.original_title}{' '}
                {movie.release_date.substring(0, 4)}
              </h2>
              <p>User score: {movie.vote_average * 10} %</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className={s.genresList}>
                {movie.genres.map(genre => {
                  return (
                    <li key={genre.id} className={s.genreItem}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={s.additionalInfo}>
            <h4>Additional information</h4>
            <ul>
              <li>
                <NavLink
                  to={`/movies/${movieId}/casts`}
                  className={s.additionalInfoLink}
                >
                  Casts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/movies/${movieId}/reviews`}
                  className={s.additionalInfoLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<h2>Загружаем ...</h2>}>
            <Route path="/movies/:movieId/casts">
              <MovieCastsView url={BASE_IMG_URL} />
            </Route>

            <Route path="/movies/:movieId/reviews">
              <MovieReviewsView />
            </Route>
          </Suspense>
        </>
      ) : (
        <>
          <h3>Ooops, sorry .....</h3>
          <h3>There is no info about this movie</h3>
        </>
      )}
    </>
  );
}
