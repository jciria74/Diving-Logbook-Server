const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.set("trust proxy", 1);
  app.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      sameSite: "none",
      secure: true,
    })
  );
};
