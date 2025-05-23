import express from "express";
import * as userController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/save", userController.save);
router.post("/login", userController.login);

export default router;
