import React from 'react'

const PersonalDetailPreview = ({resumeInfo}) => {
  return (
    <div>
      <h2 
        className='font-bold text-xl text-center'
        style={{color: resumeInfo?.themeColor}}
      >
        {resumeInfo?.personalDetails?.firstName} {resumeInfo.personalDetails?.lastName}
      </h2>

      <h2 
        className='font-medium text-center text-sm'
        style={{color: resumeInfo?.themeColor}}
      >
        {resumeInfo.personalDetails?.jobTitle}
      </h2>

      <h2 
        className='font-normal text-center text-xs'
        style={{color: resumeInfo?.themeColor}}
      >
          {resumeInfo?.personalDetails?.address}
      </h2>

      <div className='flex justify-between'>
        <h2 
          className='font-normal text-xs'
          style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.personalDetails?.phone}
        </h2>
        <h2 
          className='font-normal text-xs'
          style={{color: resumeInfo?.themeColor}}
        >
          {resumeInfo?.personalDetails?.email}
        </h2>
      </div>
      <hr 
        className='broder-[1.5px] my-2'
        style={{borderColor: resumeInfo?.themeColor}}
      />
    </div>
  )
}

export default PersonalDetailPreview;
