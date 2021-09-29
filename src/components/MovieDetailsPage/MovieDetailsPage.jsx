// import { useState, useEffect } from 'react';
// import { Route, NavLink, useParams } from 'react-router-dom';
// import { MovieCastsView } from '../MovieCastsView/MovieCastsView';
// import { MovieReviewsView } from '../MovieReviewsView/MovieReviewsView';

// import s from './MovieDetailsPage.module.css';

// export function MovieDetailsPage() {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);

//   // const fetchMovieInfo = async () => {
//   //   const response = await fetch(
//   //     `https://api.themoviedb.org/3/movie/${movieId}?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US`,
//   //   );

//   //   return response.ok ? await response.json() : new Error(response.status);
//   // };

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US`,
//     )
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setMovie(data);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//     // fetchMovieInfo().then(setMovie);
//   }, [movieId]);

//   return (
//     <>
//       {movie && (
//         <>
//           <div className={s.movieCard}>
//             <img
//               // src="https://akniga.org/uploads/media/topic/2020/06/28/16/preview/69e87e3223491fec6b50_400x.jpg"
//               alt={movie.name ?? movie.original_title}
//             />
//             <div>
//               <h1>Фильм {movie.name ?? movie.original_title}</h1>
//               <p>User csore: {movie.vote_average * 10} %</p>
//               <h3>Overiew</h3>
//               <p>{movie.overview}</p>

//               <h3>Genres</h3>
//               <p>
//                 {/* <ul className={s.genresList}>
//                   {movie.genres.map(genre => {
//                     return (
//                       <li key={genre.id} className={s.genre}>
//                         {genre.name}
//                       </li>
//                     );
//                   })}
//                 </ul> */}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h5>Additional information</h5>
//             <ul>
//               <li>
//                 <NavLink exact to={`/movies/${movieId}/casts`}>
//                   Casts
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink exact to={`/movies/${movieId}/reviews`}>
//                   Reviews
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </>
//       )}

//       <Route exact path="/movies/:movieId/casts">
//         <MovieCastsView />
//       </Route>

//       <Route exact path="/movies/:movieId/reviews">
//         <MovieReviewsView />
//       </Route>
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import { useParams, NavLink, Route } from 'react-router-dom';
import { MovieCastsView } from '../views/MovieCastsView';
import { MovieReviewsView } from '../views/MovieReviewsView';
import s from './MovieDetailsPage.module.css';

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

  const BASE_URL = 'https://image.tmdb.org/t/p/original';

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
  }, []);

  return (
    <>
      {movie && (
        <>
          <button type="button" className={s.goBackButton}>
            Go back
          </button>
          <div className={s.movieCard}>
            <div className={s.movieThumb}>
              <img
                src={`${BASE_URL}${movie.poster_path}`}
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
            <MovieCastsView url={BASE_URL} />
          </Route>

          <Route path="/movies/:movieId/reviews">
            <MovieReviewsView />
          </Route>
        </>
      )}
    </>
  );
};
