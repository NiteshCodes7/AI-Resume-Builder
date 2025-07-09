import React, { useEffect } from "react";
import FormSection from "../components/ResumeEditComponents/FormSection";
import ResumePreview from "../components/ResumeEditComponents/ResumePreview";
import { useResumeInfo } from "../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const ResumeEditor = () => {
  const {resumeInfo, setResumeInfo} = useResumeInfo();
  const { _id } = useParams();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResumeInfo(res.data); 
      } catch (error) {
        console.error("❌ Failed to fetch resume:", error);
      }
    };

    if (_id) fetchResume();
  }, [_id, getToken]);

  if (!resumeInfo) return <div className="p-10">Loading...</div>;

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
  );
};

export default ResumeEditor;
