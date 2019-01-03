const exp = require("express"),
  parser = require("body-parser"),
  cors = require("cors"),
  user = require("./routes/user.route"),
  test = require("./routes/test.route"),
  app = exp(),
  port = process.env.PORT || 3000;


app.use(cors(), parser.json());
app.use("/", test);
app.use("/users", user);

app.listen(port);