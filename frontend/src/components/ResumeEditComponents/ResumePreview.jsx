import React from 'react'
import { useContext } from 'react'
import { ResumeInfoContext, useResumeInfo } from '../../context/ResumeInfoContext';
import PersonalDetailPreview from '../preview/PersonalDetailPreview';
import SummaryPreview from '../preview/SummaryPreview';
import ProfessionalExperiencePreview from "../preview/ProfessionalExperiencePreview";
import EducationalPreview from "../preview/EducationalPreview";
import SkillPreview from "../preview/SkillPreview";

const ResumePreview = () => {
  const{resumeInfo, setResumeInfo} = useResumeInfo();

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
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
