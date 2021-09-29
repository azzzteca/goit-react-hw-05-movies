import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const MovieReviewsView = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=d7f38521886bf40bd20fcb4d0d1274a9&language=en-US`,
    )
      .then(promise => {
        if (!promise.ok) {
          throw new Error(promise.status);
        }
        return promise.json();
      })
      .then(data => setReviews(data.results))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <div>
          <ul>
            {reviews.map(review => {
              return (
                <li key={review.id}>
                  <h4>Autor: {review.author}</h4>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>We do noy hane any reviews for this movie</p>
      )}
    </>
  );
};
