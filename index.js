const express = require("express");
const uuid = require('uuid');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const lotteryNumbers = [];
const lotteryWinners = [];
const X_TIME = 6000;
const PORT = 3000;

const findWinner = () => {
  const winner = lotteryNumbers[Math.floor(Math.random()*lotteryNumbers.length)];
  if(winner) {
      lotteryWinners.push(winner)
      lotteryNumbers.length = 0
  }
}

setInterval(findWinner, X_TIME);

app.get("/", (_, res) => {
    return res.json("LOTTERY");
});

app.get("/newnumber", (req, res) => {
    var ip = req.socket.remoteAddress.split(`:`).pop();
    var index = lotteryNumbers.findIndex(x => x.user == ip); 
    if(index === -1){
      const newNumber = { user: ip, ticket: uuid.v4() }
      lotteryNumbers.push(newNumber)
      return res.json(newNumber);
    }
    return res.json("User already have a number");
});

app.get("/allnumbers", (_, res) => {
  return res.json(lotteryNumbers);
});

app.get("/winner", (_, res) => {
    return res.json(lotteryWinners);
  });

app.listen(PORT, () => console.log(`server starting on port ${PORT}!`));

module.exports = {
    app,
    findWinner
};