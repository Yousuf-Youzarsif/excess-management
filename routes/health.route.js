import { health } from "../controllers/health.controller.js";
import express from "express";

const router = express.Router();

router.get("/health", health);
export default router;
