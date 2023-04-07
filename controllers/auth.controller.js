import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
const { genSaltSync, hashSync, compareSync } = bcryptjs;

export const getRegister = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("register", { title: "Registration", error });
};

export const postRegister = async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    req.session.error = "ПОЛЬЗОВАТЕЛЬ УЖЕ СУЩЕСТВУЕТ";
    res.redirect("/register");
  } else {
    if (repeatPassword === password) {
      const salt = genSaltSync(10);
      const user = new User({ email, password: hashSync(password, salt) });
      await user.save();
      res.redirect("/login");
    } else {
      req.session.error = "ПАРОЛИ ДОЛЖНЫ СОВПАДАТЬ";
      res.redirect("/register");
    }
  }
};

export const getLogin = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login", { title: "Login", error });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (compareSync(password, user.password)) {
      req.session.isAuth = true;
      req.session.username = user.email;
      res.redirect("/posts");
    } else {
      req.session.error = "НЕВЕРНЫЙ ПАРОЛЬ";
      res.redirect("/login");
    }
  } else {
    req.session.error = "ПОЛЬЗОВАТЕЛЬ НЕ СУЩЕСТВУЕТ";
    res.redirect("/login");
  }
};

export const postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("login");
  });
};
