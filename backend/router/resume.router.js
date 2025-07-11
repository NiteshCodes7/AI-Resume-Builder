import express from "express";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
import { userData, getUserData, getResume, updateResume, summaryWithAi, descriptionWithAi, removeResume } from "../controllers/UserResume.controller.js"

const resumeRoute = express.Router();

resumeRoute.post("/ping", (req, res) => {
    res.status(200).send("Server is awaken!");
});

resumeRoute.get("/", (req, res) => {
    res.status(200).send("Resume API is live!");
});

resumeRoute.route("/create-resume").post(verifyClerkToken, userData);
resumeRoute.route("/get-resume").get(verifyClerkToken, getUserData);
resumeRoute.route("/dashboard/resume/:_id").get(verifyClerkToken, getResume);
resumeRoute.route("/dashboard/resume/:_id/edit").patch(verifyClerkToken, updateResume);
resumeRoute.route("/dashboard/summary-generate").post(verifyClerkToken, summaryWithAi);
resumeRoute.route("/dashboard/description-generate").post(verifyClerkToken, descriptionWithAi);
resumeRoute.route("/resume/:_id/delete").delete(verifyClerkToken, removeResume);

export default resumeRoute;