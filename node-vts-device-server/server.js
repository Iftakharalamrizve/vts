var gps = require("./lib/server");
const { Server } =require("socket.io");
const event=require("events");
//var util = require("./lib/functions");
var events = new event.EventEmitter();
events.setMaxListeners(0);

/**
 * Options for gps server
 */
var options = {
    'debug'                 : true,
    'port'                  : 3050,
    'device_adapter'        : "GT06"
}

/**
 * Socket server creation on port 3501
 */
const io=new Server(
    {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"]
          }
    }
);
io.listen(3051);

/**
 * GPS server creation on port 3050
 */

const server = gps.server(options,function(device,connection){
    var device_id;
    /**
     * Some devices sends a login request before transmitting their position
     * Do some stuff before authenticate the device... 
     * Accept the login request. You can set false to reject the device.
     */
    device.on("login_request",function(device_id,msg_parts){
        device_id=device_id;
        //console.log(msg_parts);
        // console.log("DEVICE ID "+device_id);
        // console.log(msg_parts);
        // if(device_id=='0358735076069193'){
        //     this.login_authorized(true);     
        // }
        // events.emit('login_try',"Trying to login "+ device_id);
        this.login_authorized(true); 
    });

    /**
     * PING request from gps tracking device
     * This request comes even if vehicle is off
     */
    device.on("ping",function(data,msgParts){
        // data.device_id=msgParts;
        // console.log(data);
        events.emit('gps-ping',data);
        return data;
    }); 
    
    device.on("alarm",function(alarm_code, alarm_data, msg_data){
        console.log("_________ALARM DATA____________");
        // console.log(data);
        // events.emit('gps-alarm',data);
        return alarm_data;
    }); 

});

/**
 * Socket server to send ping and other data to 
 * client server, here client is mainly mobile app
 */
io.on('connection',(socket)=>{
    events.on('gps-ping', function (data) {
        // console.log(data);
        socket.emit('lat-lng-received',data);
    });
    events.on('gps-alarm', function (data) {
        socket.emit('alarm-received',data);
    });
    events.on('login_try', function (data) {
        // console.log(data);
        socket.emit('login_try',data);
    });
});

server.setDebug(true);





