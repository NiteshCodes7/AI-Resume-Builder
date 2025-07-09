import React from 'react'
import PersonalDetail from '../form/PersonalDetail'
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

const FormSection = () => {
  const [activeFormState, setActiveFormState] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <Button variant={"outline"} size="sm" className="flex gap-2"><LayoutGrid /> Theme</Button>
        <div className='flex gap-2'>
          {activeFormState > 1 && 
            <Button 
              size="sm"
              onClick={() => setActiveFormState(activeFormState-1)}
            >
              <ArrowLeft />
            </Button>}
          <Button 
            className="flex gap-2" 
            size="sm"
            onClick={() => setActiveFormState(activeFormState+1)}
            disabled={!enableNext}
          >Next <ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Details */}
        {activeFormState === 1 ? <PersonalDetail enableNext={enableNext} /> : null}
      {/* Summary */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  )
}

export default FormSection
