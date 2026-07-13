"use client";

import React from "react";
import { Check } from "lucide-react";
import { Step } from "@/types/allTypes";

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.number < currentStep
                  ? "bg-green-500 text-white"
                  : step.number === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-xs text-gray-600 mt-1 text-center max-w-20">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-full mx-4 ${
                step.number < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
