const wait = async (duration) => await new Promise((resolve) => setTimeout(resolve, duration));
module.exports.wait = wait;
