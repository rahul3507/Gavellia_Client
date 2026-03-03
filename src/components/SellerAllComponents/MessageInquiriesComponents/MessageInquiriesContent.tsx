/** @format */
"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Send,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  preview: string;
  isNew: boolean;
  isPriority: boolean;
}

const demoMessages: Message[] = [
  {
    id: 1,
    name: "Raira Natasya",
    avatar: "/productImage/Bowling_SS_Bag.png",
    subject: "Re: Vintage Rolex Submariner 1970",
    preview: "Is this piece still available? I'm very interested and...",
    isNew: true,
    isPriority: false,
  },
  {
    id: 2,
    name: "Raira Natasya",
    avatar: "/productImage/Bowling_SS_Bag.png",
    subject: "Re: Vintage Rolex Submariner 1970",
    preview: "Is this piece still available? I'm very interested and...",
    isNew: true,
    isPriority: false,
  },
  {
    id: 3,
    name: "Raira Natasya",
    avatar: "/productImage/Bowling_SS_Bag.png",
    subject: "Re: Vintage Rolex Submariner 1970",
    preview: "Is this piece still available? I'm very interested and...",
    isNew: true,
    isPriority: true,
  },
  {
    id: 4,
    name: "Raira Natasya",
    avatar: "/productImage/Bowling_SS_Bag.png",
    subject: "Re: Vintage Rolex Submariner 1970",
    preview: "Is this piece still available? I'm very interested and...",
    isNew: true,
    isPriority: false,
  },
  {
    id: 5,
    name: "Raira Natasya",
    avatar: "/productImage/Bowling_SS_Bag.png",
    subject: "Re: Vintage Rolex Submariner 1970",
    preview: "Is this piece still available? I'm very interested and...",
    isNew: true,
    isPriority: false,
  },
];

const MessageInquiriesContent = () => {
  const [showUnreadFirst, setShowUnreadFirst] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif">
          Messages and Inquiries
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your buyer communications
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadFirst}
                  onChange={(e) => setShowUnreadFirst(e.target.checked)}
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

          {/* Search */}
          <div className="relative mt-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-100">
          {demoMessages.map((message, index) => (
            <div
              key={message.id}
              className="flex items-center gap-4 p-4 sm:p-6 hover:bg-gray-50 transition"
            >
              {/* Avatar */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <Image
                  src={message.avatar}
                  alt={message.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {message.name}
                  </span>
                  {message.isNew && (
                    <span className="text-xs font-semibold text-green-500">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary mt-0.5 truncate">
                  {message.subject}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {message.preview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {index === 0 ? (
                  <button className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition">
                    QUICK REPLY <Send className="w-3 h-3" />
                  </button>
                ) : message.isPriority ? (
                  <button className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition">
                    PRIORITY REPLY <AlertTriangle className="w-3 h-3" />
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 border border-gray-200 text-primary text-xs font-semibold px-4 py-2 rounded-md hover:bg-gray-50 transition">
                    REPLY <Send className="w-3 h-3" />
                  </button>
                )}
                <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 py-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
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
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInquiriesContent;
