import { Router } from "express";
import {
  getPosts,
  getByIdPost,
  getAddPost,
  addPost,
  deleteByIdPost,
  getEditPost,
  EditPost,
} from "../controllers/post.controller.js";
const router = Router();

import { isAuth } from "../middleware/isAuth.js";

router.get("/posts", isAuth, getPosts);

router.get("/posts/:id", isAuth, getByIdPost);

router.get("/add-post", isAuth, getAddPost);

router.get("/edit/:id", isAuth, getEditPost);

router.post("/add-post", isAuth, addPost);

router.put("/edit/:id", isAuth, EditPost);

router.delete("/posts/:id", isAuth, deleteByIdPost);

export default router;
