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
  path = require("path"),
  express = require("express"),
  compression = require("compression"),
  app = exp(),
  statPathStr = "../../docs".split("/"),
  statPath = path.join(__dirname, ...statPathStr),
  stat = express.static(statPath);

app.use(compression(), cors(), text(), json());
//app.use(compression(), cors(), text(), json(), stat);
//app.use("/", main);
app.use("/grabber", grabber);
app.use("/fingerprint", fingerprint);
app.use("/telegram", telegram);
app.use("/db", db);
app.use("/payment", payment);
app.use("/test", test);
app.use("/local-db", localDB);

app.listen(port);
