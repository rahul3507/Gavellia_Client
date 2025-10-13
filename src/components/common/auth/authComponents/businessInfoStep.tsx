/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader } from "lucide-react";

interface BusinessInfoStepProps {
  formData: {
    businessName: string;
    businessType: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

export function BusinessInfoStep({
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}: BusinessInfoStepProps) {
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
        <span className="text-sm text-gray-500">3 of 6</span>
      </div>

      <div className="flex flex-col space-y-6 justify-between h-full">
        <div className="mb-12">
          <div>
            <h2 className="text-xs md:text-sm  text-gray-800 mb-4">
              Enter Your Business Info
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="businessName"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Business name
              </Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => onInputChange("businessName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter business name"
              />
            </div>

            <div>
              <Label
                htmlFor="businessType"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Business type
              </Label>
              <Input
                id="businessType"
                type="text"
                value={formData.businessType}
                onChange={(e) => onInputChange("businessType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. LLC, Inc"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={onContinue}
          disabled={
            !formData.businessName || !formData.businessType || isLoading
          }
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
}
