import {
  SET_TOUR,
  SELECT_TOUR,
  TOUR_DETAIL_SET_ACTIVE_TAB,
} from '../constants/tour.constants';

const initialState = {
  page: 1,
  per_page: 0,
  tours: [],
  tour: {},
  activeTabDetail: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOUR:
      return {
        ...state,
        page: action.payload.page,
        per_page: action.payload.resPerPage,
        tours: action.payload.tours
      };
    case SELECT_TOUR:
      return {
        ...state,
        tour: action.payload
      }
    case TOUR_DETAIL_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTabDetail: action.payload
      }
    default:
      return state;
  }
};
