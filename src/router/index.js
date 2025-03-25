const Router = require("express");
const {
  helloController,
  uploadDailyNetwork,
  uploadEventCount,
} = require("../controller/index");

const router = Router();

router.get("/", helloController);

router.post("/uploadDaily", uploadDailyNetwork);
router.post("/uploadEvent", uploadEventCount);

module.exports = router;
