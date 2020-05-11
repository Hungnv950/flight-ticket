import axios from "axios";
import {API_BOOKING_TOUR_DETAIL_PATH} from "../constants/api";
import {SELECT_TOUR_BOOKING} from "../constants/bookingTour.constants";

export const selectTourBookingAction = (dispatch, id) => {
  dispatch({
    type: 'LOADING',
    payload: 'Hệ thống đang thực hiện tìm kiếm'
  });

  return axios.get(API_BOOKING_TOUR_DETAIL_PATH + "/" + id)
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
            type: SELECT_TOUR_BOOKING,
            payload: result.data
          });
        }
      })
      .catch(error => console.log(error));
};