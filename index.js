const { program } = require('commander');
const util = require('util');
const { pipeline } = require("stream");
const { getTransformerStream, getWriteStream, getReadStream } = require("./tools/createStreams");

program
  .option('-s, --shift <value>', 'a shift')
  .option('-i, --input <value>', 'an input file')
  .option('-o, --output <value>', 'an output file')
  .option('-a, --action <value>', 'an action encode/decode')
  .parse(process.argv);

const readStream = getReadStream(program.input);
const transformerStream = getTransformerStream(program.action, program.shift);
const writeStream = getWriteStream(program.output);
const pipelineAsync = util.promisify(pipeline);

(async function run() {
  try {
    await pipelineAsync(readStream, transformerStream, writeStream);
  } catch (err) {
    console.error(`exeption pipelineAsync(), index.js[str61] ${err}`);
  }
})();
