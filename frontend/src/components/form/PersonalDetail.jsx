import React, { useEffect } from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@clerk/clerk-react"; 
import { useResumeInfo } from "../../context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const PersonalDetail = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setResumeInfo((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value,
      },
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    enableNext(true);
    setLoading(true);

    try {
      const token = await getToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { personalDetails: resumeInfo.personalDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeInfo(res.data);

    } catch (error) {
      console.error("❌ Error saving personal details:", error);
    } finally {
      setLoading(false);
      toast("✅ Details Updated");
    }
  };


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-newPurple border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 gap-3 mt-5'>
            <div>
                <label className="text-sm">First Name</label>
                <Input name="firstName" defaultValue={resumeInfo.personalDetails?.firstName} required onChange={handleInputChange}/>
            </div>
            <div>
                <label className="text-sm">Last Name</label>
                <Input name="lastName" defaultValue={resumeInfo.personalDetails?.lastName} required onChange={handleInputChange}/>
            </div>
            <div className='col-span-2'>
                <label className="text-sm">Job Title</label>
                <Input name="jobTitle" defaultValue={resumeInfo.personalDetails?.jobTitle} required onChange={handleInputChange}/>
            </div>
            <div className='col-span-2'>
                <label className="text-sm">Address</label>
                <Input name="address" defaultValue={resumeInfo.personalDetails?.address} required onChange={handleInputChange}/>
            </div>
            <div>
                <label className="text-sm">Phone</label>
                <Input name="phone" defaultValue={resumeInfo.personalDetails?.phone} required onChange={handleInputChange}/>
            </div>
            <div>
                <label className="text-sm">Email</label>
                <Input name="email" defaultValue={resumeInfo.personalDetails?.email} required onChange={handleInputChange}/>
            </div>
        </div>
        <div className="mt-3 flex justify-end">
            <Button 
                type="submit"
                disabled={loading}
            >
                {loading ? <LoaderCircle className="animate-spin"/> : "Save"}
            </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail;
