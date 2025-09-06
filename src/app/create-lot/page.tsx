/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Calendar, Check } from "lucide-react";

interface FileUpload {
  name: string;
  size: number;
  progress: number;
  complete: boolean;
}

const CreateLot = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lotTitle, setLotTitle] = useState("");
  const [features, setFeatures] = useState<string[]>(["", "", ""]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [auctionType, setAuctionType] = useState<"LIVE" | "TIMED" | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const steps = [
    { number: 1, title: "Lot Details", active: currentStep === 1 },
    { number: 2, title: "Upload Lot Images", active: currentStep === 2 },
    { number: 3, title: "Pricing & Auction Type", active: currentStep === 3 },
    { number: 4, title: "Publish", active: currentStep === 4 },
  ];

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addNewFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles: FileUpload[] = Array.from(uploadedFiles).map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
        complete: false,
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
              i === fileIndex ? { ...file, progress } : file
            )
          );

          if (progress >= 100) {
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((file, i) =>
                i === fileIndex ? { ...file, complete: true } : file
              )
            );
          }
        }, 100);
      });
    }
  };

  const removeFile = (index: number) => {
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
    if (auctionType === "LIVE") {
      return minPrice.trim() !== "";
    }
    if (auctionType === "TIMED") {
      return minPrice.trim() !== "" && startDate !== "" && endDate !== "";
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

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting lot...");
    setCurrentStep(5); // Show success screen
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
              className={`h-0.5 w-16 mx-4 ${
                step.number < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
                <div className="w-8 h-8 bg-green-300 rounded ml-2"></div>
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 mb-4 mr-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-6 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You're done!
          </h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">
              Your lot is in under review
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Thank you for submitting your lot. You'll get an email once we're
              done reviewing.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Review time: 48 hours</strong>
            </p>
          </div>

          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2"
          >
            RETURN HOME
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gavellia</h1>
          {renderStepIndicator()}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Step 1: Lot Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Lot Details
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your lot's title, core features and essential description.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lot title*
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your lot title"
                      value={lotTitle}
                      onChange={(e) => setLotTitle(e.target.value)}
                      className="pr-12"
                      maxLength={80}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      {lotTitle.length}/80
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Special feature (Optional)
                    </label>
                    <button
                      onClick={addNewFeature}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
                    >
                      + New
                    </button>
                  </div>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <Input
                        key={index}
                        placeholder={`Feature ${index + 1}`}
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description*
                  </label>
                  <div className="relative">
                    <Textarea
                      placeholder="Write your lot description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-32 pr-12"
                      maxLength={80}
                    />
                    <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                      {description.length}/80
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleNext}
                  disabled={!canContinueStep1()}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Upload Images */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Lot Photo
              </h2>
              <p className="text-gray-600 mb-8">
                Upload minimum 3 photos and maximum 6. Attractive photos sells
                quickly.
              </p>

              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                  <div className="mb-4">
                    <Upload className="w-8 h-8 text-blue-500 mx-auto" />
                  </div>
                  <div className="mb-4">
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Click to Upload
                      </span>
                      <span className="text-gray-600"> or drag and drop</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    (Max. File size: 25 MB)
                  </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            📄
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              lot photo {index + 1}
                            </p>
                            <p className="text-xs text-gray-600">{file.name}</p>
                            {!file.complete && (
                              <p className="text-xs text-blue-600">
                                CLICK TO VIEW
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {file.complete ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-20 bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {files.some((file) => file.complete) && (
                      <div className="text-right">
                        <span className="text-sm text-gray-600">
                          {formatFileSize(
                            files.reduce((acc, file) => acc + file.size, 0)
                          )}
                        </span>
                        <span className="ml-4 text-sm font-medium text-green-600">
                          100%
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-6 py-2"
                >
                  BACK
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canContinueStep2()}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Auction Type */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Pricing & Auction Type
              </h2>
              <p className="text-gray-600 mb-8">
                Standard pricing attract bidders and get sells more.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum price
                  </label>
                  <Input
                    placeholder="£ Set starting price for auction"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select the auction type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setAuctionType("LIVE")}
                      className={`flex-1 p-4 border rounded-lg text-center ${
                        auctionType === "LIVE"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                          auctionType === "LIVE" ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium">LIVE Auction</span>
                    </button>
                    <button
                      onClick={() => setAuctionType("TIMED")}
                      className={`flex-1 p-4 border rounded-lg text-center ${
                        auctionType === "TIMED"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                          auctionType === "TIMED"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium">Timed Auction</span>
                    </button>
                  </div>
                </div>

                {auctionType === "TIMED" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start date
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="DD/MM/YY"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on the selected date your lot will get live to the
                        bidders
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End date
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="DD/MM/YY"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Select the date when you want to end the timeline of
                        your auction
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-6 py-2"
                >
                  BACK
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canContinueStep3()}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Publish */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Publish
              </h2>
              <p className="text-gray-600 mb-8">
                Submit your lot for review. It will get LIVE once the admin
                approve. If not we will let know inform by sending email.
              </p>

              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-16 h-12 bg-white border border-gray-200 rounded"></div>
                      <div className="w-12 h-8 bg-blue-100 border border-gray-200 rounded absolute -top-2 -right-2"></div>
                      <div className="w-8 h-6 bg-gray-100 border border-gray-200 rounded absolute top-2 right-4"></div>
                      {/* Person icon */}
                      <div className="absolute -bottom-2 -right-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mb-8">
                By submitting you are agree with or{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 underline">
                  Privacy Policy
                </a>
                .
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-6 py-2"
                >
                  BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2"
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLot;
