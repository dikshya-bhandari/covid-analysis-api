const router = require("express").Router();
const Controllers = require("./controllers");

const sendJson = (res, status, message, data) =>
  res.send({ status, message, data });

router.post("/getDatafromDateRange", (req, res) => {
  console.log(req.body);
  Controllers.getDatefromDateRange(req.body)
    .then((response) => {
      sendJson(res, "success", "", response);
    })
    .catch((err) => {
      sendJson(res, "failed", err.message, "");
    });
});

module.exports = router;
