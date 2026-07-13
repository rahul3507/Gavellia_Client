/** @format */
import React from "react";
import { Search } from "lucide-react";

interface MessageFiltersBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  totalConversations: number;
  unreadCount: number;
}

const MessageFiltersBar = ({
  searchQuery,
  onSearchChange,
  totalConversations,
  unreadCount,
}: MessageFiltersBarProps) => {
  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-primary">Chats</h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground">
            {totalConversations} conversations
          </span>
          {unreadCount > 0 && (
            <span className="text-red-500 font-semibold">
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
        />
      </div>
    </div>
  );
};

export default MessageFiltersBar;
