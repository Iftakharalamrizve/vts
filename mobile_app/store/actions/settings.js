export const LOADING_STATUS = "LOADING_STATUS";
export const CLEAR_TOAST = "CLEAR_TOAST";
export const SET_TOAST = "SET_TOAST";
export const setLoadingStatus = (status) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATUS, status });
  };
};
export const setToastMessage = (data) => {
  console.log('toast message console',data)
  return async (dispatch) => {
    dispatch({ type: SET_TOAST, data });
  };
};
