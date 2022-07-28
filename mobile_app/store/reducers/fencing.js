import { FENCING_CREATE,FENCING_UPDATE,FENCING_LIST,FENCING_DELETE } from "../actions/fencing";
const initialState = {
    isLoading: false,
    toast: {
       fencingList:[]
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FENCING_LIST:
            return {
                ...state,
                fencingList: action.data,
            };

        case FENCING_CREATE:
            return {
                ...state,
                fencingList: state.fencingList.concat(action.data),
            };

        case FENCING_UPDATE:
            const fencingIndex = state.fencingList.findIndex(
                (item) => item.fencing_id === action.data.fencing_id
            );
            var fencingNewData = action.data ;
            const updateFencingList = [...state.fencingList];
            updateFencingList[fencingIndex] = fencingNewData;
            return {
                ...state,
                fencingList: updateFencingList,
            };

        case FENCING_DELETE:
            return {
                ...state,
                fencingList: state.fencingList.filter(
                    (item) => item.fencing_id !== action.data.fencing_id
                ),
            };
        default:
            return state;
    }
};
