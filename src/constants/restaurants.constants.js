export const RANKINGLIMIT = 5;
export const sortOption = {
  totalprice: 'restaurantTotalPrice',
  rating: 'restaurantRatingAvg',
};
export const getSort = (option) => {
  return sortOption[option];
};
