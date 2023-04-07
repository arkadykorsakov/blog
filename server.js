import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import mongoose from "mongoose";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import config from "config";
import methodOverride from "method-override";

import postsRouter from "./routes/posts.router.js";
import authRouter from "./routes/auth.router.js";

import { errorFindPath } from "./middleware/error.js";

const app = express();

const MongoDBStore = connectMongoDBSession(session);

const PORT = config.get("PORT");
const db = config.get("uri");

const __dirname = path.resolve();

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const store = new MongoDBStore({
  uri: db,
  collection: "sessions",
});

app.use(
  session({
    // СТРОКА, КОТОРОЙ ПОДПИСЫВАЕТСЯ СОХРАНЯЕМЫЙ В COOKIE ИДЕНТИФИКАТОР СЕССИИ
    secret: "secret",
    // НУЖНО ЛИ ПЕРЕСОХРАНЯТЬ СЕССИЮ В ХРАНИЛИЩЕ, ЕСЛИ ОНА НЕ ИЗМЕНИЛАСЬ
    resave: false,
    // В ХРАНИЛИЩЕ НЕ БУДУТ ПОПАДАТЬ ПУСТЫЕ СЕССИИ
    saveUninitialized: false,
    // ЭКЗЕМПЛЯР ХРАНИЛИЩА, КОТОРОЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ ДЛЯ ХРАНЕНИЯ СЕССИИ
    store: store,
  })
);

async function start() {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is working");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

app.get("/", (req, res) => {
  const auth = req.session.isAuth;
  res.render("index", { title: "Home Page", auth });
  res.status(200);
});

app.use(postsRouter);
app.use(authRouter);
app.use(errorFindPath);
