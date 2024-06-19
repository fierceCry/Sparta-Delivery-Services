export const REVIEW_RATE = {
  ONE: '⭐',
  TWO: '⭐⭐',
  THREE: '⭐⭐⭐',
  FOUR: '⭐⭐⭐⭐',
  FIVE: '⭐⭐⭐⭐⭐',
};

export const Rating = {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
  FOUR: 'FOUR',
  FIVE: 'FIVE',
};

export function getStarRating(rating) {
  return REVIEW_RATE[rating];
}
