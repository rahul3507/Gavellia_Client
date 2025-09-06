/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { Progress } from "../ui/progress";
import { Upload, X, Check } from "lucide-react";

interface FileUpload {
  name: string;
  size: number;
  progress: number;
  complete: boolean;
}

interface UploadImageProps {
  files: FileUpload[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  canContinue: boolean;
  formatFileSize: (bytes: number) => string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  files,
  onFileUpload,
  onRemoveFile,
  onNext,
  onBack,
  canContinue,
  formatFileSize,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Upload Your Lot Photo
      </h2>
      <p className="text-gray-600 mb-8">
        Upload minimum 3 photos and maximum 6. Attractive photos sells quickly.
      </p>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Photos
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your photos here or click to browse
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Uploaded Files</h4>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    {file.complete ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Upload className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    {!file.complete && (
                      <Progress value={file.progress} className="mt-1 h-1" />
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" className="px-6 py-2">
          BACK
        </Button>
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

export default UploadImage;
