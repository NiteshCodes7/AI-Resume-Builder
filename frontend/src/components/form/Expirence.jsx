import React, { useState } from "react";
import axios from "axios";
import { useResumeInfo } from "../../context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import RichTextEditor from "../RichTextEditor";
import { Brain } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Expirence = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [expirenceList, setExpirenceList] = useState(  
    resumeInfo?.experience?.length > 0 ? resumeInfo.experience : [{ ...formField }]
    );
  const [aiLoading, setAiLoading] = useState(false);
  const { _id } = useParams();
  const { getToken } = useAuth();

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const updated = [...expirenceList];
    updated[i][name] = value;
    setExpirenceList(updated);

    // Live update context too
    setResumeInfo((prev) => ({
      ...prev,
      experience: updated,
    }));

    enableNext(false);
  };

  const handleRichTextEditor = (e, i) => {
    const updated = [...expirenceList];
    updated[i].description = e.target.value;
    setExpirenceList(updated);

    setResumeInfo((prev) => ({
      ...prev,
      experience: updated,
    }));
  };

  const addNewExpirence = () => {
    setExpirenceList((prev) => [...prev, { ...formField }]);
  };

  const removeExpirence = () => {
    if (expirenceList.length > 1) {
      const updated = expirenceList.slice(0, -1);
      setExpirenceList(updated);
      setResumeInfo((prev) => ({
        ...prev,
        experience: updated,
      }));
    }
  };

  const onSave = async () => {
    try {
      const token = await getToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { experience: expirenceList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeInfo(res.data);
      toast("✅ Experience Updated");
      enableNext(true);
    } catch (err) {
      toast.error("❌ Failed to save experience");
    }
  };

  const generateDescription = async (index) => {
    try {
        if(expirenceList[index].title === ""){
            toast("Please Add Position Title!");
            return;
        }
      setAiLoading(true);
      const token = await getToken();

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/description-generate`,
        { title: expirenceList[index].title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updated = [...expirenceList];
      updated[index].description = res.data.description;

      setExpirenceList(updated);
      setResumeInfo((prev) => ({
        ...prev,
        experience: updated,
      }));
    } catch (error) {
      console.error("❌ Error generating description:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-newPurple border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      {expirenceList.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-sm font-medium">Position Title</label>
              <Input
                name="title"
                value={item.title}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input
                name="companyName"
                value={item.companyName}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <Input
                name="city"
                value={item.city}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <Input
                name="state"
                value={item.state}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                name="startDate"
                value={item.startDate}
                type="date"
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                name="endDate"
                value={item.endDate}
                type="date"
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between my-2 items-center">
                <label className="text-sm font-medium">Job Description</label>
                <Button
                  onClick={() => generateDescription(index)}
                  variant="outline"
                  size="sm"
                  className="flex gap-2 border-newPurple text-newPurple"
                >
                  {aiLoading ? (
                    <>
                      <Brain className="h-4 w-4 animate-pulse" />
                      AI Thinking...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      Generate from AI
                    </>
                  )}
                </Button>
              </div>
              <RichTextEditor
                value={item.description}
                onChange={(e) => handleRichTextEditor(e, index)}
              />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-newPurple border-newPurple"
                onClick={addNewExpirence}
              >
                + Add More Experience
              </Button>
              {expirenceList.length > 1 && (
                <Button
                  variant="outline"
                  className="text-newPurple border-newPurple"
                  onClick={removeExpirence}
                >
                  - Remove
                </Button>
              )}
            </div>
            <Button onClick={onSave}>Save</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Expirence;
