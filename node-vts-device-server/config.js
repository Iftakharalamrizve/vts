//jshint esversion:10
const config = {
  url_post: "http://secure.cpsdbd.com/api/device-api-data", // mysql insert api
  PORT: 8999,
  FIRE_URL: "https://britto360-8438a.firebaseio.com", // From Firebase Database
};

// Note : Must Replace Firebase Service Account File in Location "/firebase/serviceAccount.json"

module.exports = config;