import React from "react";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 shadow-md flex justify-between items-center">
      <img src="/logo.svg" alt="logo" width={125} height={125} />

      {isSignedIn ? (
        <div className="flex justify-center items-center gap-2">
          <Link to="/dashboard">
            <Button className="bg-newPurple cursor-pointer hover:bg-purple-600 ">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth-sign-in">
          <Button className="bg-newPurple cursor-pointer hover:bg-purple-600">
            <ArrowRight /> Get Started
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
