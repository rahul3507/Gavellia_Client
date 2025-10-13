/** @format */

import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { ArrowLeft, Loader } from "lucide-react";

interface YourAddressStepProps {
  formData: {
    businessAddress: string;
    city: string;
    state: string;
    country: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

const YourAddressStep: React.FC<YourAddressStepProps> = ({
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-2 font-medium">BACK</span>
        </Button>
        <span className="text-sm text-gray-500">3 of 5</span>
      </div>

      <div className="flex flex-col space-y-0  h-full">
        <div className="mb-3">
          <div>
            <h2 className="text-xs md:text-sm text-gray-800 mb-2">
              Your Address
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
                  onInputChange("businessAddress", e.target.value)
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
                onChange={(e) => onInputChange("city", e.target.value)}
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
                onValueChange={(value) => onInputChange("state", value)}
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
                onValueChange={(value) => onInputChange("country", value)}
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
          onClick={onContinue}
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
};

export default YourAddressStep;
