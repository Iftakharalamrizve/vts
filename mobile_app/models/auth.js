export default class AuthItem {
    constructor(token=null, status=false,user=null) {
        this.user = user;
        this.token = token;
        this.status = false;
    }
    
}