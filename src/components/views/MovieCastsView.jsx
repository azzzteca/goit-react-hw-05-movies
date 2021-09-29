import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './css/MovieCastsView.module.css';

export function MovieCastsView({ url }) {
  const [casts, setCasts] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(data => setCasts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {casts && (
        <div>
          <ul>
            {casts.cast.map(cast => {
              return (
                <div key={cast.id}>
                  <div>
                    <img
                      src={`${url}${cast.profile_path}`}
                      className={s.castImg}
                      alt="Photo"
                    />
                  </div>
                  <li>
                    <p>{cast.name}</p>
                    <p>Character: {cast.character}</p>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
