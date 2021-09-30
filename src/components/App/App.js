import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '../Container/Container';
import AppBar from '../AppBar/AppBar';
import HomePage from '../HomePage/HomePage.jsx';

const MoviesPage = lazy(() => import('../MoviesPage/MoviesPage.jsx'));
const NotFound = lazy(() => import('../NotFound/NotFound.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../MovieDetailsPage/MovieDetailsPage.jsx'),
);

export function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h2>Загружаем ...</h2>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
