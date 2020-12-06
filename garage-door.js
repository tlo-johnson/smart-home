const MyQ = require("myq-api");
const { doorStates } = require("./src/constants");

const openGarageDoor = async () => {
  console.log("not yet implemented");
};
module.exports.openGarageDoor = openGarageDoor;

const closeGarageDoor = async () => {
  const account = await init();
  const { devices } = await account.getDevices();
  const garage = devices.find((x) => x.name === "Garage");
  await account.setDoorState(garage.serial_number, MyQ.actions.door.CLOSE);

  let state;
  let counter = 0;
  while (!(state === doorStates.closed)) {
    console.log("checking door state", counter++);
    const response = await account.getDoorState(garage.serial_number);
    state = response.deviceState;
  }
};
module.exports.closeGarageDoor = closeGarageDoor;

const init = async () => {
  const email = process.env.MYQ_USERNAME;
  const password = process.env.MYQ_PASSWORD;
  const account = new MyQ();
  await account.login(email, password);
  return account;
};
