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
  app = exp();

app.use(cors(), text(), json());
app.use("/grabber", grabber);
app.use("/fingerprint", fingerprint);
app.use("/telegram", telegram);
app.use("/db", db);
app.use("/payment", payment);
app.use("/test", test);

app.listen(port);
