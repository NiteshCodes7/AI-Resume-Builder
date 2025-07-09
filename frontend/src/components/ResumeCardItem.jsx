import React from "react";
import { Link } from "react-router-dom";
import { Notebook } from "lucide-react";

const ResumeCardItem = ({ resume }) => {
  return (
    <div>
      <Link to={`/dashboard/resume/${resume._id}/edit`}>
        <div className="p-14 bg-gray-100 border border-primary flex justify-center items-center h-[280px] rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer text-black">
          <Notebook />
        </div>
        <h2 className="text-center text-black my-1">{resume.resumeTitle}</h2>
      </Link>
    </div>
  );
};

export default ResumeCardItem;
