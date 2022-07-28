export const VALIDATOR_ERROR = "VALIDATOR_ERROR";
export const SERVER_ERROR = "SERVER_ERROR";

export const createValidator = (error) => {
  return async (dispatch) => {
    if (error.response.status === 422) {
      await dispatch({
        type: VALIDATOR_ERROR,
        error: error.response.data.errors,
      });
    } else if (error.response.status === 401) {
      await dispatch({
        type: SERVER_ERROR,
        error: "Sorry Not Assistant Created",
      });
    } else if (error.response.status === 500) {
      await dispatch({
        type: SERVER_ERROR,
        error: "Sorry Server Rise Error",
      });
    }
  };
};

export const clearValidaton = () => {
  return async (dispatch) => {
    await dispatch({
      type: VALIDATOR_ERROR,
      error: [],
    });
  };
};
