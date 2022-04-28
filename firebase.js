const admin = require("firebase-admin");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGZ-WoDVQ25I8Od6SQoR5dl9vw1y_ih6g",
  authDomain: "tarkovmoney-94582.firebaseapp.com",
  projectId: "tarkovmoney-94582",
  storageBucket: "tarkovmoney-94582.appspot.com",
  messagingSenderId: "707940095042",
  appId: "1:707940095042:web:c20de7460c800d098e09db",
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
let db = admin.firestore();

export const saveMoney = (value) => {
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
