import {
  SET_CURRENT_USER
} from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initialState = {
  ViewMode: "",
  Adt: 0,
  Chd: 0,
  Inf: 0,
  ListFlight: [{
    StartPoint: "SGN",
    EndPoint: "HAN",
    DepartDate: "25032020",
    Airline: "VN"
  }]
}

export default function (state = initialState, action) {
  switch (action.type) {

    case 'START_SEARCH':
      return state;

    default:
      return state;
  }
};
