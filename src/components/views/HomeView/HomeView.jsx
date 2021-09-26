import { Link } from 'react-router-dom';

export function HomeView({ movies }) {
  const { results } = movies;
  console.log(results);
  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {results.map(movie => {
          return (
            <li key={movie.id}>
              <Link to="">{movie.title ?? movie.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
