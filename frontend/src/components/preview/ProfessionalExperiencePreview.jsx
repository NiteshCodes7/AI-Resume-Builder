import React from "react";

const ProfessionalExperiencePreview = ({ resumeInfo }) => {
  const experienceList = resumeInfo?.experience || [];

  if (experienceList.length === 0) return null;

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Expirence
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          {experience?.companyName && experience?.city && experience?.state && (
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {experience?.title}
            </h2>
          )}
          {experience?.companyName && experience?.city && experience?.state && (
            <h2 className="text-xs flex justify-between">
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate} {<i className="font-semibold">to</i>}{" "}
                {experience?.endDate}
              </span>
            </h2>
          )}
          {/* <p className='text-xs my-2'>{experience?.description}</p> */}
          <div
            className="text-xs mt-2"
            dangerouslySetInnerHTML={{ __html: experience?.description }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperiencePreview;
