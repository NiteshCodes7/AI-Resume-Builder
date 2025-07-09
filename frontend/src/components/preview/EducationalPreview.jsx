import React from 'react'

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
        <h2 
            className='text-center font-bold text-sm mb-2'
            style={{color: resumeInfo?.themeColor}}
        >
            Education
        </h2>
        <hr style={{borderColor: resumeInfo?.themeColor}}/>

        {resumeInfo?.education.map((education, index) => (
            <div key={index} className='my-5'>
                <h2 
                    className='text-sm font-bold'
                    style={{color: resumeInfo?.themeColor}}
                >
                    {education?.institute}
                </h2>
                <h2 className='text-sm flex justify-between'>{education?.degree}  {education?.major}
                    <span>{education?.startYear}-{education?.endYear}</span>
                </h2>
                <p className='text-xs my-2'>
                    {education?.description}
                </p>
            </div>
        ))}
    </div>
  )
}

export default EducationalPreview;
