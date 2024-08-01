const router = require("express").Router();
const Controllers = require("./controllers");

const sendJson = (res, status, message, data) =>
  res.send({ status, message, data });

router.post("/getDatafromDateRange", (req, res) => {
  Controllers.getDatefromDateRange(req.body)
    .then((response) => {
      sendJson(res, "success", "", response);
    })
    .catch((err) => {
      sendJson(res, "failed", err.message, "");
    });
});

router.post("/getDatafromDate", (req, res) => {
  Controllers.getDatefromDate(req.body)
    .then((response) => {
      sendJson(res, "success", "", response);
    })
    .catch((err) => {
      sendJson(res, "failed", err.message, "");
    });
});

module.exports = router;
