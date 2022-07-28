import {CHANGE_AUTH_STATUS} from '../actions/auth'

const initialState = {
    user:{},
    token:null,
    status:false
}
export default (state = initialState , action)=>{

    switch(action.type){
        case CHANGE_AUTH_STATUS:
            return {
                ...state,
                staus: !action.status
            }
    }

    return state;

}