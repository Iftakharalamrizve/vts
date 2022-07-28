export const EXPENSE_TYPE_LIST = "EXPENSE_TYPE_LIST";
export const EXPENSE_TYPE_CREATE = "EXPENSE_TYPE_CREATE";
export const EXPENSE_TYPE_UPDATE = "EXPENSE_TYPE_UPDATE";
export const EXPENSE_TYPE_DELETE = "EXPENSE_TYPE_DELETE";

export const EXPENSE_CREATE = "EXPENSE_CREATE";
export const EXPENSE_LIST = "EXPENSE_LIST";
export const EXPENSE_UPDATE = "EXPENSE_UPDATE";
export const EXPENSE_DELETE = "EXPENSE_DELETE";

import http from "../../configs/http";

export const expenseTypeList = () => {
  return async (dispatch) => {
    try {
      let response = await http.get("expense-types");
      dispatch({ type: EXPENSE_TYPE_LIST, data: response.data.data });
    } catch (error) {
      dispatch({ type: EXPENSE_TYPE_LIST, data: [] });
    }
  };
};

export const createExpenseType = (data) => {
  return async (dispatch) => {
    try {
      let response = await http.post("expense-types", { payloads: data });
      dispatch({ type: EXPENSE_TYPE_CREATE, data: response.data.data });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const updateExpenseType = (data) => {
  return async (dispatch) => {
    try {
      let response = await http.patch("expense-types/" + data.expense_type_id, {
        payloads: data,
      });
      dispatch({ type: EXPENSE_TYPE_UPDATE, data: response.data.data });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const deleteExpenseType = (id) => {
  return async (dispatch) => {
    try {
      let response = await http.delete("expense-types/" + id);
      dispatch({ type: EXPENSE_TYPE_DELETE, data: { expense_type_id: id } });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const expenseList = () => {
  return async (dispatch) => {
    try {
      let response = await http.get("expenses");
      dispatch({ type: EXPENSE_LIST, data: response.data.data });
    } catch (error) {
      dispatch({ type: EXPENSE_LIST, data: [] });
    }
  };
};

export const createExpense = (data) => {
    console.log(data);
  return async (dispatch) => {
    try {
      let response = await http.post("expenses", { payloads: data });
      dispatch({ type: EXPENSE_CREATE, data: response.data.data });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const updateExpense = (data) => {
  return async (dispatch) => {
    try {
      let response = await http.patch("expenses/" + data.expense_id, {
        payloads: data,
      });
      dispatch({ type: EXPENSE_UPDATE, data: response.data.data });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const deleteExpense = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      let response = await http.delete("expenses/" + id);
      dispatch({ type: EXPENSE_DELETE, data: { expense_id: id } });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};
