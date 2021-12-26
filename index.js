const express = require('express');
const port = 8989;
const app = express();
const db = require('./config/mongoose');

//Use for session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded({ extended: true }));

//use ejs template
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in db
app.use(
  session({
    name: "EmployeeReviewSystem",
    secret: "Systemsystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/employee_review_development",
        autoRemove: "disabled",
        mongooseConnection: db,
        collectionName: "sessions",
      },
      function (error) {
        console.log(error || "connect mongodb setup is ok");
      }
    ),
  })
);

// for authentication
app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);


//use express router
app.use('/',require('./routes'));


app.listen(port,function(error){
    if (error) {
      console.log(`Error in connecting with server: ${error}`);
    }
    console.log(`Successfully connecting with server ${port}`);
})