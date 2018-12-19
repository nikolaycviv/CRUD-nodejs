"use strict";

const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");

router.get("/", user_controller.welcome);

router.get("/users", user_controller.all_users_details);
router.post("/users", user_controller.user_create);
router.get("/users/:id", user_controller.user_details);
router.put("/users/:id", user_controller.user_update);
router.delete("/users/:id", user_controller.user_delete);

module.exports = router;
