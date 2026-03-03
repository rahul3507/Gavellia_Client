/** @format */
import React from "react";
import Image from "next/image";
import { Send, AlertTriangle, MoreVertical } from "lucide-react";

export interface Message {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  preview: string;
  isNew: boolean;
  isPriority: boolean;
}

interface MessageListItemProps {
  message: Message;
  isFirst: boolean;
}

const MessageListItem = ({ message, isFirst }: MessageListItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 sm:p-6 hover:bg-gray-50 transition">
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
            <span className="text-xs font-semibold text-green-500">New</span>
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
        {isFirst ? (
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
  );
};

export default MessageListItem;
