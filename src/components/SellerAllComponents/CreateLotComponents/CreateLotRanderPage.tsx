"use client";

import React, { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import LotDetails from "./LotDetails";
import UploadImage from "./UploadImage";
import PricingAndAuctionType from "./PricingAndAuctionType";
import Publish from "./Publish";
import Success from "./Success";
import { FileUpload, Step } from "@/types/allTypes";

const steps: Step[] = [
  { number: 1, title: "Lot Details" },
  { number: 2, title: "Upload Lot Images" },
  { number: 3, title: "Pricing & Auction Type" },
  { number: 4, title: "Publish" },
];

const CreateLotRanderPage = () => {
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

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

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
    setCurrentStep(5);
  };

  const handleGoToDashboard = () => {
    window.location.href = "/";
  };

  if (currentStep === 5) {
    return <Success onGoToDashboard={handleGoToDashboard} />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
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

          {currentStep === 4 && (
            <Publish onPublish={handlePublish} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLotRanderPage;