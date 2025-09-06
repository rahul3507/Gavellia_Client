/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Share2, Eye } from "lucide-react";

interface SuccessProps {
  lotId: string;
  onCreateAnother: () => void;
  onViewLot: () => void;
  onGoToDashboard: () => void;
}

const Success: React.FC<SuccessProps> = ({
  lotId,
  onCreateAnother,
  onViewLot,
  onGoToDashboard,
}) => {
  const shareUrl = `${window.location.origin}/lot/${lotId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my auction lot",
          url: shareUrl,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      // You could show a toast notification here
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Lot Successfully Created!
      </h2>
      <p className="text-gray-600 mb-8">
        Your lot has been published and is now live for bidding.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">Lot Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Lot ID:</span>
            <span className="font-medium text-gray-900">#{lotId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium text-gray-900">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="font-medium text-gray-900">What&apos;s Next?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 border border-gray-200 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Monitor Activity</h4>
            <p className="text-gray-600">
              Track bids and engagement on your lot
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <Share2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Share Your Lot</h4>
            <p className="text-gray-600">
              Promote your auction to increase visibility
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Manage Auction</h4>
            <p className="text-gray-600">
              Update details and respond to questions
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onViewLot}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Lot
        </Button>

        <Button onClick={handleShare} variant="outline" className="px-6 py-2">
          <Share2 className="w-4 h-4 mr-2" />
          Share Lot
        </Button>

        <Button
          onClick={onCreateAnother}
          variant="outline"
          className="px-6 py-2"
        >
          Create Another Lot
        </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <Button
          onClick={onGoToDashboard}
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
        >
          Go to Seller Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Success;
