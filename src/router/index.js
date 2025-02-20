const Router = require("express");
const { helloController, datasetController } = require("../controller/index");

const router = Router();

router.get("/", helloController);

router.post("/", datasetController);

module.exports = router;
