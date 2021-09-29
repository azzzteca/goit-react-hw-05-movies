import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const MovieReviewsView = () => {
  const [review, setReview] = useState(null);
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
      .then(data => setReview(data))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      <p>Information about reviews</p>
    </div>
  );
};
