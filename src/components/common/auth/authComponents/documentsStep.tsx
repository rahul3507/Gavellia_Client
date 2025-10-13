/** @format */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Loader,
  Upload,
  FileText,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface DocumentsStepProps {
  uploadStatus: string;
  uploadProgress: number;
  uploadedFile: File | null;
  isDragOver: boolean;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onBack: () => void;
  onContinue: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClickUpload: () => void;
  onRemoveFile: () => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DocumentsStep({
  uploadStatus,
  uploadProgress,
  uploadedFile,
  isDragOver,
  isLoading,
  fileInputRef,
  onBack,
  onContinue,
  onDragOver,
  onDragLeave,
  onDrop,
  onClickUpload,
  onRemoveFile,
  onFileInputChange,
}: DocumentsStepProps) {
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
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <Upload className="mx-auto h-8 w-8 text-blue-500 mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                <button
                  onClick={onClickUpload}
                  className="cursor-pointer text-blue-500 font-medium hover:underline"
                >
                  Click to Upload
                </button>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">(Max. File size: 25 MB)</p>
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
                    <button onClick={onRemoveFile} className="cursor-pointer">
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
                    <p className="text-xs text-green-600 text-right">100%</p>
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
          onClick={onContinue}
          disabled={uploadStatus !== "success" || isLoading}
          className="w-full bg-black  text-white font-semibold py-3 rounded-none hover:bg-gray-800 disabled:opacity-50 disabled:bg-gray-400"
        >
          <span className="flex items-center gap-2">
            {uploadStatus === "success" && isLoading ? "SUBMITTING" : "SUBMIT"}
            {isLoading && <Loader className="animate-spin h-4 w-4" />}
          </span>
        </Button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={onFileInputChange}
        className="hidden"
      />
    </div>
  );
}
