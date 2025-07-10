import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import AddResume from "../components/AddResume";
import ResumeCardItem from "../components/ResumeCardItem";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const { getToken } = useAuth();

  const getResumes = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-resume`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeList(res.data);
    } catch (error) {
      console.error("❌ Cannot fetch resumes", error);
    }
  };

  useEffect(() => {
    getResumes();
  }, []);

  if(!resumeList) return <div className="fixed flex inset-0 justify-center items-center bg-white z-50"><Loader className="animate-spin w-8 h-8 text-gray-600"/></div>

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p>Start building resumes for different job roles</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />

        {resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} onDelete={(deletedId) => {
            setResumeList((prev) => prev.filter((r) => r._id !== deletedId));
          }} />

        ))}
      </div>
    </div>
  );
};

export default Dashboard;
