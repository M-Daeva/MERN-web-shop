const exp = require("express"),
  parser = require("body-parser"),
  app = exp(),
  user = require("./dbAPI").user,
  { isExist, addUser, sendEmail, sendSMS } = require("./backAPI");


app.use("/", parser.json());
app.use("/users", user);


app.get("/", (req, res) => {
  res.send(JSON.stringify({ a: 7 }));
});


app.post("/", async (req, res) => {
  const data = req.body;
  /*
  //  if (data.phone !== "") sendSMS("yo man");
  if (/\w+@\w+\.\w/.test(data.email)) sendEmail("Jackie Chan", data.email, `hey ${data.name}!`);
  if (!isExist(data, storage)) {
    addUser(data, storage);
    res.send({ "log": "user added" });
  }
  else res.send({ "log": "user exist" });
  */

  data.id = 777;
  res.send(JSON.stringify(data));
});



app.listen(3000);