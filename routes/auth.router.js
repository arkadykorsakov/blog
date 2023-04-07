import { Router } from "express";
const router = Router();
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  postLogout,
} from "../controllers/auth.controller.js";

router.get("/register", getRegister);

router.post("/register", postRegister);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.post("/logout", postLogout);

export default router;
