/** @format */

import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { ArrowLeft, Loader } from "lucide-react";

interface PersonalInfoStepProps {
  accountType: "solo" | "business";
  formData: {
    firstName: string;
    lastName: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  accountType,
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-2 font-medium">BACK</span>
        </Button>
        <span className="text-sm text-gray-500">
          2 of {accountType === "solo" ? "5" : "6"}
        </span>
      </div>

      <div className="flex flex-col space-y-6 justify-between h-full">
        <div className="mb-12">
          <div>
            <div>
              <h2 className="text-xs md:text-sm  text-gray-800 mb-4">
                Personal Info
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => onInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Steve"
                />
              </div>

              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => onInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Moss"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onContinue}
          disabled={!formData.firstName || !formData.lastName || isLoading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-none hover:bg-primary/90 disabled:bg-gray-300"
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

export default PersonalInfoStep;
