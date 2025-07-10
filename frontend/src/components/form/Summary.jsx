import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeInfo } from "../../context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { getToken } = useAuth();
  const { _id } = useParams();
  
  const handleChange = (e) => {
    enableNext(false);
    const { value } = e.target;

    setResumeInfo((prev) => ({
      ...prev,
      summary: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { summary: resumeInfo.summary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeInfo(res.data);
      enableNext(true);
    } catch (error) {
      console.error("❌ Error saving Summary:", error);
    } finally {
      setLoading(false);
      toast("✅ Summary Updated");
    }
  };

  const generateSummaryFromAI = async () => {
    try {
      setAiLoading(true);
      const token = await getToken();

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/summary-generate`,
        { jobTitle : resumeInfo.personalDetails?.jobTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      setResumeInfo((prev) => ({
        ...prev,
        summary: res.data.summary,
      }));

    } catch (error) {
      console.error("❌ Error saving Summary:", error);
    } finally{
      setAiLoading(false);
    }
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-newPurple border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a Summary for your Job Title</p>

      <div className="mt-7">
        <div className="flex justify-between items-end">
          <label>Add Summary <span className="text-red-500">*</span></label>
          <Button
            size="sm"
            variant="outline"
            className="border-newPurple text-newPurple"
            onClick={generateSummaryFromAI}
          >
            {aiLoading ? (
              <>
                <Brain className="h-4 w-4 animate-pulse" /> <span className="animate-pulse">AI Thinking...</span>
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" /> Generate with AI
              </>
            )}
          </Button>
        </div>
        <Textarea
          onChange={handleChange}
          value={resumeInfo.summary || ""}
          required
          className="mt-5"
        />
        <div className="flex justify-end mt-3">
          <Button type="submit" onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
