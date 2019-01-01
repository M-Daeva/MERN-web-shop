//const { log, sel, sum } = require("./lib");
const { isExist, addUser, sendEmail, sendSMS } = require("./backAPI");

const fs = require("fs");
const exp = require("express");
const parser = require("body-parser");
const app = exp();
const cors = require("cors");

const storage = [
  {
    name: "Jennifer",
    phone: "+79997774580",
    email: "qwerty@gmail.com",
    info: "brick, sand",
    id: 1
  }
];


app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());


app.get("/", (req, res) => {
  res.send(JSON.stringify(storage));
});


app.post("/", (req, res) => {
  const data = req.body;
  //  if (data.phone !== "") sendSMS("yo man");
  if (/\w+@\w+\.\w/.test(data.email)) sendEmail("Jackie Chan", data.email, `hey ${data.name}!`);
  if (!isExist(data, storage)) {
    addUser(data, storage);
    res.send({ "log": "user added" });
  }
  else res.send({ "log": "user exist" });
});



// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = "mongodb://fewed:26853141q@ds117158.mlab.com:17158/mern-web-shop";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const product = require('./routes/product.route'); // Imports routes for the products
app.use('/products', product);







app.listen(3000);





