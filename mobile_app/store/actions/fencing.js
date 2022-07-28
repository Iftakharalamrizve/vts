export const FENCING_LIST = "FENCING_LIST";
export const FENCING_CREATE = "FENCING_CREATE";
export const FENCING_UPDATE = "FENCING_UPDATE";
export const FENCING_DELETE = "FENCING_DELETE";

import http from "../../configs/http";

export const fencingList = () => {
    return async (dispatch) => {
        try {
            let response = await http.get("fencings");
            dispatch({ type: FENCING_LIST, data: response.data.data });
        } catch (error) {
            dispatch({ type: FENCING_LIST, data: [] });
        }
    };
};

export const createFencing = (data) => {
    console.log('createmethodCalled',data);
    return async (dispatch) => {
        try {
            let response = await http.post("fencings", { payloads: data });
            await dispatch({ type: FENCING_CREATE, data: response.data.data });
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    };
};

export const updateFencing =  (data,id) => {
    return async (dispatch) => {
        try {
            let response = await http.patch("fencings/"+id, { payloads: data });
             await dispatch({ type: FENCING_UPDATE, data: response.data.data });
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    };
};

export const deleteFencing = (id) => {
    return async (dispatch) => {
      try {
        let response = await http.delete("fencings/" + id);
        dispatch({ type: FENCING_DELETE, data: { fencing_id: id } });
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  };
