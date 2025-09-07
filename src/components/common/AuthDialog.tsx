/** @format */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import React from "react";
import { Mail } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className={cn(
        "p-0 flex flex-col md:flex-row rounded-lg overflow-hidden border-none shadow-lg",
        " !max-w-[900px]  "
      )}
    >
      {/* Left Banner */}
      <div className="hidden md:block w-3/5 bg-black relative min-h-full">
        <Image
          src="/Auction.png"
          alt="Auction Banner"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col px-8 py-10">
          <h2 className="text-white text-[28px] font-serif font-medium mb-8 leading-tight">
            Bid on Rare Finds with Confidence
          </h2>
          <ul className="text-white space-y-4 text-base">
            <li className="flex items-center space-x-2">
              <span className="text-white text-xs">✓</span>
              <span>12,000+ authenticated lots</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-white text-xs">✓</span>
              <span>Real-time bidding in 40+ countries</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-white text-xs">✓</span>
              <span>24/7 premium support</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Right Content */}
      <div className="w-full md:w-2/5 bg-white p-4 flex flex-col justify-center min-h-[500px] relative">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-serif font-medium text-primary mb-2">
            Gavellia
          </h1>
          <h2 className="text-base md:text-lg font-semibold text-primary mb-1 tracking-wide">
            BEGINS YOUR AUCTION JOURNEY
          </h2>
          <div className="text-sm font-medium text-primary/80 mb-4">
            ALREADY HAVE AN ACCOUNT?{" "}
            <a href="#" className="underline font-semibold">
              SIGN IN
            </a>
          </div>
          <div className="space-y-3">
            <Button className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none">
              <Image
                src="/google.png"
                alt="Google Logo"
                width={20}
                height={20}
                className=" h-4 w-4"
              />
              CONTINUE WITH GOOGLE
              <div></div>
            </Button>
            <Button className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none">
              <Mail className="ml-1.5 h-4 w-4" />
              SIGN UP WITH EMAIL
              <div></div>
            </Button>
          </div>
        </div>
        <div className="text-xs text-primary/60 mt-auto">
          By joining, you agree to the Gavellia{" "}
          <a href="#" className="underline text-blue-500">
            Terms of Service
          </a>{" "}
          and to occasionally receive emails from us. Please read our{" "}
          <a href="#" className="underline text-blue-500">
            Privacy Policy
          </a>{" "}
          to learn how we use your personal data.
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default AuthDialog;
