const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employee_review_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB ......"));

db.once('open',function(){
    console.log('Connected to Database :: Mongodb')
})


module.exports = db;