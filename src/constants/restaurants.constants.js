export const RANKINGLIMIT = 5;
export const sortOption = {
  totalprice: 'restaurantTotalPrice',
  rating: 'restaurantRatingAvg',
};
export const getSort = (option) => {
  return sortOption[option];
};

export const SORT = {
  GET_RANKINGS:  'totalprice',
  GET_SORT: 'desc'
}