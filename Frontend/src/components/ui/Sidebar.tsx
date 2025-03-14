import React, { useState } from 'react';
import { CommunityData } from '@/types/chat';
import { IoSettingsOutline, IoSearchOutline } from 'react-icons/io5';

interface SidebarProps {
  data: CommunityData;
  isMobile: boolean;
  showSidebar: boolean;
  setActiveCommunity: (community: any) => void;
  setShowSidebar: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  onCreateGroup: () => void;
  onJoinGroup: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  data,
  isMobile,
  showSidebar,
  setActiveCommunity,
  setShowSidebar,
  setShowSettings,
  onCreateGroup,
  onJoinGroup,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter communities based on search term
  const filteredCommunities = data.categories.flatMap(category => 
    category.communities.filter(community => 
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={`${
      isMobile 
        ? showSidebar 
          ? 'absolute inset-0 z-10' 
          : 'hidden'
        : 'w-80'
      } bg-white/95 backdrop-blur-sm shadow-xl flex flex-col transition-transform duration-300`}>
      {/* Sidebar Header and User Profile */}
      <div className={`${isMobile ? 'p-2' : 'p-4'} border-b border-gray-100`}>
        {/* User Profile */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src={data.user.avatar} 
                alt="Profile" 
                className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl object-cover ring-2 ring-blue-100`}
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">{data.user.name}</h3>
              <p className="text-xs font-medium text-green-600">Online</p>
            </div>
          </div>
          <div className="relative">
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-xl transition-all group"
              title="Settings"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <IoSettingsOutline className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                <ul className="py-1">
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => { setShowSettings(true); setShowDropdown(false); }}>
                    Account Settings
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => { setShowDropdown(false); }}>
                    Notification Settings
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => { setShowDropdown(false); }}>
                    Privacy Settings
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => { setShowDropdown(false); }}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search communities..."
            className={`w-full pl-8 pr-3 ${isMobile ? 'py-2 text-xs' : 'py-2.5 text-sm'} bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Sections for Communities */}
      {data.categories.map((category) => (
        <div key={category.name} className="py-3">
          <h3 className="px-4 text-sm font-semibold text-gray-500">{category.name}</h3>
          <div className="space-y-0.5">
            {category.communities.map((community) => (
              <button
                key={community.id}
                onClick={() => {
                  console.log(`Selected community: ${community.name}`);
                  setActiveCommunity(community);
                  if (isMobile) setShowSidebar(false);
                }}
                className={`w-full flex items-center p-3 rounded-xl transition-all ${community.isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'}`}
                title={`Open ${community.name}`}
              >
                <div className="relative">
                  <img 
                    src={community.avatar} 
                    alt={community.name} 
                    className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl object-cover`}
                  />
                  {community.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
                      <span className="text-xs text-white font-medium">{community.unreadCount}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 ml-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-sm truncate ${community.isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                      {community.name}
                    </h4>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{community.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{community.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar; 