import React from 'react';
import { IoArrowBackOutline, IoInformationCircleOutline, IoPersonOutline } from 'react-icons/io5';

interface ProfileDrawerProps {
  activeCommunity: any;
  setShowProfile: (show: boolean) => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ activeCommunity, setShowProfile }) => {
  return (
    <div className="absolute inset-0 z-20 bg-white flex flex-col">
      {/* Profile Header */}
      <div className="h-12 border-b flex items-center px-4 bg-white">
        <button onClick={() => setShowProfile(false)} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Back to chat">
          <IoArrowBackOutline className="w-4 h-4 text-gray-600" />
        </button>
        <span className="ml-2 font-medium text-gray-900">Group Info</span>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Community Banner */}
        <div className="text-center">
          <img src={activeCommunity.avatar} alt={activeCommunity.name} className="w-24 h-24 rounded-2xl mx-auto mb-3 object-cover ring-4 ring-blue-50" />
          <h1 className="text-xl font-semibold text-gray-900">{activeCommunity.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{activeCommunity.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{activeCommunity.members.total}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{activeCommunity.members.online}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{activeCommunity.admins.length}</div>
            <div className="text-xs text-gray-500">Admins</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <IoInformationCircleOutline className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">About</div>
              <div className="text-sm text-gray-500">{activeCommunity.description}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <IoPersonOutline className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">Created by</div>
              <div className="text-sm text-gray-500">{activeCommunity.admins[0]}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {activeCommunity.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">{tag}</span>
            ))}
          </div>
        </div>

        {/* Members Preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Admins</h3>
          <div className="space-y-2">
            {activeCommunity.admins.map((admin) => (
              <div key={admin} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <img src={`https://i.pravatar.cc/150?u=${admin}`} alt={admin} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{admin}</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer; 