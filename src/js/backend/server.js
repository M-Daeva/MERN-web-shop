const exp = require("express"),
  parser = require("body-parser"),
  cors = require("cors"),
  user = require("./routes/user.route"),
  test = require("./routes/test.route"),
  telegram = require("./telegramAPI"),
  app = exp(),
  port = process.env.PORT || 3000;


app.use(cors(), parser.text(), parser.json());
app.use("/", test);
app.use("/users", user);
app.post("/telegram", telegram);

app.listen(port);