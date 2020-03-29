const encode = (text, shift) => {
  let result = "";
  const encodeShift = +shift;

  for (let i = 0; i < text.length; i += 1) {
    if (/[a-zA-Z]/.test(text[i])) {
      if (text[i].toUpperCase() === text[i]) {
        result += String.fromCharCode(((text.charCodeAt(i) + encodeShift - 65) % 26) + 65);
      } else {
        result += String.fromCharCode(((text.charCodeAt(i) + encodeShift - 97) % 26) + 97);
      }
    } else {
      result += text[i];
    }
  }
  return result;
};

const decode = (text, shift) => {
  const decodeShift = (26 - +shift) % 26;
  return encode(text, decodeShift);
};

module.exports = {
  encode,
  decode
};
