const router = require("express").Router()

const webpush = require("web-push");
const keys = require("../config/keys");



webpush.setGCMAPIKey(keys.GOOGLE_API_KEY)
webpush.setVapidDetails(
  "mailto:adhikaribhuwan97@gmail.com",
  keys.PUBLIC_VAPID_KEY,
  keys.PRIVATE_VAPID_KEY
)

const testData = {
    title: "Testing",
    body: "It's a success!",
    icon: "/path/to/an/icon.png"
  }
  
  let subscription
  let pushIntervalID
  
  router.post("/register", (req, res, next) => {
    subscription = req.body
    console.log(subscription)
    res.sendStatus(201)
    pushIntervalID = setInterval(() => {
      // sendNotification can only take a string as it's second parameter
      webpush.sendNotification(subscription, JSON.stringify(testData))
        .catch(() => clearInterval(pushIntervalID))
    }, 3000)
  })
  
  router.delete("/unregister", (req, res, next) => {
    subscription = null
    clearInterval(pushIntervalID)
    res.sendStatus(200)
  })

module.exports = router;

