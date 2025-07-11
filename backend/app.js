import express, { urlencoded } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(clerkMiddleware());

import resumeRoute from "./router/resume.router.js";

app.use("/v1/resume", resumeRoute);

export { app };