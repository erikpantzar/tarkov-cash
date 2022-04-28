const axios = require('axios')
const cheerio = require('cheerio')
const admin = require("firebase-admin");

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
admin.initializeApp(firebaseConfig);

const url = 'https://www.escapefromtarkov.com/cash'


async function getMoney() {
  let money;

  await axios.get(url)
    .then((res) => {
     const d = cheerio.load(res.data)
     const moneyLeft = d('.count_left').text()  

     money = moneyLeft
  }) 

  return money
}




const saveMoney = (value) => {
  // store data gotten from main thread in database
  db.collection("Rates")
    .doc("cash")
    .set({
      money: JSON.stringify(value),
    })
    .then(() => {
      // done
    })
    .catch((err) => console.log(err));
};

