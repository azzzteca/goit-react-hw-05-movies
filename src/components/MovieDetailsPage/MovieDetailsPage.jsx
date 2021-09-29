import { useState, useEffect } from 'react';
import { useParams, NavLink, Route, useHistory } from 'react-router-dom';
import { MovieCastsView } from '../views/MovieCastsView';
import { MovieReviewsView } from '../views/MovieReviewsView';
import s from './MovieDetailsPage.module.css';

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

  const history = useHistory();

  function loggingHistory() {
    history.goBack();
  }

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

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
        console.log(data);
        setMovie(data);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      <button type="button" className={s.goBackButton} onClick={loggingHistory}>
        Go back
      </button>
      {movie ? (
        <>
          <div className={s.movieCard}>
            <div className={s.movieThumb}>
              <img
                src={`${BASE_IMG_URL}${movie.poster_path}`}
                alt={movie.name ?? movie.original_title}
                className={s.moviePoster}
              />
            </div>
            <div>
              <h2>
                {movie.name ?? movie.original_title} {movie.release_date}
              </h2>
              <p>User score: {movie.vote_average * 10}</p>
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

          <Route path="/movies/:movieId/casts">
            <MovieCastsView url={BASE_IMG_URL} />
          </Route>

          <Route path="/movies/:movieId/reviews">
            <MovieReviewsView />
          </Route>
        </>
      ) : (
        <h3>Ooops, somting wrong</h3>
      )}
    </>
  );
};
