const fs = require("fs");
const { Transform } = require("stream");
const { encode, decode } = require("./caesarCipher");

const getReadStream = pathStr => {
  if (fs.existsSync(pathStr)) return fs.createReadStream(pathStr);
  if (!pathStr) {
    process.stdout.write("Type your input: ");
    return process.stdin;
  }
  process.stderr.write("Input file does not found\n");
 process.exit(1);
};

const getWriteStream = (pathStr) => {
  if (fs.existsSync(pathStr)) return fs.createWriteStream(pathStr);
  if (!pathStr) return process.stdout;
  process.stderr.write("Output file does not found\n");
  process.exit(1);
};

const getTransformerStream = (action, shift) => {
  class Transformer extends Transform {

    constructor() {
      super();
    }

    _transform(chunk, enc, done) {
      try {
        if (action === "encode") this.push(encode(chunk.toString(), shift));
        if (action === "decode") this.push(decode(chunk.toString(), shift));
        if (action !== "encode" && action !== "decode") {
          console.error(`exeption  getTransformerStream(), creatStreem.js[str34], action = ${action}`);
         process.exit(1);
          done();
        }
      } catch (err) {
        done(err);
        console.log(err);
      }

    }
  }
  return new Transformer();
};

module.exports = {
  getTransformerStream,
  getWriteStream,
  getReadStream
}
