import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <SignIn />
    </div>
  )
}

export default SignInPage
