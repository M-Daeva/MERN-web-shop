const { port } = require("./config"),
  exp = require("express"),
  { text, json } = require("body-parser"),
  cors = require("cors"),
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
app.use("/local-db", localDB);

app.listen(port);
