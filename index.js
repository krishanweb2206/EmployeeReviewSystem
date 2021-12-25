const express = require('express');
const port = 8989;
const app = express();
const db = require('./config/mongoose');

//use ejs template
app.set("view engine", "ejs");
app.set("views", "./views");


//use express router
app.use('/',require('./routes'));


app.listen(port,function(error){
    if (error) {
      console.log(`Error in connecting with server: ${error}`);
    }
    console.log(`Successfully connecting with server ${port}`);
})