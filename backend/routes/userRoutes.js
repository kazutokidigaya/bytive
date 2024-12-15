import express from "express";
import {
  createUser,
  loginUser,
  refreshToken,
  logOut,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/refresh", refreshToken);

router.post("/logout", logOut);

export default router;
