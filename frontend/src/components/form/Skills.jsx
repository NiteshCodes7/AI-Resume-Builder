import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "../../context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Skills = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { _id } = useParams();

  const formData = {
    skill: "",
    rating: 0,
  };

  const [skillList, setSkillList] = useState([{ ...formData }]);

  const handleChange = (e, index) => {
    enableNext(false);
    const { name, value } = e.target;

    const updated = [...skillList];
    updated[index][name] = value;
    setSkillList(updated);

    setResumeInfo({ ...resumeInfo, skills: updated });
  };

  const addNewSkill = () => {
    const updated = [...skillList, { ...formData }];
    setSkillList(updated);

    setResumeInfo((prev) => ({
      ...prev,
      skills: updated,
    }));
  };

  const removeSkill = () => {
    if (skillList.length > 1) {
      const updated = skillList.slice(0, -1);
      setSkillList(updated);

      setResumeInfo((prev) => ({
        ...prev,
        skills: updated,
      }));
    }
  };

  const onSave = async () => {
    setLoading(true);

    try {
      const token = await getToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { skills: resumeInfo.skills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeInfo(res.data);
      enableNext(true);
    } catch (error) {
      console.error("❌ Error saving Skills:", error);
    } finally {
      setLoading(false);
      toast("✅ Skills Updated");
    }
  };

  useEffect(() => {
    if(resumeInfo?.skills && resumeInfo.skills.length > 0){
        setSkillList(resumeInfo.skills);
    }
  }, [resumeInfo.skills])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-newPurple border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add you Profesional Skills</p>

      <div>
        {skillList.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center border p-3 rounded-lg my-2">
              <div>
                <label className="text-xs font-medium">Name <span className="text-red-500">*</span></label>
                <Input name="skill" value={item.skill} onChange={(e) => handleChange(e, index)} />
              </div>
              <div id="rating">
                <Rating
                  name="rating"
                  style={{ maxWidth: 120 }}
                  value={item.rating}
                  onChange={(value) => {
                    const updated = [...skillList];
                    updated[index].rating = value;
                    setSkillList(updated);

                    setResumeInfo((prev) => ({
                      ...prev,
                      skills: updated,
                    }));
                    enableNext(false);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-newPurple border-newPurple"
                  onClick={addNewSkill}
                >
                  + Add More Skills
                </Button>
                {skillList.length > 1 && (
                  <Button
                    variant="outline"
                    className="text-newPurple border-newPurple"
                    onClick={removeSkill}
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
    </div>
  );
};

export default Skills;
