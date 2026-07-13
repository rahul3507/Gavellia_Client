/** @format */
"use client";

import React, { useState, useMemo } from "react";
import MessageFiltersBar from "./MessageFiltersBar";
import MessageListItem, { Conversation } from "./MessageListItem";
import ChatPanel, { ChatMessage } from "./ChatPanel";

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Raira Natasya",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Is this piece still available?",
    time: "2m ago",
    unread: 3,
    isOnline: true,
  },
  {
    id: 2,
    name: "James Whitfield",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Thank you for the quick response!",
    time: "15m ago",
    unread: 1,
    isOnline: true,
  },
  {
    id: 3,
    name: "Sophia Chen",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    lastMessage: "I'd like to negotiate the price.",
    time: "1h ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: 4,
    name: "Marcus Rivera",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Can you ship internationally?",
    time: "3h ago",
    unread: 2,
    isOnline: false,
  },
  {
    id: 5,
    name: "Emily Brooks",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    lastMessage: "The watch looks amazing in the photos!",
    time: "5h ago",
    unread: 0,
    isOnline: true,
  },
  {
    id: 6,
    name: "Daniel Park",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Do you have any other color options?",
    time: "1d ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: 7,
    name: "Olivia Harper",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    lastMessage: "I'll take it! What's the next step?",
    time: "1d ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: 8,
    name: "Noah Adams",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Could you provide more details about the condition?",
    time: "2d ago",
    unread: 0,
    isOnline: false,
  },
];

const chatMessagesData: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      senderId: "them",
      text: "Hi! I'm interested in the Vintage Rolex Submariner 1970 you listed.",
      time: "10:30 AM",
    },
    {
      id: 2,
      senderId: "me",
      text: "Hello! Yes, it's still available. It's in excellent condition with original papers.",
      time: "10:32 AM",
    },
    {
      id: 3,
      senderId: "them",
      text: "That sounds wonderful! Could you share some more close-up photos of the dial and case back?",
      time: "10:33 AM",
    },
    {
      id: 4,
      senderId: "me",
      text: "Of course! I'll send them over shortly. The lume is still original and the bezel insert is clean.",
      time: "10:35 AM",
    },
    {
      id: 5,
      senderId: "them",
      text: "Is this piece still available? I'm very interested and ready to purchase.",
      time: "10:40 AM",
    },
  ],
  2: [
    {
      id: 1,
      senderId: "them",
      text: "Hey, I saw the Omega Speedmaster listing. Is the bracelet included?",
      time: "9:15 AM",
    },
    {
      id: 2,
      senderId: "me",
      text: "Yes! It comes with the original Omega bracelet and extra links.",
      time: "9:18 AM",
    },
    {
      id: 3,
      senderId: "them",
      text: "Thank you for the quick response!",
      time: "9:20 AM",
    },
  ],
  3: [
    {
      id: 1,
      senderId: "them",
      text: "I love the Cartier Tank, but the price is a bit above my budget.",
      time: "Yesterday",
    },
    {
      id: 2,
      senderId: "me",
      text: "I understand. I could offer a small discount if you're ready to commit today.",
      time: "Yesterday",
    },
    {
      id: 3,
      senderId: "them",
      text: "I'd like to negotiate the price. Would you consider $4,200?",
      time: "Yesterday",
    },
  ],
  4: [
    {
      id: 1,
      senderId: "them",
      text: "Hi! I'm based in London. Do you ship internationally?",
      time: "2:00 PM",
    },
    {
      id: 2,
      senderId: "me",
      text: "Yes, we ship worldwide with full insurance and tracking. Delivery typically takes 5-7 business days.",
      time: "2:05 PM",
    },
    {
      id: 3,
      senderId: "them",
      text: "Can you ship internationally?",
      time: "2:10 PM",
    },
  ],
  5: [
    {
      id: 1,
      senderId: "them",
      text: "The watch looks amazing in the photos!",
      time: "11:00 AM",
    },
    {
      id: 2,
      senderId: "me",
      text: "Thank you! The photos don't do it justice honestly. It's even more stunning in person.",
      time: "11:02 AM",
    },
  ],
  6: [
    {
      id: 1,
      senderId: "them",
      text: "Do you have any other color options for the Patek Philippe Nautilus?",
      time: "Yesterday",
    },
  ],
  7: [
    {
      id: 1,
      senderId: "them",
      text: "I'll take it! What's the next step?",
      time: "Yesterday",
    },
    {
      id: 2,
      senderId: "me",
      text: "Great! I'll send you an invoice. We accept wire transfer and major credit cards.",
      time: "Yesterday",
    },
  ],
  8: [
    {
      id: 1,
      senderId: "them",
      text: "Could you provide more details about the condition of the Audemars Piguet?",
      time: "2 days ago",
    },
  ],
};

const MessageInquiriesContent = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMessages, setAllMessages] = useState(chatMessagesData);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedId
  );

  const activeMessages = selectedId ? allMessages[selectedId] || [] : [];

  const handleSend = (text: string) => {
    if (!selectedId) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      senderId: "me",
      text,
      time: "Just now",
    };
    setAllMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));
  };

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif italic">
          Messages and Inquiries
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your buyer communications
        </p>
      </div>

      {/* Messenger Layout */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex h-[calc(100vh-220px)] min-h-[500px]">
        {/* Left Sidebar - Conversation List */}
        <div
          className={`w-full lg:w-[340px] xl:w-[380px] border-r border-gray-100 flex flex-col shrink-0 ${
            selectedId ? "hidden lg:flex" : "flex"
          }`}
        >
          <MessageFiltersBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalConversations={filteredConversations.length}
            unreadCount={totalUnread}
          />

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <MessageListItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={conv.id === selectedId}
                  onClick={() => setSelectedId(conv.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div
          className={`flex-1 flex flex-col ${
            !selectedId ? "hidden lg:flex" : "flex"
          }`}
        >
          {selectedConversation ? (
            <ChatPanel
              conversation={selectedConversation}
              messages={activeMessages}
              onSendMessage={handleSend}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInquiriesContent;
