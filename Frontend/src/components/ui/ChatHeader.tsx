import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

interface ChatHeaderProps {
  activeCommunity: any;
  setShowSidebar: (show: boolean) => void;
  isMobile: boolean;
  setShowProfile: (show: boolean) => void;
  setIsVoiceCallActive: (active: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeCommunity, isMobile, setShowProfile, setIsVoiceCallActive,setShowSidebar }) => {
  return (
    <div className="h-12 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-colors" onClick={() => setShowProfile(true)}>
        {isMobile && (
          <button onClick={(e) => { e.stopPropagation(); setShowSidebar(true); }} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Back to communities">
            <IoArrowBackOutline className="w-4 h-4 text-gray-600" />
          </button>
        )}
        <img src={activeCommunity.avatar} alt={activeCommunity.name} className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <h2 className="font-medium text-gray-900 text-sm">{activeCommunity.name}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {activeCommunity.members.online} members online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* Call and Video buttons */}
        {/* ... (same as before) */}
      </div>
    </div>
  );
};

export default ChatHeader; 