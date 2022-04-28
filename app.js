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



var port = process.env.PORT || 8080;

const host = 'localhost';

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("My first server!");
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});