import React, { useState, useEffect } from "react";
import { useResumeInfo } from "../../context/ResumeInfoContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";

const Education = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const formData = {
    institute: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  const [educationalList, setEducationalList] = useState([{...formData}]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { _id } = useParams();

  const handleChange = (e, index) => {
    const {name, value} = e.target;
    const updated = [...educationalList];
    updated[index][name] = value;
    setEducationalList(updated);

    setResumeInfo((prev) => ({
        ...prev,
        education: updated
    }))

    enableNext(false);
  };

  const addNewEducation = () => {
    const updated = [...educationalList, { ...formData }];
    setEducationalList(updated);

    setResumeInfo((prev) => ({
        ...prev,
        education: updated
    }))
  };

  const removeEducaton = () => {
    if (educationalList.length > 1) {
      const updated = educationalList.slice(0, -1);
      setEducationalList(updated);

      setResumeInfo((prev) => ({
        ...prev,
        education: updated
    }))
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { education: educationalList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setResumeInfo(res.data);
      toast("✅ Education Details Updated");
      enableNext(true);
    } catch (err) {
      toast.error("❌ Failed to save education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (resumeInfo?.education && resumeInfo.education.length > 0) {
    setEducationalList(resumeInfo.education);
  }
}, [resumeInfo.education]);


  return (
    <div className="p-5 shadow-lg rounded-lg border-t-newPurple border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Education Details</p>

      {educationalList.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <div className="col-span-2">
            <label className="text-xs font-medium">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="institute"
              type="text"
              value={item.institute}
              required
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Degree <span className="text-red-500">*</span></label>
            <Input
              name="degree"
              type="text"
              value={item.degree}
              required
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Major</label>
            <Input
              name="major"
              type="text"
              value={item.major}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Start Date <span className="text-red-500">*</span></label>
            <Input
              name="startDate"
              type="date"
              value={item.startDate}
              required
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <label className="text-xs font-medium">End Date <span className="text-red-500">*</span></label>
            <Input
              name="endDate"
              type="date"
              value={item.endDate}
              required
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium">Description <span className="text-red-500">*</span></label>
            <Textarea
              name="description"
              type="text"
              value={item.description}
              required
              onChange={(e) => handleChange(e, index)}
            />
          </div>

          <div className="flex justify-between items-end col-span-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-newPurple border-newPurple"
                onClick={addNewEducation}
              >
                + Add More Education
              </Button>
              {educationalList.length > 1 && (
                <Button
                  variant="outline"
                  className="text-newPurple border-newPurple"
                  onClick={removeEducaton}
                >
                  - Remove
                </Button>
              )}
            </div>
                <Button onClick={onSave} disabled={loading}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
