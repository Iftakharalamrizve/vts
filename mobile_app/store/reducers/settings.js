import { LOADING_STATUS, CLEAR_TOAST, SET_TOAST } from "../actions/settings";
const initialState = {
  isLoading: false,
  toast: {
    status: false,
    messege: "",
    type: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status,
      };
    case CLEAR_TOAST:
      return {
        ...state,
        toast: action.data,
      };
    case SET_TOAST:
      return {
        ...state,
        toast: action.data,
      };
    default:
      return state;
  }
};
