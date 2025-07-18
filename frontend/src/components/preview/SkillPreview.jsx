import React from 'react'

const SkillPreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
        <h2 
            className='text-center font-bold text-sm mb-2'
            style={{color: resumeInfo?.themeColor}}
        >
            Skills
        </h2>
        <hr style={{borderColor: resumeInfo?.themeColor}}/>

        <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => (
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs'>{skill.skill}</h2>
                <div className='h-2 w-2/3 rounded-md bg-gray-200 print-skill-bar-container'>
                    <div 
                        className='h-2 rounded-md print-skill-bar-fill'
                        style={{backgroundColor: resumeInfo?.themeColor, width:parseInt(skill.rating*20) +'%'}}
                    >
                        
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default SkillPreview;
