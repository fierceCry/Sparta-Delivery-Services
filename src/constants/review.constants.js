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
  switch (rating) {
    case 'ONE':
      return Rating.ONE;
    case 'TWO':
      return Rating.TWO;
    case 'THREE':
      return Rating.THREE;
    case 'FOUR':
      return Rating.FOUR;
    case 'FIVE':
      return Rating.FIVE;
  }
}
