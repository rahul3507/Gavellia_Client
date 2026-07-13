/** @format */
import React from "react";
import Image from "next/image";

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

interface MessageListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

const MessageListItem = ({
  conversation,
  isSelected,
  onClick,
}: MessageListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition border-l-2 ${
        isSelected
          ? "bg-gray-100 border-l-primary"
          : "border-l-transparent hover:bg-gray-50"
      }`}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={conversation.avatar}
            alt={conversation.name}
            width={44}
            height={44}
            className="w-full h-full object-cover"
          />
        </div>
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span
            className={`text-sm truncate ${
              conversation.unread > 0
                ? "font-bold text-primary"
                : "font-medium text-primary"
            }`}
          >
            {conversation.name}
          </span>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
            {conversation.time}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p
            className={`text-xs truncate ${
              conversation.unread > 0
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            {conversation.lastMessage}
          </p>
          {conversation.unread > 0 && (
            <span className="shrink-0 ml-2 w-5 h-5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageListItem;
