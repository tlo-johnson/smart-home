const MyQ = require("myq-api");
const { doorStates } = require("./src/constants");

const openGarageDoor = async () => {
  const { account, garage } = await init();
  await account.setDoorState(garage.serial_number, MyQ.actions.door.OPEN);
  await waitForState(doorStates.open);
};
module.exports.openGarageDoor = openGarageDoor;

const closeGarageDoor = async () => {
  const { account, garage } = await init();
  await account.setDoorState(garage.serial_number, MyQ.actions.door.CLOSE);
  await waitForState(doorStates.closed, account, garage);
};
module.exports.closeGarageDoor = closeGarageDoor;

const garageDoorState = async () => {
  const { account, garage } = await init();
  const { deviceState: state } = await account.getDoorState(garage.serial_number, MyQ.actions.door.OPEN);
  return state;
};
module.exports.garageDoorState = garageDoorState;

const init = async () => {
  const account = await getAccount();
  const { devices } = await account.getDevices();
  const garage = devices.find((x) => x.name === "Garage");
  return { account, garage };
};

const getAccount = async () => {
  const email = process.env.MYQ_USERNAME;
  const password = process.env.MYQ_PASSWORD;
  const account = new MyQ();
  await account.login(email, password);
  return account;
};

const waitForState = async (desiredState, account, garage) => {
  let state;
  let counter = 0;
  while (!(state === desiredState)) {
    console.log("checking door state", counter++);
    const response = await account.getDoorState(garage.serial_number);
    state = response.deviceState;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};
