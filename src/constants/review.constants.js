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

export const NumRating = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export const getNumRating = (rating) => {
  return NumRating[rating];
};
