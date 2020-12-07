const MyQ = require("myq-api");
const { doorStates } = require("./src/constants");
const { wait } = require("./src/utils");

let account, garage;
const fiveSeconds = 5 * 1000;

const openGarageDoor = async () => {
  await init();
  await account.setDoorState(garage.serial_number, MyQ.actions.door.OPEN);
  await waitForState(doorStates.open);
  return await garageDoorState();
};
module.exports.openGarageDoor = openGarageDoor;

const closeGarageDoor = async () => {
  await init();
  await account.setDoorState(garage.serial_number, MyQ.actions.door.CLOSE);
  await waitForState(doorStates.closed);
  return await garageDoorState();
};
module.exports.closeGarageDoor = closeGarageDoor;

const garageDoorState = async () => {
  await init();
  const { deviceState: state } = await account.getDoorState(garage.serial_number, MyQ.actions.door.OPEN);
  return state;
};
module.exports.garageDoorState = garageDoorState;

const init = async () => {
  await initAccount();
  await initGarage();
};

const initAccount = async () => {
  const email = process.env.MYQ_USERNAME;
  const password = process.env.MYQ_PASSWORD;
  account = new MyQ();
  await account.login(email, password);
};

const initGarage = async () => {
  const { devices } = await account.getDevices();
  garage = devices.find((x) => x.name === "Garage");
};

const waitForState = async (desiredState) => {
  let state;
  while (!(state === desiredState)) {
    const response = await account.getDoorState(garage.serial_number);
    state = response.deviceState;
    await wait(fiveSeconds);
  }
};
