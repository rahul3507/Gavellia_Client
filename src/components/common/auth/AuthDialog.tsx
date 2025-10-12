/** @format */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import React, { useState, useRef } from "react";
import {
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  ChevronLeft,
  Loader,
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  X,
} from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SignupStep =
  | "welcome"
  | "email"
  | "accountType"
  | "personalInfo"
  | "businessInfo"
  | "businessAddress"
  | "taxInfo"
  | "documents"
  | "verification"
  | "confirmation";

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("welcome");
  const [showPassword, setShowPassword] = useState(false);
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
    const stepOrder: SignupStep[] = [
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
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const stepOrder: SignupStep[] = [
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
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      // Skip business info step if account type is solo
      if (currentStep === "accountType" && accountType === "solo") {
        setCurrentStep("personalInfo");
      } else if (currentStep === "personalInfo" && accountType === "solo") {
        setCurrentStep("businessAddress");
      } else {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
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
          <div className="mb-8">
            <h1 className="text-xl md:text-3xl font-serif font-medium text-primary mb-2">
              Gavellia
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-primary mb-1 tracking-wide">
              BEGINS YOUR AUCTION JOURNEY
            </h2>
            <div className="text-sm font-medium text-primary/80 mb-4">
              ALREADY HAVE AN ACCOUNT?{" "}
              <a href="#" className="underline font-semibold">
                SIGN IN
              </a>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
              >
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="h-4 w-4"
                />
                <span className="flex items-center gap-2">
                  CONTINUE WITH GOOGLE
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
                <div></div>
              </Button>
              <Button
                onClick={handleEmailSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
              >
                <Mail className="ml-1.5 h-4 w-4" />
                <span className="flex items-center gap-2">
                  SIGN UP WITH EMAIL
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
                <div></div>
              </Button>
            </div>
          </div>
        );

      case "email":
        return (
          <div className=" space-y-4">
            <div className="flex  mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
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
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
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
                onClick={handleContinue}
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

      case "accountType":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
              <span className="text-sm text-gray-500">1 of 6</span>
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
                    onClick={() => handleAccountTypeSelect("solo")}
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
                    onClick={() => handleAccountTypeSelect("business")}
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
                onClick={handleContinue}
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

      case "personalInfo":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
              <span className="text-sm text-gray-500">2 of 6</span>
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
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Moss"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={
                  !formData.firstName || !formData.lastName || isLoading
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

      case "businessInfo":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
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
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("businessType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. LLC, Inc"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
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
      case "businessAddress":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
              <span className="text-sm text-gray-500">4 of 6</span>
            </div>

            <div className="flex flex-col space-y-0  h-full">
              <div className="mb-3">
                <div>
                  <h2 className="text-xs md:text-sm text-gray-800 mb-2">
                    Business Address
                  </h2>
                </div>

                <div className="space-y-2">
                  <div>
                    <Label
                      htmlFor="street"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Street
                    </Label>
                    <Input
                      id="street"
                      type="text"
                      value={formData.businessAddress}
                      onChange={(e) =>
                        handleInputChange("businessAddress", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123 Main Street, Suite 400"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      State
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) =>
                        handleInputChange("state", value)
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="New York (USA)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York (USA)</SelectItem>
                        <SelectItem value="ca">California (USA)</SelectItem>
                        <SelectItem value="tx">Texas (USA)</SelectItem>
                        <SelectItem value="fl">Florida (USA)</SelectItem>
                        <SelectItem value="il">Illinois (USA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Country
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="United States" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🇺🇸</span>
                            <span>United States</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ca">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🇨🇦</span>
                            <span>Canada</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="uk">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🇬🇧</span>
                            <span>United Kingdom</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={
                  !formData.businessAddress ||
                  !formData.city ||
                  !formData.state ||
                  !formData.country ||
                  isLoading
                }
                className="w-full bg-black text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  CONTINUE
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
              </Button>
            </div>
          </div>
        );

      case "taxInfo":
        return (
          <div className="space-y-6 ">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
              <span className="text-sm text-gray-500">5 of 6</span>
            </div>

            <div className="flex flex-col space-y-0  h-full ">
              <div className="mb-9">
                <div>
                  <h2 className="text-xs md:text-sm text-gray-800 pb-4">
                    Business Tax ID/VAT Number Required For Verification
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Select ID type
                    </Label>
                    <RadioGroup
                      value={formData.idType}
                      onValueChange={(value) =>
                        handleInputChange("idType", value)
                      }
                      className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ein" id="ein" />
                        <Label htmlFor="ein" className="text-sm font-medium">
                          EIN
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ssn" id="ssn" />
                        <Label htmlFor="ssn" className="text-sm font-medium">
                          SSN
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vat" id="vat" />
                        <Label htmlFor="vat" className="text-sm font-medium ">
                          VAT
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="text-sm font-medium">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label
                      htmlFor="idNumber"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      ID number
                    </Label>
                    <Input
                      id="idNumber"
                      type="text"
                      value={formData.taxId}
                      onChange={(e) =>
                        handleInputChange("taxId", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="GB123456789"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="registrationCountry"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Country of registration
                    </Label>
                    <Select
                      value={formData.registrationCountry}
                      onValueChange={(value) =>
                        handleInputChange("registrationCountry", value)
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="United States" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">
                          <div className="flex items-center gap-2">
                            <span>United States</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="gb">
                          <div className="flex items-center gap-2">
                            <span>United Kingdom</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ca">
                          <div className="flex items-center gap-2">
                            <span>Canada</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="de">
                          <div className="flex items-center gap-2">
                            <span>Germany</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fr">
                          <div className="flex items-center gap-2">
                            <span>France</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={
                  !formData.idType ||
                  !formData.taxId ||
                  !formData.registrationCountry ||
                  isLoading
                }
                className="w-full  bg-black text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  CONTINUE
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
              </Button>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
              <span className="text-sm text-gray-500">6 of 6</span>
            </div>

            <div className="flex flex-col space-y-0  h-full">
              <div className="mb-6">
                <div>
                  <h2 className="text-xs md:text-sm text-gray-800 mb-1">
                    We Need To Verify Your Business
                  </h2>
                  <p className="text-xs text-gray-600 mb-4">
                    Documents That It&apos;s{" "}
                    {uploadStatus === "success" ? "Really " : ""}You
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Upload Area */}
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
                      isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 bg-gray-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-8 w-8 text-blue-500 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      <button
                        onClick={handleClickUpload}
                        className="cursor-pointer text-blue-500 font-medium hover:underline"
                      >
                        Click to Upload
                      </button>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      (Max. File size: 25 MB)
                    </p>
                  </div>

                  {/* File Upload Status */}
                  {uploadStatus !== "idle" && (
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {uploadStatus === "error"
                                ? "Tax ID"
                                : uploadedFile?.name || "Tax ID"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {uploadStatus === "error"
                                ? "HannahBusing_Resume.pdf"
                                : uploadStatus === "success"
                                ? "Business docs.pdf"
                                : `${Math.round(
                                    (uploadedFile?.size || 0) / 1024
                                  )} KB`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadStatus === "success" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {uploadStatus === "error" && (
                            <button className="text-xs text-red-500 font-medium">
                              TRY AGAIN
                            </button>
                          )}
                          {uploadStatus === "success" && (
                            <button className="text-xs text-gray-500 font-medium">
                              CLICK TO VIEW
                            </button>
                          )}
                          <button
                            onClick={handleRemoveFile}
                            className="cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {uploadStatus === "uploading" && (
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-right">
                            {uploadProgress}%
                          </p>
                        </div>
                      )}

                      {uploadStatus === "success" && (
                        <div className="space-y-1">
                          <div className="w-full bg-green-200 rounded-full h-1">
                            <div className="bg-green-500 h-1 rounded-full w-full" />
                          </div>
                          <p className="text-xs text-green-600 text-right">
                            100%
                          </p>
                        </div>
                      )}

                      {uploadStatus === "error" && (
                        <div className="space-y-1">
                          <div className="w-full bg-red-200 rounded-full h-1">
                            <div className="bg-red-500 h-1 rounded-full w-2/5" />
                          </div>
                          <p className="text-xs text-red-600 text-right">40%</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={uploadStatus !== "success" || isLoading}
                className="w-full bg-black  text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50 disabled:bg-gray-400"
              >
                <span className="flex items-center gap-2">
                  {uploadStatus === "success" && isLoading
                    ? "SUBMITTING"
                    : "SUBMIT"}
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
              </Button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        );

      case "verification":
        return (
          <div className="space-y-2">
            <div className="flex flex-col space-y-0 h-full">
              <div className="pt-6">
                <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4">
                  Verify Your Email
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  We&apos;ve sent an email to{" "}
                  <span className="font-medium">
                    {formData.email || "exam***@gmail.com"}
                  </span>
                  . Click on inside to get started.
                </p>
              </div>

              <div className=" flex flex-col mt-auto text-left w-fit">
                <Button
                  onClick={() => {
                    // Open default email client
                    window.location.href = "mailto:";
                  }}
                  variant="ghost"
                  className=" text-gray-600 font-semibold  p-0 rounded-none hover:bg-transparent underline disabled:opacity-50"
                >
                  GO TO MAILBOX
                </Button>

                <Button
                  onClick={async () => {
                    setIsLoading(true);
                    // Simulate resend email
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setIsLoading(false);
                  }}
                  disabled={isLoading}
                  variant="ghost"
                  className=" text-gray-600 font-semibold  p-0 rounded-none hover:bg-transparent underline disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    RESEND EMAIL
                    {isLoading && <Loader className="animate-spin h-4 w-4" />}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="mb-8">
            <h1 className="text-xl md:text-3xl font-serif font-medium text-primary mb-2">
              Gavellia
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-primary mb-1 tracking-wide">
              BEGINS YOUR AUCTION JOURNEY
            </h2>
            <div className="text-sm font-medium text-primary/80 mb-4">
              ALREADY HAVE AN ACCOUNT?{" "}
              <a href="#" className="underline font-semibold">
                SIGN IN
              </a>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
              >
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="h-4 w-4"
                />
                <span className="flex items-center gap-2">
                  CONTINUE WITH GOOGLE
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
                <div></div>
              </Button>
              <Button
                onClick={handleEmailSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200 disabled:opacity-50"
              >
                <Mail className="ml-1.5 h-4 w-4" />
                <span className="flex items-center gap-2">
                  SIGN UP WITH EMAIL
                  {isLoading && <Loader className="animate-spin h-4 w-4" />}
                </span>
                <div></div>
              </Button>
            </div>
          </div>
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
        <div className="w-full md:w-2/5 bg-white p-6 flex flex-col  min-h-[500px] relative">
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
