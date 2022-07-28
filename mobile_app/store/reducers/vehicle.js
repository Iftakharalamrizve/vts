import {UPDATE_SPEED_LIMIT, VEHICLE_LIST, VEHICLE_SEARCH_LIST ,VEHICLE_SETTINGS_INFO} from "../actions/vehicle";

const initialState = {
    vehicleList: [],
    vehicleSearchList:[],
    vehicleSettingsInfo:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VEHICLE_LIST:
      return {
        ...state,
        vehicleList: action.data,
        vehicleSearchList: action.data
      };
    case VEHICLE_SEARCH_LIST:
      return {
        ...state,
          vehicleSearchList: action.data
      };
    case UPDATE_SPEED_LIMIT:
      const findIndex = state.vehicleList.findIndex(item=>item.vehicle_id===action.data.vehicle_id);
      const selectedUpdateVehicle = state.vehicleList[findIndex];
      selectedUpdateVehicle.over_speed_limit = action.data.over_speed_limit;
      const vehicleList = state.vehicleList;
      vehicleList[findIndex] = selectedUpdateVehicle;
    return {
      ...state,
        vehicleSearchList: vehicleList
    };
    case VEHICLE_SETTINGS_INFO:
      return {
        ...state,
        vehicleSettingsInfo: action.data
      };
    default:
      return state;
  }
};
