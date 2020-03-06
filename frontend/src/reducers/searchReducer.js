import {
  SET_CURRENT_USER
} from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initialState = {
  params: {
    ViewMode: "",
      Adt: 0,
      Chd: 0,
      Inf: 0,
      ListFlight: [{
        StartPoint: "",
        EndPoint: "",
        DepartDate: "",
        Airline: ""
      }]
  },
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'START_SEARCH':
      return {
        ...state,
        params: action.payload,
        loading: true
      };
    case 'SEARCH_FINISHED':
        return state;
    default:
      return state;
  }
};
