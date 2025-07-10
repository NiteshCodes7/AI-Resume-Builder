import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import AddResume from "../components/AddResume";
import ResumeCardItem from "../components/ResumeCardItem";

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

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p>Start building resumes for different job roles</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />

        {resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
