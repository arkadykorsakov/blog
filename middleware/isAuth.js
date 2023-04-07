export const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = "СНАЧАЛА ВЫ ДОЛЖНЫ ВОЙТИ В СИСТЕМУ";
    res.redirect("/login");
  }
};
