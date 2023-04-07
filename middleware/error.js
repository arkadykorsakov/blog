export const errorFindPath = (req, res) => {
  res.status(404).render("error", { title: "Error Page" });
};
