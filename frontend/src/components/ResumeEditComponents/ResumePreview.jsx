import React, { useEffect } from 'react'
import axios from "axios";
import { useResumeInfo } from '../../context/ResumeInfoContext';
import PersonalDetailPreview from '../preview/PersonalDetailPreview';
import SummaryPreview from '../preview/SummaryPreview';
import ProfessionalExperiencePreview from "../preview/ProfessionalExperiencePreview";
import EducationalPreview from "../preview/EducationalPreview";
import SkillPreview from "../preview/SkillPreview";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { Loader } from 'lucide-react';


const ResumePreview = () => {
  const{resumeInfo, setResumeInfo} = useResumeInfo();
  const { getToken } = useAuth();
  const { _id } = useParams();


  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumeInfo(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch resume:", err);
      }
    };

    if (!resumeInfo) {
      fetchResume();
    }
  }, []);

    if (!resumeInfo) return <div className="fixed flex inset-0 justify-center items-center bg-white z-50"><Loader className="animate-spin w-8 h-8 text-gray-600"/></div>


  return (
    <div id='print-area' className='shadow-lg h-full p-14 border-t-[10px]'
        style={{ borderTopColor: resumeInfo?.themeColor}}
    >
      {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>

      {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>

      {/* Professional Expirence */}
        <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>

      {/* Education */}
        <EducationalPreview resumeInfo={resumeInfo}/>

      {/* Skills */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
