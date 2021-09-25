import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '../Container/Container';
import { AppBar } from '../AppBar/AppBar';
import { HomeView } from '../views/HomeView/HomeView.jsx';
import { MoviesView } from '../views/MoviesView/MoviesView.jsx';
import './App.module.css';

export const App = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch('')
      .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(data => {
        setMovies(data);
      })
      .catch(error => console.log('нет строки запроса'));
  }, []);

  return (
    <Container>
      <AppBar />

      <Switch>
        <Route exact path="/">
          <HomeView movies={movies} />
        </Route>

        <Route path="/movies">
          <MoviesView />
        </Route>
      </Switch>
    </Container>
  );
};
