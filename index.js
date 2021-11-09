'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models/index.js');

// async function startingServer(){
//   try{
//   await db.sync()
//   await app.start(process.env.PORT || 3030);
// }catch(e){
//   console.log(e.messsage);
// }}
// startingServer();


db.sync().then(() => {
  app.start(process.env.PORT || 3030);
});