import React, { useState } from "react";
import axios from "axios";
import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "@clerk/clerk-react";

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState(null);
    const { getToken } = useAuth();

    const onCreate = async () =>{
      const uuid = uuidv4();
      const token = await getToken();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-resume`,
          {resumeTitle: resumeTitle, resumeId: uuid},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setResumeTitle(null);
        setOpenDialog(false);
        
      } catch (error) {
        console.log("Error sending response to backend", error);
      }
    }

  return (
    <div>
      <div 
        className="p-14 py-24 border flex justify-center items-center bg-gray-100 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a Title for your New Resume</p>
            </DialogDescription>
            <Input 
              className="my-2" 
              placeholder="Ex.Full Stack Developer"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
            <div className="flex justify-end gap-5">
                <Button onClick={() => setOpenDialog(!openDialog)} variant="ghost">Cancel</Button>
                <Button 
                  onClick={() => onCreate()}
                  disabled={!resumeTitle}
                >Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
