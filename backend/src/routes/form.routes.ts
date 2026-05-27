
import express from "express";
import { submitForm } from "../controllers/auth/form.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/rolebase.middleware";

const router = express.Router();

router.post("/submit", authMiddleware, roleMiddleware("admin"), submitForm);

export default router;
