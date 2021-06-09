const crypto = require("crypto");
const modlogsGen = async () => {
  return null;
};
const setClientVars = async (client) => {
  // client
};

const getMinutes = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + "M :" + (seconds < 10 ? "0" : "") + seconds + "s";
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  const characterCount = characters.length;
  const maxValidSelector =
    Math.floor(0x10000 / characterCount) * characterCount - 1;
  const entropyLength = 2 * Math.ceil(1.1 * length);
  let string = "";
  let stringLength = 0;

  while (stringLength < length) {
    const entropy = crypto.randomBytes(entropyLength);
    let entropyPosition = 0;

    while (entropyPosition < entropyLength && stringLength < length) {
      const entropyValue = entropy.readUInt16LE(entropyPosition);
      entropyPosition += 2;
      if (entropyValue > maxValidSelector) {
        continue;
      }

      string += characters[entropyValue % characterCount];
      stringLength++;
    }
  }

  return string;
};

module.exports = {
  modlogsGen,
  setClientVars,
  getMinutes,
  generateRandomString,
};
