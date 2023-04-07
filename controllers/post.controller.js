import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getPosts = async (req, res) => {
  const auth = req.session.isAuth;
  let posts = await Post.find({}).lean();
  try {
    posts = posts.map((post) => {
      post["createdAt"] = new Date(post["createdAt"]).toLocaleDateString();
      return post;
    });
    res.render("posts", { title: "Posts Page", posts, auth });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const deleteByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    Post.findByIdAndDelete(id).then((result) => {
      res.sendStatus(200);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const getByIdPost = async (req, res) => {
  try {
    const auth = req.session.isAuth;
    const id = req.params.id;
    const post = await Post.findById(id).lean();
    post["createdAt"] = new Date(post["createdAt"]).toLocaleDateString();
    res.render("post", { title: "Post Page", post, auth });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const getAddPost = (req, res) => {
  try {
    const auth = req.session.isAuth;
    const author = req.session.username;
    res.render("add-post", { title: "Add Post Page", auth, author });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const addPost = async (req, res) => {
  try {
    const { name, author, text } = req.body;
    const post = new Post({ name, author, text });
    await post.save();
    res.redirect("/posts");
  } catch (e) {
    errorHandler(res, e);
  }
};

export const getEditPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).lean();
    const auth = req.session.isAuth;
    res.render("edit", { title: "Edit Post Page", post, auth });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const EditPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, text } = req.body;
    const post = await Post.findByIdAndUpdate(id, { name, author, text });
    await post.save();
    res.redirect(`/posts/${id}`);
  } catch (e) {
    errorHandler(res, e);
  }
};
