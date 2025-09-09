/** @format */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import React, { useState } from "react";
import { Mail, ArrowLeft, Eye, EyeOff, ChevronLeft } from "lucide-react";

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
  | "address"
  | "taxId"
  | "documents"
  | "verification"
  | "confirmation";

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("welcome");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"solo" | "business">("solo");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    taxId: "",
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

      "address",
      "taxId",
      "documents",
      "verification",
      "confirmation",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleContinue = () => {
    const stepOrder: SignupStep[] = [
      "welcome",
      "email",
      "accountType",
      "personalInfo",
      "businessInfo",
      "address",
      "taxId",
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
        setCurrentStep("address");
      } else {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
    }
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
              <Button className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200">
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="h-4 w-4"
                />
                CONTINUE WITH GOOGLE
                <div></div>
              </Button>
              <Button
                onClick={() => setCurrentStep("email")}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200"
              >
                <Mail className="ml-1.5 h-4 w-4" />
                SIGN UP WITH EMAIL
                <div></div>
              </Button>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div className="flex  mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="p-0 mr-4 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="h-4 w-5" />
                <span className="ml-2 font-medium">BACK</span>
              </Button>
            </div>

            <div>
              <h1 className="text-xl md:text-3xl font-serif font-medium text-primary mb-2">
                Gavellia
              </h1>
              <h2 className="text-base md:text-lg font-semibold text-primary mb-1 tracking-wide">
                BEGINS YOUR AUCTION JOURNEY
              </h2>
            </div>

            <div className="space-y-4">
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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

            <Button
              onClick={handleContinue}
              className="w-full bg-black text-white font-semibold py-3 rounded-none hover:bg-gray-800 items-end"
            >
              CONTINUE
            </Button>
          </div>
        );

      case "accountType":
        return (
          <div className="space-y-6">
            <div className="flex justify-between mb-6">
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

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-8">
                Select Account Type
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button
                variant={accountType === "solo" ? "default" : "outline"}
                onClick={() => setAccountType("solo")}
                className={cn(
                  "h-24 flex flex-col items-center justify-center rounded-lg border-2",
                  accountType === "solo"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                )}
              >
                <span className="font-semibold">SOLO</span>
              </Button>
              <Button
                variant={accountType === "business" ? "default" : "outline"}
                onClick={() => setAccountType("business")}
                className={cn(
                  "h-24 flex flex-col items-center justify-center rounded-lg border-2",
                  accountType === "business"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                )}
              >
                <span className="font-semibold">BUSINESS</span>
              </Button>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!accountType}
              className="w-full bg-gray-400 text-white font-semibold py-3 rounded-none hover:bg-gray-500 disabled:bg-gray-300"
            >
              CONTINUE
            </Button>
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

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-8">
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

            <Button
              onClick={handleContinue}
              disabled={!formData.firstName || !formData.lastName}
              className="w-full bg-gray-400 text-white font-semibold py-3 rounded-none hover:bg-gray-500 disabled:bg-gray-300"
            >
              CONTINUE
            </Button>
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

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-8">
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

            <Button
              onClick={handleContinue}
              disabled={!formData.businessName || !formData.businessType}
              className="w-full bg-gray-400 text-white font-semibold py-3 rounded-none hover:bg-gray-500 disabled:bg-gray-300"
            >
              CONTINUE
            </Button>
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
              <Button className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200">
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="h-4 w-4"
                />
                CONTINUE WITH GOOGLE
                <div></div>
              </Button>
              <Button
                onClick={() => setCurrentStep("email")}
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-200 text-primary font-semibold text-base py-5 rounded-none hover:bg-gray-200"
              >
                <Mail className="ml-1.5 h-4 w-4" />
                SIGN UP WITH EMAIL
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
        <div className="w-full md:w-2/5 bg-white p-6 flex flex-col justify-center min-h-[500px] relative">
          {renderStepContent()}

          {/* Terms and Privacy - Only show on welcome and email steps */}
          {(currentStep === "welcome" || currentStep === "email") && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
