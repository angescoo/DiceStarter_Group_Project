import React from 'react';
import './postedUserReviews.css';
import {useAppSelector} from '../../app/hooks';
import {reviewsResponse} from '../../app/reducers/reviewsReducer';
import {ReviewRes} from '../../types';

const PostedUserReviews = () => {
  const postedReviews = useAppSelector(reviewsResponse);
  return (
    <div>
      {
        postedReviews !== null && postedReviews.map((review: ReviewRes) => (
          <div className='postedReviewsAll' key={review.id}>
            <p>{review.comment}</p>
          </div>
        ))
      }
    </div>
  );
};

export default PostedUserReviews;
