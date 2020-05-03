import axios from "axios";
import {
    API_BOOKING_TOUR_PATH,
    API_BOOKING_TOUR_DETAIL_PATH
} from '../constants/api';

import {
  SET_TOUR,
  SELECT_TOUR,
  TOUR_DETAIL_SET_ACTIVE_TAB,
} from '../constants/tour.constants';

export const selectBookingTourAction = (dispatch, id) => {
  dispatch({
    type: 'LOADING',
    payload: 'Hệ thống đang thực hiện tìm kiếm'
  });

  return axios.get(API_TOUR_DETAIL_PATH + "/" + id)
    .then((result) => {
      dispatch({
        type: 'LOADING_FINISHED'
      });

      if (result.status !== 200) {
        dispatch({
          type: 'SEARCH_FAILED',
          payload: result.data.message
        })
      } else {
        dispatch({
          type: SELECT_TOUR,
          payload: result.data
        });
      }
    })
    .catch(error => console.log(error));
};

export const setAtiveTabDetail = (dispatch, tab) => {
  dispatch({
    type: TOUR_DETAIL_SET_ACTIVE_TAB,
    payload: tab
  })
}
