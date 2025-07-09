import express from "express";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
import { userData, getUserData, getSingleResume } from "../controllers/UserResume.controller.js"

const resumeRoute = express.Router();

resumeRoute.route("/create-resume").post(verifyClerkToken, userData);
resumeRoute.route("/get-resume").get(verifyClerkToken, getUserData);
resumeRoute.route("/dashboard/resume/:_id/edit").put(verifyClerkToken, getSingleResume);

export default resumeRoute;