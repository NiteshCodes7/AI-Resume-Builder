import express from "express";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
import { userData, getUserData, getResume, updateResume, summaryWithAi } from "../controllers/UserResume.controller.js"

const resumeRoute = express.Router();

resumeRoute.route("/create-resume").post(verifyClerkToken, userData);
resumeRoute.route("/get-resume").get(verifyClerkToken, getUserData);
resumeRoute.route("/dashboard/resume/:_id").get(verifyClerkToken, getResume);
resumeRoute.route("/dashboard/resume/:_id/edit").patch(verifyClerkToken, updateResume);
resumeRoute.route("/dashboard/summary-generate").post(verifyClerkToken, summaryWithAi);

export default resumeRoute;