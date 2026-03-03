/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <div>
      <h2 className="text-xl md:text-2xl  font-medium  text-primary mb-2">
        Lot Details
      </h2>
      <p className="text-primary/50 text-xs md:text-sm mb-8">
        Enter your lot&apos;s title, core features and essential description.
      </p>

      <div className="space-y-6 text-primary">
        {/* Lot Title */}
        <div>
          <Label
            htmlFor="lot-title"
            className="text-xs md:text-sm font-medium mb-2 block"
          >
            Lot Title*
          </Label>
          <Input
            id="lot-title"
            type="text"
            placeholder="Enter your lot title"
            value={lotTitle}
            onChange={(e) => setLotTitle(e.target.value)}
            className="w-full text-primary text-sm "
          />
        </div>

        {/* Features */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs md:text-sm font-medium text-gray-700">
              Special feature (Optional)
            </label>
            <button
              onClick={addNewFeature}
              className="text-primary text-sm font-medium hover:text-primary/70 cursor-pointer flex items-center"
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
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label
            htmlFor="description"
            className="text-xs md:text-sm font-medium mb-2 block"
          >
            Description*
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your lot in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-32 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-primary hover:bg-primary/70 text-white px-6 py-2 rounded-none"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default LotDetails;
