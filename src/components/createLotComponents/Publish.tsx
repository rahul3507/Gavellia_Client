/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  ImageIcon,
} from "lucide-react";

interface FileUpload {
  name: string;
  size: number;
  progress: number;
  complete: boolean;
}

interface PublishProps {
  title: string;
  description: string;
  features: string[];
  files: FileUpload[];
  auctionType: string;
  startingPrice: string;
  estimatedValue: string;
  auctionDuration: string;
  startDate: string;
  onPublish: () => void;
  onBack: () => void;
  formatFileSize: (bytes: number) => string;
  getAuctionTypeName: (type: string) => string;
}

const Publish: React.FC<PublishProps> = ({
  title,
  description,
  features,
  files,
  auctionType,
  startingPrice,
  estimatedValue,
  auctionDuration,
  startDate,
  onPublish,
  onBack,
  formatFileSize,
  getAuctionTypeName,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Review and Publish
      </h2>
      <p className="text-gray-600 mb-8">
        Please review all details before publishing your lot.
      </p>

      <div className="space-y-6">
        {/* Lot Details Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Lot Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Title</label>
              <p className="text-gray-900">{title}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <p className="text-gray-900 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {features.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Features
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Images Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Auction Settings Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Auction Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Auction Type
              </label>
              <p className="text-gray-900">{getAuctionTypeName(auctionType)}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Starting Price
              </label>
              <p className="text-gray-900">${startingPrice}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Estimated Value
              </label>
              <p className="text-gray-900">${estimatedValue}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Duration
              </label>
              <p className="text-gray-900">{auctionDuration} Days</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-500">
              Start Date & Time
            </label>
            <p className="text-gray-900">
              {new Date(startDate).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Auction Start:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(startDate).toLocaleDateString()} at{" "}
                {new Date(startDate).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Auction End:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(
                  new Date(startDate).getTime() +
                    parseInt(auctionDuration) * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}{" "}
                at {new Date(startDate).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Terms & Conditions</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • By publishing this lot, you agree to our seller terms and
              conditions
            </li>
            <li>
              • You confirm that you own or have the right to sell this item
            </li>
            <li>
              • All item descriptions and images are accurate and truthful
            </li>
            <li>• You understand the commission structure and fees involved</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" className="px-6 py-2">
          BACK
        </Button>
        <Button
          onClick={onPublish}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
        >
          PUBLISH LOT
        </Button>
      </div>
    </div>
  );
};

export default Publish;
