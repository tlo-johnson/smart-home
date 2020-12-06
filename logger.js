const debug = process.env.DEBUG;

const logger = (message) => {
  if (!debug) return;
  console.log(message);
};
module.exports = logger;
