const data = require("./api.json");

module.exports = async ({ db }) => {
  try {
    return data;
  } catch (error) {
    return {
      message: error,
    };
  }
};
