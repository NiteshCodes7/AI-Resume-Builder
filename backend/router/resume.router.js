import express from "express";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
import { userData } from "../controllers/UserResume.controller.js"

const resumeRoute = express.Router();

resumeRoute.route("/create-resume").post(verifyClerkToken, userData);

export default resumeRoute;