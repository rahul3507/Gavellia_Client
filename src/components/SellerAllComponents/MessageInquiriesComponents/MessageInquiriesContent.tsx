/** @format */
"use client";

import React, { useState } from "react";
import MessageFiltersBar from "./MessageFiltersBar";
import MessageListItem, { Message } from "./MessageListItem";
import MessagePagination from "./MessagePagination";

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
  const [sortBy] = useState("Most recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12 ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif italic">
          Messages and Inquiries
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your buyer communications
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <MessageFiltersBar
          showUnreadFirst={showUnreadFirst}
          onShowUnreadFirstChange={setShowUnreadFirst}
          sortBy={sortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="divide-y divide-gray-100">
          {demoMessages.map((message, index) => (
            <MessageListItem
              key={message.id}
              message={message}
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* Pagination */}
        <MessagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MessageInquiriesContent;
