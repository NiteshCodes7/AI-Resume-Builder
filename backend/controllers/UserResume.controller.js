import dotenv from "dotenv";
import { createClerkClient } from "@clerk/backend";
import { userResume } from "../models/UserResume.model.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


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

    res.status(200).json(newRecord)
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

export const getResume = async (req, res) => {
  try {
    const resume = await userResume.findById(req.params._id);
    res.status(200).json(resume);
  } catch (error) {
    console.log("Error fetchinng Resume details", error);
    res.status(500).json({message: "Unabel to fetch Resume data"});
  }
}


export const updateResume = async (req, res) => {
  const { _id } = req.params;
  const userId = req.auth?.userId;
  const updateData = req.body;

  try {
    const updated = await userResume.findOneAndUpdate(
      { _id, userId },
      { $set: updateData, lastUpdated: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Resume not found" });
    }
    console.log(updateData);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const summaryWithAi = async (req, res) => {
  const {jobTitle} = req.body;
  
  try {

    const prompt = `
        You are a professional resume writer. Based on the job title provided, generate a concise and impactful summary for a resume.

        Job Title: "${jobTitle}"

        Guidelines:
        - Keep it under 3 sentences.
        - Focus on skills, experience, and value the candidate brings.
        - Avoid clichés and generic phrases.
        - Make it ATS-friendly (use strong keywords).
        - Do not include greetings or headings.

        Now write the summary.
        `;

    const result = await ai.models.generateContent({   
      model: "gemini-2.5-flash",   
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })

    const summary = await result.text;
    console.log(summary);
    res.status(200).json({summary});

  } catch (error) {
    console.error("Unable to write Summary", error);
    res.status(500).json({ error: "AI Summary generation failed." })
  }
}


export const descriptionWithAi = async (req, res) => {
  const {title} = req.body;
  
  try {

    const prompt = `
        You are a professional resume writer. Write a concise, impactful job description for a resume based on the job title provided below.

        Job Title: "${title}"

        Guidelines:
        - Keep the description within 3–4 bullet points or short sentences.
        - Highlight key responsibilities, accomplishments, and relevant tools/technologies.
        - Use action verbs and metrics where appropriate.
        - Make it ATS-friendly and tailored to the role.
        - Avoid clichés and overly generic statements.

        Only return the description text. Do not add any headings, greetings, or extra formatting.
        `

    const result = await ai.models.generateContent({   
      model: "gemini-2.5-flash",   
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })

    const response = await result.text;
    const description = response.replace(/^\*\s?/gm, "").trim();
    console.log(description);
    res.status(200).json({description});

  } catch (error) {
    console.error("Unable to write Summary", error);
    res.status(500).json({ error: "AI Summary generation failed." })
  }
}

export const removeResume = async (req, res) => {
  const userId = req.auth?.userId;

  if(!userId){
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { _id } = req.params;

    const result = await userResume.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ message: "Resume deleted", _id });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
}