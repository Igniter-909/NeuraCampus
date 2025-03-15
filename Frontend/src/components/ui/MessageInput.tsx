import React from 'react';
import { IoAttachOutline, IoMicOutline, IoPaperPlaneOutline } from 'react-icons/io5';

interface MessageInputProps {
  message: string;
  setMessage: (msg: string) => void;
  isRecordingVoice: boolean;
  setIsRecordingVoice: (isRecording: boolean) => void;
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, isRecordingVoice, setIsRecordingVoice, onSendMessage }) => {
  return (
    <div className="p-2 bg-white dark:bg-gray-800 border-t">
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1">
        {/* Attach button */}
        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Attach file">
          <IoAttachOutline className="w-4 h-4 text-gray-500" />
        </button>
        <button className={`p-1.5 rounded-lg transition-colors ${isRecordingVoice ? 'bg-red-500 text-white dark:bg-red-600 animate-pulse' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'}`} title={isRecordingVoice ? "Stop recording" : "Record voice message"} onClick={() => setIsRecordingVoice(!isRecordingVoice)}>
          <IoMicOutline className="w-4 h-4" />
        </button>
        <input type="text" placeholder={isRecordingVoice ? "Recording voice message..." : "Type your message..."} className="flex-1 bg-transparent text-xs focus:outline-none text-gray-700 dark:text-gray-200" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isRecordingVoice} />
        <button className="p-1.5 bg-blue-500 text-white dark:bg-blue-600 rounded-lg hover:bg-blue-600 transition-colors" title="Send message" onClick={() => onSendMessage(message)}>
          <IoPaperPlaneOutline className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 