/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Loader } from "lucide-react";

interface TaxInfoStepProps {
  formData: {
    idType: string;
    taxId: string;
    registrationCountry: string;
  };
  isLoading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onInputChange: (field: string, value: string) => void;
}

export function TaxInfoStep({
  formData,
  isLoading,
  onBack,
  onContinue,
  onInputChange,
}: TaxInfoStepProps) {
  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={onBack}
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
                onValueChange={(value) => onInputChange("idType", value)}
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
                onChange={(e) => onInputChange("taxId", e.target.value)}
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
                  onInputChange("registrationCountry", value)
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
          onClick={onContinue}
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
}
