const initialState = {

};

export default function (state = initialState, action) {
  switch (action.type) {

    case 'LOADING_FINISHED':
      return {
        isLoading: false,
        text: ""
      }
    default:
      return state;
  }
};
