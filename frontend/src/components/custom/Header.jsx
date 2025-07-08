import React from 'react'
import { Button } from "../ui/button.jsx"

const Header = () => {
  return (
    <div className='p-3 px-5 shadow-md flex justify-between items-center'>
      <img 
        src="/logo.svg" 
        alt="logo" 
        width={125}
        height={125}
      />

      <Button>Get Started</Button>
    </div>
  )
}

export default Header
