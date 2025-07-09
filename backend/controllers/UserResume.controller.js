import dotenv from "dotenv";
import { createClerkClient } from "@clerk/backend";
import { userResume } from "../models/UserResume.model.js";


dotenv.config({
  path: './.env'
});


const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUserContactInfo(userId) {
  try {
    if (!userId) throw new Error("User ID is missing");

    const user = await clerkClient.users.getUser(userId);

    const email = user?.emailAddresses?.[0]?.emailAddress || null;

    return email;
  } catch (error) {
    console.error(`❌ Failed to fetch contact info for user ${userId}:`, error.message);
    return { email: null };
  }
}

export const userData = async (req, res) => {
  const { resumeTitle, resumeId } = req.body;

  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const email = await getUserContactInfo(req.auth?.userId);

    const newRecord = await userResume.create({
      userId: req.auth.userId,
      userEmail: email,
      resumeId: resumeId,
      resumeTitle: resumeTitle,
    })

    res.status(200).json({ message: "Resume created", resumeId })
  } catch (error) {
    console.error("❌ Error creating user resume:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

export const getUserData = async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const resumes = await userResume.find({ userId });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("❌ Failed to get resumes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleResume = async (req, res) => {
  const { _id } = req.params;

  try {
    const resume = await userResume.findOne({ _id });

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("❌ Error fetching single resume:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
