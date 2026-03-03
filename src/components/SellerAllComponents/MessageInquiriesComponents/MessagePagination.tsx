/** @format */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MessagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MessagePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: MessagePaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-1 py-6 border-t border-gray-100">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition cursor-pointer ${
            currentPage === page
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MessagePagination;
