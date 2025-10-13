/** @format */
import React from "react";
import { Button } from "../../../ui/button";
import { Loader, Mail } from "lucide-react";
import Image from "next/image";

interface WelcomeStepProps {
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onEmailSignUp: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({
  isLoading,
  onGoogleSignIn,
  onEmailSignUp,
}) => {
  return (
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
        <Button
          onClick={onGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
        >
          <Image
            src="/google.png"
            alt="Google Logo"
            width={20}
            height={20}
            className="h-4 w-4"
          />
          <span className="flex items-center gap-2">
            CONTINUE WITH GOOGLE
            {isLoading && <Loader className="animate-spin h-4 w-4" />}
          </span>
          <div></div>
        </Button>
        <Button
          onClick={onEmailSignUp}
          disabled={isLoading}
          className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
        >
          <Mail className="ml-1.5 h-4 w-4" />
          <span className="flex items-center gap-2">
            SIGN UP WITH EMAIL
            {isLoading && <Loader className="animate-spin h-4 w-4" />}
          </span>
          <div></div>
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
