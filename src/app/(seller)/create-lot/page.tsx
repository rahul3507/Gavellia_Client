/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import LotDetails from "@/components/SellerAllComponents/CreateLotComponents/LotDetails";
import UploadImage from "@/components/SellerAllComponents/CreateLotComponents/UploadImage";
import PricingAndAuctionType from "@/components/SellerAllComponents/CreateLotComponents/PricingAndAuctionType";
import Publish from "@/components/SellerAllComponents/CreateLotComponents/Publish";
import Success from "@/components/SellerAllComponents/CreateLotComponents/Success";

interface FileUpload {
  name: string;
  size: number;
  progress: number;
  complete: boolean;
  file?: File;
  previewUrl?: string;
}

const CreateLot = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lotTitle, setLotTitle] = useState("");
  const [features, setFeatures] = useState<string[]>(["", "", ""]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [auctionType, setAuctionType] = useState("");
  const [startingPrice, setStartingPrice] = useState<number | undefined>();
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  const steps = [
    { number: 1, title: "Lot Details", active: currentStep === 1 },
    { number: 2, title: "Upload Lot Images", active: currentStep === 2 },
    { number: 3, title: "Pricing & Auction Type", active: currentStep === 3 },
    { number: 4, title: "Publish", active: currentStep === 4 },
  ];

  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles: FileUpload[] = Array.from(uploadedFiles).map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
        complete: false,
        file: file,
        previewUrl: URL.createObjectURL(file),
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
      newFiles.forEach((_, index) => {
        const fileIndex = files.length + index;
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles((prev) =>
            prev.map((file, i) =>
              i === fileIndex ? { ...file, progress } : file,
            ),
          );

          if (progress >= 100) {
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((file, i) =>
                i === fileIndex ? { ...file, complete: true } : file,
              ),
            );
          }
        }, 100);
      });
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setFiles(files.filter((_, i) => i !== index));
  };

  // Utility functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Validation functions
  const canContinueStep1 = () => {
    return lotTitle.trim() !== "" && description.trim() !== "";
  };

  const canContinueStep2 = () => {
    return files.length >= 3 && files.every((file) => file.complete);
  };

  const canContinueStep3 = () => {
    if (!auctionType || startingPrice === undefined || startingPrice <= 0)
      return false;
    if (auctionType === "LIVE") {
      return startDate !== "" && startTime !== "";
    }
    if (auctionType === "TIMED") {
      return startDate !== "" && endDate !== "";
    }
    return false;
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    console.log("Publishing lot...");
    setCurrentStep(5); // Show success screen
  };

  const handleGoToDashboard = () => {
    window.location.href = "/";
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.number < currentStep
                  ? "bg-green-500 text-white"
                  : step.active
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

  // Success screen
  if (currentStep === 5) {
    return <Success onGoToDashboard={handleGoToDashboard} />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">{renderStepIndicator()}</div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Step 1: Lot Details */}
          {currentStep === 1 && (
            <LotDetails
              lotTitle={lotTitle}
              setLotTitle={setLotTitle}
              features={features}
              setFeatures={setFeatures}
              description={description}
              setDescription={setDescription}
              onNext={handleNext}
              canContinue={canContinueStep1()}
            />
          )}

          {/* Step 2: Upload Images */}
          {currentStep === 2 && (
            <UploadImage
              files={files}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onNext={handleNext}
              onBack={handleBack}
              canContinue={canContinueStep2()}
              formatFileSize={formatFileSize}
            />
          )}

          {/* Step 3: Pricing & Auction Type */}
          {currentStep === 3 && (
            <PricingAndAuctionType
              auctionType={auctionType}
              onAuctionTypeChange={setAuctionType}
              startingPrice={startingPrice}
              onStartingPriceChange={setStartingPrice}
              startDate={startDate}
              onStartDateChange={setStartDate}
              startTime={startTime}
              onStartTimeChange={setStartTime}
              endDate={endDate}
              onEndDateChange={setEndDate}
              onNext={handleNext}
              onBack={handleBack}
              canContinue={canContinueStep3()}
            />
          )}

          {/* Step 4: Publish */}
          {currentStep === 4 && (
            <Publish onPublish={handlePublish} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLot;
