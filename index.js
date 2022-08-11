const express = require("express");
const uuid = require('uuid');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const lotteryNumbers = [];
const lotteryWinners = [];
const X_TIME = 60000;
const PORT = 3000;

setInterval(() => {
    const winner = lotteryNumbers[Math.floor(Math.random()*lotteryNumbers.length)];
    if(winner) {
        lotteryWinners.push(winner)
        lotteryNumbers.length = 0
    }
}, X_TIME);

app.get("/", (_, res) => {
    return res.json("LOTTERY");
});

app.get("/newnumber", (_, res) => {
    const newNumber = uuid.v4()
    lotteryNumbers.push(newNumber)
    return res.json(newNumber);
});

app.get("/allnumbers", (_, res) => {
  return res.json(lotteryNumbers);
});

app.get("/winner", (_, res) => {
    return res.json(lotteryWinners);
  });

app.listen(PORT, () => console.log(`server starting on port ${PORT}!`));

module.exports = {
    app
};