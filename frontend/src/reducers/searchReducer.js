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
  startLocation: "",
  endLocation: "",
  data: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'START_SEARCH':
      return {
        ...state,
        params: action.payload
      };
    case 'SET_LOCATION':
      return {
        ...state,
        startLocation: action.payload.StartLocation,
        endLocation: action.payload.EndLocation,
      };
    case 'SEARCH_SUCCESS':
      return state;
    case 'SEARCH_FAILED':
      return state;
    default:
      return state;
  }
};
