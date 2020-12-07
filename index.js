require("dotenv").config();
const express = require("express");
const app = express();
const { openGarageDoor, closeGarageDoor, garageDoorState } = require("./garage-door");

const port = 80;

app.get("/smart-home/garage-door/close", async (req, res) => {
  console.log("closing the garage door");
  await closeGarageDoor();
  res.send("ok");
});

app.get("/smart-home/garage-door/open", async (req, res) => {
  console.log("opening the garage door");
  await openGarageDoor();
  res.send("ok");
});

app.get("/smart-home/garage-door", async (req, res) => {
  const state = await garageDoorState();
  res.send(`garage door is ${state}`);
});

app.listen(port, () => console.log(`server started on port ${port}`));
