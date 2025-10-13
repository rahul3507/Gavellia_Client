/** @format */

import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { ArrowLeft, Loader } from "lucide-react";

interface GovtIDStepProps {
  formData: {
    idType: string;
    taxId: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

const GovtIDStep: React.FC<GovtIDStepProps> = ({
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center  justify-between mb-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-2 font-medium">BACK</span>
        </Button>
        <span className="text-sm text-gray-500">4 of 5</span>
      </div>

      <div className="flex flex-col space-y-6 h-full justify-between">
        <div className="mb-16">
          <div>
            <h2 className="text-xs md:text-sm text-gray-800 mb-4">
              To Activate Your Account Verify Your Govt. ID Card or Passport
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Select ID type
              </Label>
              <RadioGroup
                value={formData.idType}
                onValueChange={(value) => onInputChange("idType", value)}
                className="flex flex-row gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="govt-id" id="govt-id" />
                  <Label htmlFor="govt-id" className="text-sm font-medium ">
                    Govt. ID
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport" className="text-sm font-medium">
                    Passport
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label
                htmlFor="govtIdNumber"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                ID number
              </Label>
              <Input
                id="govtIdNumber"
                type="text"
                value={formData.taxId}
                onChange={(e) => onInputChange("taxId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="GB123456789"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={onContinue}
          disabled={!formData.idType || !formData.taxId || isLoading}
          className="w-full mt-3 bg-black text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50"
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

export default GovtIDStep;
