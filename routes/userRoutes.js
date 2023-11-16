import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
