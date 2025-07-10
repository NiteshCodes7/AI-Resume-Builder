import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Download, MoreVertical, Notebook, Pen, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";


const ResumeCardItem = ({ resume, onDelete }) => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const deleteResume = async () => {
    try {
      const token = await getToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/resume/${resume._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast("✅ Resume Deleted Successfully");

      onDelete(resume._id);
    } catch (error) {
      console.log("Resume Deletion Failed", error)
      toast("❌ Failed to delete Resume")
    }
  }

  return (
    <div>
      <Link to={`/dashboard/resume/${resume._id}/edit`}>
        <div className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border border-t-4 border-t-orangeRed flex justify-center items-center h-[280px] rounded-lg hover:scale-105 transition-all hover:shadow-md hover:shadow-newPurple cursor-pointer text-black">
          {/* <Notebook /> */}
          <img src="/cv.png" alt="CV" width={80} height={80} />
        </div>
      </Link>
        <div className="p-3 font-medium flex justify-between items-center">
          <h2 className="text-start text-sm text-black">{resume.resumeTitle}</h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger><MoreVertical className="text-black h-4 w-4 cursor-pointer outline-none"/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume._id}/edit`)} className="cursor-pointer"><Pen /> Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (`/dashboard/resume/${resume._id}/view`)} className="cursor-pointer"><View /> View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (`/dashboard/resume/${resume._id}/view`)} className="cursor-pointer"><Download /> Download</DropdownMenuItem>
              <DropdownMenuItem onClick={deleteResume} className="cursor-pointer"><Delete /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </div>
  );
};

export default ResumeCardItem;
