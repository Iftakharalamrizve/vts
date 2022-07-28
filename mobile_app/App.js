import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
//import navigator
import RootNavigator from "./navigation/RootNavigator";
import accounts from "./store/reducers/accounts";
//import reducer
import authReducer from "./store/reducers/auth";
import settingReducer from "./store/reducers/settings";
import validator from "./store/reducers/validator";
import VehicleReducer from './store/reducers/vehicle';
import FencingReducer from './store/reducers/fencing'


//combine all reducer like as reducer module
const rootReducer = combineReducers({
  vehicle:VehicleReducer,
  settings: settingReducer,
  accounts: accounts,
  validator: validator,
  auth: authReducer,
  fencing:FencingReducer

});
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
