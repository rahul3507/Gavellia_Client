/** @format */
import React, { useState } from "react";
import Image from "next/image";
import {
  Send,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import { Conversation } from "./MessageListItem";

export interface ChatMessage {
  id: number;
  senderId: "me" | "them";
  text: string;
  time: string;
}

interface ChatPanelProps {
  conversation: Conversation;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const ChatPanel = ({
  conversation,
  messages,
  onSendMessage,
  onBack,
}: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="lg:hidden p-1 hover:bg-gray-100 rounded cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">
              {conversation.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {conversation.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition">
            <Video className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.senderId === "me"
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-white text-primary border border-gray-100 rounded-bl-md shadow-sm"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.senderId === "me"
                    ? "text-gray-300 text-right"
                    : "text-muted-foreground text-right"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition shrink-0">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition shrink-0">
            <Smile className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
