import Axios from "axios";

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
const search = (params) => {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };

  return Axios.post('https://api.atrip.vn/v1/flights/search', params, axiosConfig)
}


export const submitSearchAction = (dispath, params) => {
  dispath({
    type: 'START_SEARCH',
    payload: params
  })
};
