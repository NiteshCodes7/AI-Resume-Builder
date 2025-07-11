import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Delete,
  Download,
  Loader2,
  MoreVertical,
  Notebook,
  Pen,
  Undo,
  View,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ResumeCardItem = ({ resume, onDelete, onRename }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogRename, setOpenDialogRename] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState(resume.resumeTitle);
  const [loadingRename, setLoadingRename] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();


  const onSave = async (e) => {
    e.preventDefault();
    setLoadingRename(true);

    try {
      const token = await getToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/resume/${resume._id}/edit`,
        { resumeTitle: resumeTitle.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeTitle(res.data.resumeTitle);
      onRename(resume._id, res.data.resumeTitle);
      setOpenDialogRename(false);

    } catch (error) {
      console.error("❌ Error saving personal details:", error);
    } finally {
      setLoadingRename(false);
      toast("✅ Resume Renamed");
    }
  };

  const deleteResume = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/resume/${resume._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(resume._id);
      toast("✅ Resume Deleted Successfully");

    } catch (error) {
      console.log("Resume Deletion Failed", error);
      toast("❌ Failed to delete Resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to={`/dashboard/resume/${resume._id}/edit`}>
        <div className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border border-t-4 flex justify-center items-center h-[280px] rounded-lg hover:scale-105 transition-all hover:shadow-md hover:shadow-newPurple cursor-pointer text-black"
            style={{ borderTopColor: resume.themeColor || '#FF4433' }}
        >
          {/* <Notebook /> */}
          <img src="/cv.png" alt="CV" width={80} height={80} />
        </div>
      </Link>
      <div className="p-3 font-medium flex justify-between items-center">
        <h2 className="text-start text-sm text-black">{resumeTitle}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="text-black h-4 w-4 cursor-pointer outline-none" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/resume/${resume._id}/edit`)}
              className="cursor-pointer"
            >
              <Pen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(`/dashboard/resume/${resume._id}/view`, "_blank")
              }
              className="cursor-pointer"
            >
              <View /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(`/dashboard/resume/${resume._id}/view`, "_blank")
              }
              className="cursor-pointer"
            >
              <Download /> Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDialog(true)}
              className="cursor-pointer"
            >
              <Delete /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenDialogRename(true)}
              className="cursor-pointer"
            >
              <Undo /> Rename
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={deleteResume}>
                {loading ? (
                  <Loader2 className="animate-spin" disabled={loading} />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={openDialogRename} onOpenChange={setOpenDialogRename}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename your Resume</DialogTitle>
              <DialogDescription>
                Rename Resume with a suitable title
              </DialogDescription>
              <Input
                value={resumeTitle}
                className="my-2"
                placeholder="Ex.Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && resumeTitle.trim() && !loadingRename) {
                    onSave(e);
                  }
                }}
              />
              <div className="flex justify-end gap-5">
                <Button
                  onClick={() => setOpenDialogRename(!openDialogRename)}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  disabled={!resumeTitle || loadingRename}
                >
                  {" "}
                  {loading ? <Loader2 className="animate-spin " /> : "Rename"}
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResumeCardItem;
