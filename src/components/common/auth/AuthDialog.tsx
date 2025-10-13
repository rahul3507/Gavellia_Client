/** @format */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import React, { useState, useRef } from "react";
import { Mail, Loader } from "lucide-react";
import WelcomeStep from "./authComponents/welcomeStep";
import EmailStep from "./authComponents/emailStep";
import AccountTypeStep from "./authComponents/accountTypeStep";
import PersonalInfoStep from "./authComponents/personalInfoStep";
import YourAddressStep from "./authComponents/yourAddressStep";
import GovtIDStep from "./authComponents/govtIDStep";
import IdDocumentsStep from "./authComponents/idDocumentsStep";
import { BusinessInfoStep } from "./authComponents/businessInfoStep";
import { BusinessAddressStep } from "./authComponents/businessAddressStep";
import { TaxInfoStep } from "./authComponents/taxInfoStep";
import { DocumentsStep } from "./authComponents/documentsStep";
import VerificationStep from "./authComponents/verificationStep";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SignupStep =
  | "welcome"
  | "email"
  | "accountType"
  | "personalInfo"
  | "yourAddress"
  | "govtID"
  | "idDocuments"
  | "businessInfo"
  | "businessAddress"
  | "taxInfo"
  | "documents"
  | "verification"
  | "confirmation";

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("welcome");
  const [accountType, setAccountType] = useState<"solo" | "business">("solo");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    taxId: "",
    idType: "",
    registrationCountry: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    const soloStepOrder: SignupStep[] = [
      "welcome",
      "email",
      "accountType",
      "personalInfo",
      "yourAddress",
      "govtID",
      "idDocuments",
      "verification",
      "confirmation",
    ];

    const businessStepOrder: SignupStep[] = [
      "welcome",
      "email",
      "accountType",
      "personalInfo",
      "businessInfo",
      "businessAddress",
      "taxInfo",
      "documents",
      "verification",
      "confirmation",
    ];

    const stepOrder =
      accountType === "solo" ? soloStepOrder : businessStepOrder;
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const soloStepOrder: SignupStep[] = [
      "welcome",
      "email",
      "accountType",
      "personalInfo",
      "yourAddress",
      "govtID",
      "idDocuments",
      "verification",
      "confirmation",
    ];

    const businessStepOrder: SignupStep[] = [
      "welcome",
      "email",
      "accountType",
      "personalInfo",
      "businessInfo",
      "businessAddress",
      "taxInfo",
      "documents",
      "verification",
      "confirmation",
    ];

    const stepOrder =
      accountType === "solo" ? soloStepOrder : businessStepOrder;
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Add your Google sign-in logic here
    setIsLoading(false);
  };

  const handleEmailSignUp = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCurrentStep("email");
    setIsLoading(false);
  };

  const handleAccountTypeSelect = async (type: "solo" | "business") => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    setAccountType(type);
    setIsLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      // 25MB limit
      setUploadStatus("error");
      return;
    }

    setUploadedFile(file);
    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "welcome":
        return (
          <WelcomeStep
            isLoading={isLoading}
            onGoogleSignIn={handleGoogleSignIn}
            onEmailSignUp={handleEmailSignUp}
          />
        );

      case "email":
        return (
          <EmailStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "accountType":
        return (
          <AccountTypeStep
            accountType={accountType}
            isLoading={isLoading}
            onBack={handleBack}
            onAccountTypeSelect={handleAccountTypeSelect}
            onContinue={handleContinue}
          />
        );

      case "personalInfo":
        return (
          <PersonalInfoStep
            accountType={accountType}
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "yourAddress":
        return (
          <YourAddressStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "govtID":
        return (
          <GovtIDStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "idDocuments":
        return (
          <IdDocumentsStep
            uploadedFile={uploadedFile}
            uploadProgress={uploadProgress}
            uploadStatus={uploadStatus}
            isDragOver={isDragOver}
            isLoading={isLoading}
            fileInputRef={fileInputRef}
            onBack={handleBack}
            onContinue={handleContinue}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClickUpload={handleClickUpload}
            onRemoveFile={handleRemoveFile}
            onFileInputChange={handleFileInputChange}
          />
        );
      case "businessInfo":
        return (
          <BusinessInfoStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "businessAddress":
        return (
          <BusinessAddressStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "taxInfo":
        return (
          <TaxInfoStep
            formData={formData}
            isLoading={isLoading}
            onBack={handleBack}
            onContinue={handleContinue}
            onInputChange={handleInputChange}
          />
        );

      case "documents":
        return (
          <DocumentsStep
            uploadStatus={uploadStatus}
            uploadProgress={uploadProgress}
            uploadedFile={uploadedFile}
            isDragOver={isDragOver}
            isLoading={isLoading}
            fileInputRef={fileInputRef}
            onBack={handleBack}
            onContinue={handleContinue}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClickUpload={handleClickUpload}
            onRemoveFile={handleRemoveFile}
            onFileInputChange={handleFileInputChange}
          />
        );

      case "verification":
        return (
          <VerificationStep
            formData={formData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 flex flex-col md:flex-row rounded-lg overflow-hidden border-none shadow-lg",
          " !max-w-[900px]  "
        )}
      >
        {/* Left Banner */}
        <div className="hidden md:block w-3/5 bg-black relative min-h-full">
          <Image
            src="/Auction.png"
            alt="Auction Banner"
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col px-8 py-10">
            <h2 className="text-white text-[28px] font-serif font-medium mb-8 leading-tight">
              Bid on Rare Finds with Confidence
            </h2>
            <ul className="text-white space-y-4 text-base">
              <li className="flex items-center space-x-2">
                <span className="text-white text-xs">✓</span>
                <span>12,000+ authenticated lots</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white text-xs">✓</span>
                <span>Real-time bidding in 40+ countries</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white text-xs">✓</span>
                <span>24/7 premium support</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Content */}
        <div className="w-full md:w-2/5 bg-white p-6 flex flex-col  min-h-[500px] ">
          {renderStepContent()}

          {/* Terms and Privacy - Only show on welcome and email steps */}

          <div className="text-xs text-primary/60 mt-auto">
            By joining, you agree to the Gavellia{" "}
            <a href="#" className="underline text-blue-500">
              Terms of Service
            </a>{" "}
            and to occasionally receive emails from us. Please read our{" "}
            <a href="#" className="underline text-blue-500">
              Privacy Policy
            </a>{" "}
            to learn how we use your personal data.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
