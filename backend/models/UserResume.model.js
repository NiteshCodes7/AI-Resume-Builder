import mongoose, { Schema } from "mongoose";

const UserResumeMetaSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    resumeId: {
        type: String,
        required: true,
        unique: true,
    },
    resumeTitle: {
        type: String,
        required: true,
    },
    themeColor: {
        type: String,
        default: "#000",
    },

    personalDetails: {
        firstName: { type: String },
        lastName: { type: String },
        jobTitle: { type: String },
        address: { type: String },
        phone: { type: String },
        email: { type: String }
    },

    summary: {
        type: String,
    },

    education: [
        {
            institute: String,
            degree: String,
            major: String,
            startDate: String,
            endDate: String,
            description: String,
        }
    ],

    experience: [
        {
            title: String,
            companyName: String,
            city: String,
            state: String,
            startDate: String,
            endDate: String,
            description: String
        }
    ],

    skills: [
        {
            skill: String,
            rating: Number
        }
    ],

    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

export const userResume = new mongoose.model("userResume", UserResumeMetaSchema);