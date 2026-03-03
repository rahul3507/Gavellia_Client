/** @format */
import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface MessageFiltersBarProps {
  showUnreadFirst: boolean;
  onShowUnreadFirstChange: (val: boolean) => void;
  sortBy: string;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

const MessageFiltersBar = ({
  showUnreadFirst,
  onShowUnreadFirstChange,
  sortBy,
  searchQuery,
  onSearchChange,
}: MessageFiltersBarProps) => {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadFirst}
              onChange={(e) => onShowUnreadFirstChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            Show unread first
          </label>
          <div className="flex items-center gap-2 text-sm text-primary">
            <span className="text-muted-foreground">Short by</span>
            <button className="flex items-center gap-1 font-semibold">
              {sortBy} <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">23 conversations</span>
          <span className="text-red-500 font-semibold">5 unread</span>
        </div>
      </div>

      <div className="relative mt-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default MessageFiltersBar;
