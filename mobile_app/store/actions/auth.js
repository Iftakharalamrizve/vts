export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';

export const addToCart= (status=false) =>{
    return {type:CHANGE_AUTH_STATUS,status:status}
}