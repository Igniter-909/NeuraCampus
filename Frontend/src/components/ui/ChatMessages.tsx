import React from 'react';
import { ChatMessage } from '@/types/chat';
import Image from 'next/image';
interface ChatMessagesProps {
  messages: ChatMessage[];
  activeCommunity: any;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, activeCommunity }) => {
  return (
    <div className="flex-1 bg-transparent overflow-y-auto p-2 md:p-3 space-y-3 bg-gray-50">
      {messages.map((chat) => (
        <div key={chat.id} className={`flex gap-2 ${chat.isOwn ? 'flex-row-reverse' : ''}`}>
          <img src={chat.avatar} alt={chat.sender} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" width={28} height={28} />
          <div className={`flex flex-col ${chat.isOwn ? 'items-end' : ''}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-medium text-gray-900">{chat.sender}</span>
              <span className="text-[10px] text-gray-400">{chat.time}</span>
            </div>
            <div className={`max-w-[85vw] md:max-w-md rounded-xl px-3 py-1.5 ${chat.isOwn ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
              <p className="text-xs leading-relaxed">{chat.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages; 