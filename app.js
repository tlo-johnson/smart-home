require("dotenv").config();
const MyQ = require("myq-api");
const logger = require("./logger");

const EMAIL = process.env.MYQ_USERNAME;
const PASSWORD = process.env.MYQ_PASSWORD;

async function main() {
  const account = new MyQ();

  try {
    logger("Logging in.");
    const loginResult = await account.login(EMAIL, PASSWORD);
    logger("Login result:");
    logger(JSON.stringify(loginResult, null, 2));
    logger(`Short-lived security token: '${loginResult.securityToken}'`);

    logger(`\nGetting all devices on account`);
    const getDevicesResult = await account.getDevices();
    logger("getDevices result:");
    logger(JSON.stringify(getDevicesResult, null, 2));

    const { devices } = getDevicesResult;
    if (devices.length === 0) {
      throw Error("No devices found!");
    }
    logger("Devices:");
    devices.forEach((device, index) => {
      logger(`Device ${index} - Name: '${device.name}', Serial Number: '${device.serial_number}'`);
    });

    const door = devices.find((device) => device.state && MyQ.constants._stateAttributes.doorState in device.state);
    if (!door) {
      throw Error("No doors found!");
    }

    logger(`\nClosing door '${door.name}'`);
    const setDoorStateResult = await account.setDoorState(door.serial_number, MyQ.actions.door.CLOSE);
    logger("setDoorStateResult:");
    logger(JSON.stringify(setDoorStateResult, null, 2));

    logger("Waiting 5 seconds before polling state again");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    logger(`\nGetting state of door '${door.name}'`);
    const getDoorStateResult = await account.getDoorState(door.serial_number);
    logger("getDoorState result:");
    logger(JSON.stringify(getDoorStateResult, null, 2));
    logger(`State of door '${door.name}': ${getDoorStateResult.deviceState}`);
  } catch (error) {
    console.error("Error received:");
    console.error(error);
    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  }
}

main();
