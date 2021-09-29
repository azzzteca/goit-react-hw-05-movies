import { Switch, Route } from 'react-router-dom';
import { Container } from '../Container/Container';
import { AppBar } from '../AppBar/AppBar';
import { HomePage } from '../HomePage/HomePage.jsx';
import { MoviesPage } from '../MoviesPage/MoviesPage.jsx';
import { NotFound } from '../NotFound/NotFound.jsx';
import { MovieDetailsPage } from '../MovieDetailsPage/MovieDetailsPage.jsx';

export function App() {
  return (
    <Container>
      <AppBar />

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
    </Container>
  );
}
