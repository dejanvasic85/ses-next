import ratingData from './data/rating.json';
import reviewData from './data/reviews.json';

export const googleReviews = {
  ...ratingData,
  reviews: reviewData.reviews,
};
