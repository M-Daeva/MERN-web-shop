const exp = require("express"),
  parser = require("body-parser"),
  cors = require("cors"),
  users = require("./routes/users"),
  db = require("./routes/db"),
  grabber = require("./routes/grabber"),
  fingerprint = require("./routes/fingerprint"),
  test = require("./routes/test"),
  telegram = require("./routes/telegram"),
  app = exp(),
  port = process.env.PORT || 3000;

app.use(cors(), parser.text(), parser.json());
app.use("/", test);
app.use("/users", users);
app.use("/grabber", grabber);
app.use("/fingerprint", fingerprint);
app.use("/telegram", telegram);
app.use("/db", db);

app.listen(port);
