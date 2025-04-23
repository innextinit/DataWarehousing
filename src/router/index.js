const Router = require("express");
const {
  helloController,
  uploadDailyNetwork,
  uploadEventCount,
  createEvent,
  createDailyModel,
  //
  upsertEventCount,
  getAllUsers,
  getUserById,
  searchEventByType,
  searchByHour,
  getUsersByRepoStatus,
  eventLeaderboard,
  deleteUserById,
  userConvoRelationship,
} = require("../controller/index");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", helloController);

router.post("/uploadDaily", uploadDailyNetwork);

router.post("/uploadEvent", uploadEventCount);

router.post("/event", upload.single("EventCounts"), createEvent);

router.post("/dailyModel", upload.single("DailyCounts"), createDailyModel);

router.post("/upsertEvent", upload.single("Event"), upsertEventCount);

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.get("/search/eventType", searchEventByType);

router.get("/search/hour", searchByHour);

router.get("/users/repoStatus/", getUsersByRepoStatus);

router.get("/leaderboard/events", eventLeaderboard);

router.delete("/users/:id", deleteUserById);

router.get("/userConvo", userConvoRelationship);

module.exports = router;
