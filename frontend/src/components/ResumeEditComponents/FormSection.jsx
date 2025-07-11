import React, { useEffect } from 'react'
import PersonalDetail from '../form/PersonalDetail'
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import Summary from '../form/Summary';
import Expirence from '../form/Expirence';
import Education from '../form/Education';
import Skills from '../form/Skills';
import { useNavigate, useParams } from 'react-router-dom';
import ThemeColor from '../ThemeColor';
import { Link } from 'react-router-dom';

const FormSection = () => {
  const [activeFormState, setActiveFormState] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    if (activeFormState === 6) {
      navigate(`/dashboard/resume/${_id}/view`);
    }
  }, [activeFormState]);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-3'>
          <Link to="/">
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex gap-2'>
          {activeFormState > 1 && 
            <Button 
              size="sm"
              onClick={() => setActiveFormState(activeFormState-1)}
            >
              <ArrowLeft />
            </Button>
          }
          <Button 
            className={`${activeFormState === 6 ? "hidden" : "flex"} gap-2`}
            size="sm"
            onClick={() => setActiveFormState(activeFormState+1)}
            disabled={!enableNext}
          >Next <ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Details */}
        {activeFormState === 1 ? <PersonalDetail enableNext={setEnableNext} /> : 
         activeFormState === 2 ? <Summary enableNext={setEnableNext} /> : 
         activeFormState === 3 ? <Expirence enableNext={setEnableNext} /> : 
         activeFormState === 4 ? <Education enableNext={setEnableNext} /> : 
         activeFormState === 5 ? <Skills  enableNext={setEnableNext}/> : null
        } 
        
      {/* Summary */}
        
      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  )
}

export default FormSection
