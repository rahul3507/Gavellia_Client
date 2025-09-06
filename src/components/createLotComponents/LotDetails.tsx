/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface LotDetailsProps {
  lotTitle: string;
  setLotTitle: (value: string) => void;
  features: string[];
  setFeatures: (features: string[]) => void;
  description: string;
  setDescription: (value: string) => void;
  onNext: () => void;
  canContinue: boolean;
}

const LotDetails: React.FC<LotDetailsProps> = ({
  lotTitle,
  setLotTitle,
  features,
  setFeatures,
  description,
  setDescription,
  onNext,
  canContinue,
}) => {
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addNewFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    if (features.length > 3) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Lot Details</h2>
      <p className="text-gray-600 mb-8">
        Enter your lot&apos;s title, core features and essential description.
      </p>

      <div className="space-y-6">
        {/* Lot Title */}
        <div>
          <Label htmlFor="lot-title" className="text-sm font-medium mb-2 block">
            Lot Title*
          </Label>
          <Input
            id="lot-title"
            type="text"
            placeholder="Enter your lot title"
            value={lotTitle}
            onChange={(e) => setLotTitle(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Features */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Features & Highlights*
          </Label>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1"
                />
                {features.length > 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {features.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addNewFeature}
                className="w-full border-dashed"
              >
                + Add another feature
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium mb-2 block"
          >
            Description*
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your lot in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-32"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default LotDetails;
