const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require("cors");

const db = require("./config/keys").mongoURI; // mongo uri
const userRoute= require('./routes/api/users')
const driverRoute= require('./routes/api/drivers')



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport)

app.use(userRoute)
app.use(driverRoute)




mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server connected on ${port}`)
})