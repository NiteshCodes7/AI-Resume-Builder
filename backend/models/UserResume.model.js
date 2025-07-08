import mongoose, { Schema } from "mongoose";

const UserResumeMetaSchema = new Schema({
    userId: { type: String, required: true },
    userEmail: { type: String },
    resumeId: { type: String, required: true },
    resumeTitle: { type: String, default: "Untitled Resume" },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const userResume = new mongoose.model("userResume", UserResumeMetaSchema);