
export const VEHICLE_LIST = "VEHICLE_LIST";
export const VEHICLE_SEARCH_LIST = "VEHICLE_SEARCH_LIST";
export const UPDATE_SPEED_LIMIT = "UPDATE_SPEED_LIMIT";
export const VEHICLE_SETTINGS_INFO = "VEHICLE_SETTINGS_INFO";

import http from "../../configs/http";

export const vehicleList = (data) => {
  return async (dispatch) => {
    try {
      let response = await http.get("vehicles?search=" + data);
      if (data) {
        await dispatch({ type: VEHICLE_SEARCH_LIST, data: response.data.data });
      } else {
        await dispatch({ type: VEHICLE_LIST, data: response.data.data });
      }
      
    } catch (error) {
      await dispatch({ type: VEHICLE_LIST, data: [] });
    }
  };
};
export const updateVehicleSpeedLimit = (data,id) => {
  return async (dispatch) => {
    try {
      let response = await http.post("set-vehicle-speed/"+id,{ payloads: data });
      console.log(response);
      if (data) {
        await dispatch({ type: UPDATE_SPEED_LIMIT, data: response.data.data });
      }
      return  response;
    } catch (error) {
        return error;
    }
  };
};

export const vehicleSetting = () => {
  return async (dispatch) => {
    try {
      let response = await http.get("get-settings");
      await dispatch({ type: VEHICLE_SETTINGS_INFO, data: response.data.data });
      return  response;
    } catch (error) {
      return error;
    }
  };
};
export const updateVehicleSettings = (data) => {
  return async (dispatch) => {
    try {

      let response = await http.post("update-settings",{ payloads: data });
      if (data) {
        await dispatch({ type: VEHICLE_SETTINGS_INFO, data: response.data.data });
      }
      return  response;
    } catch (error) {
      return error;
    }
  };
};

