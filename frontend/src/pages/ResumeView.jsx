import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ResumePreview from "../components/ResumeEditComponents/ResumePreview";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Download, Share } from "lucide-react";
import QRCode from "react-qr-code";

const ResumeView = () => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast("✅ Link copied to clipboard!");
    } catch (err) {
      toast.error("❌ Failed to copy");
    }
  };

  return (
    <>
      <div id="no-print">
        <div className="flex justify-center items-center">
          <div className="my-10 mx-6 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              🎉 Congrats! Your AI-Generated Resume is Ready!
            </h2>
            <p className="text-center text-gray-400">
              Download, share, or copy your unique resume link.
            </p>

            
            <div className="flex flex-col md:flex-row justify-between md:justify-between items-center mt-8 gap-4 px-6">
              <Button className="hover:bg-purple-600" onClick={handleDownload}><Download /> Download</Button>

              
              <Dialog>
                <DialogTrigger className="flex justify-between items-center font-medium text-sm gap-2 px-4 py-2 bg-newPurple text-white rounded-md hover:bg-purple-600 transition cursor-pointer">
                  <Share height={15} width={20} /> Share
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Your Resume</DialogTitle>
                    <DialogDescription>
                      Share via social, copy link, or scan QR.
                    </DialogDescription>
                  </DialogHeader>

                  
                  <div className="flex justify-center gap-4 flex-wrap my-3">
                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={shareUrl}>
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                    <LinkedinShareButton url={shareUrl}>
                      <LinkedinIcon size={40} round />
                    </LinkedinShareButton>
                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>
                    <TelegramShareButton url={shareUrl}>
                      <TelegramIcon size={40} round />
                    </TelegramShareButton>
                  </div>

                  
                  <div className="flex items-center gap-2 my-2">
                    <Input value={shareUrl} readOnly className="text-xs" />
                    <Button size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  
                  <div className="flex justify-center py-4">
                    <QRCode value={shareUrl} size={128} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex justify-center items-center w-full">
        <div
          id="print-area"
          className="w-full md:max-w-[55%]"
        >
          <ResumePreview />
        </div>
      </div>
    </>
  );
};

export default ResumeView;
