const express = require("express");
const controller = require("../controllers/text.controller");

const router = express.Router();
module.exports = router;

router.get("/", controller.allText);
router.put("/:id", controller.editText);
router.delete("/:id", controller.eliminateText);
router.post("/", controller.createText);
