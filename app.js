const { openGarageDoor, closeGarageDoor } = require("./garage-door");

const commands = {
  "open-garage-door": openGarageDoor,
  "close-garage-door": closeGarageDoor,
};

const main = async () => {
  const instruction = process.argv[2];
  const command = commands[instruction];
  await command();
};

main();
