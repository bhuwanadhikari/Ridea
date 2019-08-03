console.log("Evvironment of the project is:", process.env.NODE_ENV);
console.log("Evvironment of the project is:", process.env);
console.log("Public vapid key is:", process.env.PUBLIC_VAPID_KEY);

if (process.env.NODE_ENV === "production") {
   module.exports = require('./keys_production');
} else {
   module.exports = require('./keys_development');
}