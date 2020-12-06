require("dotenv").config();
const express = require("express");
const app = express();
const { openGarageDoor, closeGarageDoor } = require("./garage-door");

const port = 80;

app.get("/smart-home/close-garage-door", async (req, res) => {
  console.log("closing the garage door");
  await closeGarageDoor();
  res.send("ok");
});

app.listen(port, () => console.log(`server started on port ${port}`));
