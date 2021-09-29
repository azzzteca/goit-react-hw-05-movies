import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './HomePage.module.css';

export const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/all/day?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US',
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Trending today</h1>
      </div>

      {movies && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} className={s.link}>
                  {movie.name ?? movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
