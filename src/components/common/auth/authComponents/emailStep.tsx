/** @format */
import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { ChevronLeft, Eye, EyeOff, Loader } from "lucide-react";

interface EmailStepProps {
  formData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className=" space-y-4">
      <div className="flex  mb-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 mr-4 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="font-medium">BACK</span>
        </Button>
      </div>

      <div className="flex flex-col space-y-6 justify-between h-full">
        <div className="">
          <h1 className="text-xl md:text-3xl font-serif font-medium text-primary mb-2">
            Gavellia
          </h1>
          <h2 className="text-base md:text-lg font-semibold text-primary tracking-wide mb-3">
            BEGINS YOUR AUCTION JOURNEY
          </h2>
          <div className="space-y-2">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => onInputChange("password", e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full text-xs md:text-sm bg-black text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            CONTINUE
            {isLoading && <Loader className="animate-spin h-4 w-4" />}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default EmailStep;
