import {
  EXPENSE_TYPE_CREATE,
  EXPENSE_TYPE_LIST,
  EXPENSE_TYPE_UPDATE,
  EXPENSE_TYPE_DELETE,
  EXPENSE_LIST,
  EXPENSE_CREATE,
  EXPENSE_UPDATE,
  EXPENSE_DELETE,
} from "../actions/accounts";
const initialState = {
  expenseTypeList: [],
  expenseList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EXPENSE_TYPE_LIST:
      return {
        ...state,
        expenseTypeList: action.data,
      };

    case EXPENSE_TYPE_CREATE:
      var expenseNewType = {
        expense_type_id: action.data.expense_type_id,
        title: action.data.title,
        description: action.data.description,
      };
      return {
        ...state,
        expenseTypeList: state.expenseTypeList.concat(expenseNewType),
      };

    case EXPENSE_TYPE_UPDATE:
      const typeIndex = state.expenseTypeList.findIndex(
        (item) => item.expense_type_id === action.data.expense_type_id
      );
      var expenseNewType = {
        expense_type_id: action.data.expense_type_id,
        title: action.data.title,
        description: action.data.description,
      };
      const updateExpenseTypeList = [...state.expenseTypeList];
      updateExpenseTypeList[typeIndex] = expenseNewType;
      return {
        ...state,
        expenseTypeList: updateExpenseTypeList,
      };

    case EXPENSE_TYPE_DELETE:
      return {
        ...state,
        expenseTypeList: state.expenseTypeList.filter(
          (item) => item.expense_type_id !== action.data.expense_type_id
        ),
      };

    case EXPENSE_LIST:
      return {
        ...state,
        expenseList: action.data,
      };

    case EXPENSE_CREATE:
      var expenseNew = {
        expense_id: action.data.expense_id,
        expense_type_id: action.data.expense_type_id,
        purpose: action.data.purpose,
        amount: action.data.amount,
        date: action.data.date,
        image: action.data.image,
      };
      return {
        ...state,
        expenseList: state.expenseList.concat(expenseNew),
      };

    case EXPENSE_UPDATE:
      const index = state.expenseList.findIndex(
        (item) => item.expense_id === action.data.expense_id
      );
      var expenseNew = {
        expense_id: action.data.expense_id,
        expense_type_id: action.data.expense_type_id,
        purpose: action.data.purpose,
        amount: action.data.amount,
        date: action.data.date,
        image: action.data.image,
      };
      const updateExpenseList = [...state.expenseList];
      updateExpenseList[index] = expenseNew;
      return {
        ...state,
        expenseList: updateExpenseList,
      };

    case EXPENSE_DELETE:
      return {
        ...state,
        expenseList: state.expenseList.filter(
          (item) => item.expense_id !== action.data.expense_id
        ),
      };
    default:
      return state;
  }
};
