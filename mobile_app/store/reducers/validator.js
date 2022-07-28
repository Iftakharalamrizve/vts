import { VALIDATOR_ERROR, SERVER_ERROR } from "../actions/validator";
const initialState = {
  validationErrors: [],
  serverError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VALIDATOR_ERROR:
      return {
        ...state,
        validationErrors: action.error,
      };
    case SERVER_ERROR:
      return {
        ...state,
        serverError: action.error,
      };
    default:
      return state;
  }
};
