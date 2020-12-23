import express from "express";
import controller from "../../controllers/settingController.js";

const router = express.Router();

router.get("/:key", controller.show);
router.put("/:key", controller.update);

export default router;
