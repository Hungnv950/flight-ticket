import axios from "axios";
import history from '../history'

// const params = {
//   "ViewMode": "",
//   "Adt": "1",
//   "Chd": "1",
//   "Inf": "1",
//   "ListFlight": [{
//     "StartPoint": "SGN",
//     "EndPoint": "HAN",
//     "DepartDate": "12032020"
//   }]
// }

export const submitSearchAction = (dispatch, params, location) => {
  dispatch({
    type: 'SET_LOCATION',
    payload: location
  });

  dispatch({
    type: 'LOADING',
    payload: 'Hệ thống đang thực hiện tìm kiếm'
  });

  let optionAxios = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return axios.post('https://api.atrip.vn/v1/flights/search', params, optionAxios)
    .then((result) => {
      if(result.data.error !== 200){
        alert(result.data.message)
      } else {
        dispatch({
          type: 'LOADING_FINISHED'
        });

        history.push('/search/result')
      }
    });
};
