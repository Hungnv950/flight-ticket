import Axios from "axios";

const params = {
  "ViewMode": "",
  "Adt": "1",
  "Chd": "1",
  "Inf": "1",
  "ListFlight": [{
    "StartPoint": "SGN",
    "EndPoint": "HAN",
    "DepartDate": "25032020",
    "Airline": "VN"
  }]
}
const search = (params) => {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };

  return Axios.post('https://api.atrip.vn/v1/flights/search', params, axiosConfig)
}


export const submitSearchAction = async dispatch => {
    dispatch({
    type: 'START_SEARCH',
    loading: true,
  });

  search(params).then(async(res) => {
    console.log(res);
    if (res.code === 200) {
      dispatch({
        type: 'SEARCH_SUCCESS',
        res
      });
      return true;
    }
    dispatch({
      type: 'SEARCH_FAIL',
      res
    })
  });
};
