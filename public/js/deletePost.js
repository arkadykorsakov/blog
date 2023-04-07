document.addEventListener("click", async (e) => {
  const id = e.target?.dataset?.id || null;
  if (id) {
    await fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/posts";
    });
  }
});
