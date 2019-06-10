const { port } = require("./config"),
  exp = require("express"),
  { text, json } = require("body-parser"),
  cors = require("cors"),
  db = require("./routes/db"),
  grabber = require("./routes/grabber"),
  fingerprint = require("./routes/fingerprint"),
  telegram = require("./routes/telegram"),
  payment = require("./routes/payment"),
  test = require("./routes/test"),
  localDB = require("./routes/local-db"),
  main = require("./routes/main"),
  app = exp();

app.use(cors(), text(), json());
app.use("/", main);
app.use("/grabber", grabber);
app.use("/fingerprint", fingerprint);
app.use("/telegram", telegram);
app.use("/db", db);
app.use("/payment", payment);
app.use("/test", test);
app.use("/local-db", localDB);

app.listen(port);
