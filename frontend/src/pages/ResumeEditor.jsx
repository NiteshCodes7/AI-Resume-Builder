import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/ResumeEditComponents/FormSection";
import ResumePreview from "../components/ResumeEditComponents/ResumePreview";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import dummy from "../dummy";

const ResumeEditor = () => {
  const { _id } = useParams();
  const[resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    setResumeInfo(dummy);
  }, [])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeEditor;
