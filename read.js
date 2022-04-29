module.exports = async ({ db }) => {
  // setup db init
  // return docs

  try {
    const moneyRef = db.collection("Moneys");
    const snapshot = await moneyRef.get();

    let values = []

    snapshot.forEach((doc) => {
      values.push(doc.data())
    });

    return values;
  } catch (error) {
    return {
      message: error,
    };
  }
};
