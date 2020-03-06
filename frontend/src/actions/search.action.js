import axios from "axios";

const params = {
  "ViewMode": "",
  "Adt": "1",
  "Chd": "1",
  "Inf": "1",
  "ListFlight": [{
    "StartPoint": "SGN",
    "EndPoint": "HAN",
    "DepartDate": "25032020"
  }]
}

export const submitSearchAction = (dispath, params) => {
  search(params);

  dispath({
    type: 'START_SEARCH',
    payload: params
  })
};

export function search(params) {
  debugger
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };

  return function (dispatch) {
    debugger
    return axios.post('https://api.atrip.vn/v1/flights/search', params, axiosConfig)
      .then(({
        data
      }) => {
        console.log(data)
      });
  };
}
