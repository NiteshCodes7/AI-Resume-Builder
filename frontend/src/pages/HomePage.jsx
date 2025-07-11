import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Github,
  Sparkles,
  MousePointerClick,
  ClipboardCheck,
  FileText,
  Eye,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 gap-24 overflow-x-hidden bg-white mt-10">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center gap-6 max-w-4xl text-center">
        <div className="flex justify-between items-center gap-3 bg-gray-100 rounded-4xl p-2 max-w-[380px]">
          <div className="bg-newPurple text-white rounded-4xl p-2 w-[100px] text-center">
            Checkout
          </div>
          <Link
            to="https://github.com/NiteshCodes7"
            className="flex items-center gap-1 text-black hover:underline"
          >
            <Github className="w-4 h-4" />
            <span>My projects on GitHub &gt;</span>
          </Link>
        </div>

        <h1 className="font-bold text-6xl leading-tight">
          Build Your Resume <span className="text-newPurple">With AI</span>
        </h1>
        <p className="text-gray-700 font-medium max-w-xl">
          Effortlessly craft a professional resume in minutes using advanced AI
          technology.
        </p>
        <Button className="text-lg px-6 py-2">Get Started &gt;</Button>
      </div>

      {/* How it Works Section */}
      <section className="w-full max-w-6xl flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <Card
            icon={<Sparkles className="w-8 h-8 text-newPurple mb-2 mx-auto" />}
            title="Generate with AI"
            desc="Answer a few questions and let AI craft tailored content for your role."
          />
          <Card
            icon={
              <MousePointerClick className="w-8 h-8 text-newPurple mb-2 mx-auto" />
            }
            title="Customize Instantly"
            desc="Select themes, edit details, and personalize the layout instantly."
          />
          <Card
            icon={
              <ClipboardCheck className="w-8 h-8 text-newPurple mb-2 mx-auto" />
            }
            title="Download & Share"
            desc="Print, download, or share your resume link with one click."
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-6xl flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card
            icon={<FileText className="w-6 h-6 text-newPurple mx-auto" />}
            title="Smart Resume Templates"
            desc="Choose from professionally designed templates optimized for ATS and readability."
          />
          <Card
            icon={<Eye className="w-6 h-6 text-newPurple mx-auto" />}
            title="Real-Time Preview"
            desc="See your changes instantly with our live preview editor."
          />
        </div>
      </section>
    </div>
  );
};

const Card = ({ icon, title, desc }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition-all text-center">
    <div className="flex items-center justify-center md:justify-start mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-xl mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default HomePage;
