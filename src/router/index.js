const Router = require("express");
const {
  helloController,
  uploadDailyNetwork,
  uploadEventCount,
  createEvent,
  createDailyModel,
} = require("../controller/index");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", helloController);

router.post("/uploadDaily", uploadDailyNetwork);
router.post("/uploadEvent", uploadEventCount);

router.post("/event", upload.single("EventCounts"), createEvent);

router.post("/daily_model", upload.single("DailyCounts", createDailyModel));

module.exports = router;
