# WEB BASED LOTTERY SYSTEM


-----

## About

This is a web-based lottery system. In this system, it is selling tickets and perform the draws continuously and periodically. After the previous draw, contestants can start to participate in the next draw. The system will generate a random number/string and assign it as 1 ticket per contestant. Every ticket is unique and its identity should be generated by system.
Every x seconds there will be a draw and there will be only 1 winner. And the system will response to contestants whether they win or not after the draw. All tickets in 1 draw will be discarded once said draw is completed.



## How To Run

Run this command to install all dependencies

```
npm install
```


Run this command to run the unit test

```
npx jest
```



Run this command to run the project

```
node index.js
```


## How to test

This is a RESTful API server. There are few API routes that you can test:


```
GET / 
GET /newnumber
GET /allnumbers
GET /winner
```


1.  `GET /`

This API will just for testing purpose. When you try to call `http://localhost:3000/` on your machine, you will get string `LOTTERY` as the return result.

2.  `GET /newnumber`

This API will generate new number. The t


2.  `GET /allnumbers`

This API will return all generated number that available to be drawn.


2.  `GET /winner`


This API will return all winners from previous draw.


## Limitation

- No database included in this system, so when application is restarted, all the data will be lost. Need to add it.
- Coverage of unit test is not 100%. Need to improve the testing.
- No CI/CD command implemented