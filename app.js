const axios = require("axios");
const cheerio = require("cheerio");
const admin = require("firebase-admin");
const http = require("http");

const saveMoney = require('./save')

var serviceAccount = require("./tarkovmoney-94582-firebase-adminsdk-1ty9f-3da2dac08a.json");

admin.initializeApp({
  databaseURL: `https://tarkovmoney.europe-west1.firebaseio.com`,
  credential: admin.credential.cert(serviceAccount),  
});


let db = admin.firestore();

const url = "https://www.escapefromtarkov.com/cash";


let money;

async function getMoney() {
  await axios.get(url).then((res) => {
    const d = cheerio.load(res.data);
    const moneyLeft = d(".count_left").text();
    money = moneyLeft
    return moneyLeft;
  });

  return money
}

const init = async () => {
  const money = await getMoney()
  saveMoney({ value: money, db })
}

setInterval(() => {
  init()
}, 23000)


const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static(__dirname + '/client'));

var port = process.env.PORT || 8080;        // set our port

// 
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);