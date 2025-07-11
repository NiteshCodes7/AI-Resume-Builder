import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { useResumeInfo } from "../context/ResumeInfoContext";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";


const ThemeColor = () => {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const { getToken } = useAuth();
  const { _id } = useParams(); 

  
  const onSeletion = (color) => {
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    onSave(color);
  };

  const onSave = async (color) => {

    try {
      const token = await getToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${_id}/edit`,
        { themeColor: color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeInfo(res.data);
    } catch (error) {
      console.error("❌ Error saving Theme Color:", error);
    } finally {
      toast("✅ Theme Color Updated");
    }
  };

  const colors = [
    "#000",
    "#4169E1", // Royal Blue
    "#6A0DAD", // Deep Purple
    "#2ECC71", // Emerald Green
    "#2C3E50", // Midnight Blue
    "#34495E", // Charcoal Grey
    "#008080", // Teal
    "#708090", // Slate Grey
    "#4682B4", // Steel Blue
    "#00B7C2", // Cool Cyan
    "#E67E22", // Carrot Orange
    "#D35400", // Pumpkin
    "#C0392B", // Dark Red
    "#E74C3C", // Soft Red
    "#9B59B6", // Amethyst
    "#8E44AD", // Deep Amethyst
    "#27AE60", // Nephritis Green
    "#2980B9", // Belize Hole Blue
    "#16A085", // Greenish Cyan
    "#F39C12", // Saffron
    "#F1C40F", // Sunflower
    "#BDC3C7", // Silver
    "#95A5A6", // Concrete Grey
    "#7F8C8D", // Asbestos Grey
    "#FF69B4", // Hot Pink
    "#FF6F61", // Coral Pink
    "#4B0082", // Indigo
    "#556B2F", // Dark Olive Green
    "#A52A2A", // Brown
    "#5F9EA0", // Cadet Blue
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="text-sm font-bold mb-3">Select Theme</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onSeletion(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black 
                        ${
                          resumeInfo?.themeColor === item &&
                          "border border-black"
                        }`}
              style={{ backgroundColor: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
