export function errorHandler(res, e) {
  console.log(e);
  res.status(500);
}
