/** @format */

import React from "react";
import { Button } from "../../../ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { cn } from "../../../../lib/utils";

interface AccountTypeStepProps {
  accountType: "solo" | "business";
  isLoading: boolean;
  onBack: () => void;
  onAccountTypeSelect: (type: "solo" | "business") => void;
  onContinue: () => void;
}

const AccountTypeStep: React.FC<AccountTypeStepProps> = ({
  accountType,
  isLoading,
  onBack,
  onAccountTypeSelect,
  onContinue,
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
          1 of {accountType === "solo" ? "5" : "6"}
        </span>
      </div>
      <div className="flex flex-col space-y-6 justify-between h-full">
        <div className="mb-4">
          <div>
            <h2 className="text-xs md:text-sm  text-gray-800 mb-4">
              Select Account Type
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-20 ">
            <Button
              variant={accountType === "solo" ? "default" : "outline"}
              onClick={() => onAccountTypeSelect("solo")}
              className={cn(
                "h-24 flex flex-col items-center justify-center rounded-none border-2 disabled:opacity-50",
                accountType === "solo"
                  ? "border-blue-500 bg-blue-100 text-blue-500"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              )}
            >
              <span className="font-semibold flex items-center gap-2">
                SOLO
              </span>
            </Button>
            <Button
              variant={accountType === "business" ? "default" : "outline"}
              onClick={() => onAccountTypeSelect("business")}
              className={cn(
                "h-24 flex flex-col items-center justify-center rounded-none border-2 disabled:opacity-50",
                accountType === "business"
                  ? "border-blue-500 bg-blue-100 text-blue-500"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              )}
            >
              <span className="font-semibold flex items-center gap-2">
                BUSINESS
              </span>
            </Button>
          </div>
        </div>

        <Button
          onClick={onContinue}
          disabled={!accountType || isLoading}
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

export default AccountTypeStep;
