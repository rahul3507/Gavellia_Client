/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "../ui/progress";
import { Upload, Check, Trash2 } from "lucide-react";
import { CiImageOn } from "react-icons/ci";

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
      <h2 className="text-xl md:text-2xl  font-medium  text-primary mb-2">
        Upload Your Lot Photo
      </h2>
      <p className="text-primary/50 text-xs md:text-sm mb-8">
        Upload minimum 3 photos and maximum 6. Attractive photos sells quickly.
      </p>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-[#007AFF] bg-[#1C1C1C0F] rounded-none p-2 text-center">
          <div className="flex flex-col items-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-[#007AFF] mb-4" />
            </label>

            <p className="text-primary/70 mb-4">
              <label
                htmlFor="file-upload"
                className="text-[#007AFF] cursor-pointer"
              >
                Click to Upload
              </label>{" "}
              or drag and drop
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onFileUpload}
              className="hidden"
              id="file-upload"
            />
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200  bg-white"
              >
                <div className="flex  space-x-4 flex-1">
                  <div className="justify-start items-start">
                    <CiImageOn className="h-6 w-6 text-primary/70" />
                  </div>

                  <div className="flex-1">
                    <div></div>
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm  font-medium text-primary/70">
                        lot photo {index + 1}
                      </h5>
                    </div>

                    <p className="text-xs text-primary/70 mt-1">{file.name}</p>

                    {file.complete ? (
                      <button className="text-xs text-primary mt-1 hover:underline">
                        CLICK TO VIEW
                      </button>
                    ) : (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">
                          {formatFileSize(file.size)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={file.progress}
                            className="flex-1 h-2"
                          />
                          <span className="text-xs text-primary font-medium">
                            {file.progress}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="justify-start items-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFile(index)}
                      className="p-2 text-primary/80 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-none"
        >
          BACK
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-none"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
