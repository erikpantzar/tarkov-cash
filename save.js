const { FieldValue } = require("@google-cloud/firestore");

let otherMoney = 0;

const saveMoney = async ({ value, db }) => {
  // check if not the same
  if (value === otherMoney) {
    console.log({ t: "same value", m: value });
    return false;
  }

  // update value
  otherMoney = value;

  const moneys = await db.collection("Moneys").doc("inputs");

  moneys.update({
    value: FieldValue.arrayUnion({ value, date: new Date().getTime() }),
  });
};

const clear = async ({ db }) => {
  const moneys = await db.collection("Moneys").doc("inputs");
  console.log({ moneys });
};

module.exports = {
  saveMoney,
  clear,
};
