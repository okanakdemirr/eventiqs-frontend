import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Calendar, MapPin, Clock, Check } from 'lucide-react';
import { formatTime } from '../utils/formatters';

interface ChatScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  contactInfo: {
    name: string;
    title: string;
    company: string;
    photo: string;
    type: string;
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate, contactInfo }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them' as const,
      text: 'Hi! Great to connect with you at the event. I saw your presentation on digital transformation.',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      sender: 'me' as const,
      text: 'Thank you! I\'d love to discuss how our solutions could help your company.',
      timestamp: new Date(Date.now() - 3000000).toISOString()
    },
    {
      id: 3,
      sender: 'them' as const,
      text: 'That sounds perfect. Would you be available for a quick meeting tomorrow?',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      meetingRequest: {
        date: '2024-01-17',
        time: '2:00 PM',
        location: 'Meeting Room B3'
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me' as const,
      text: message,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'them' as const,
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleAcceptMeeting = () => {
    const acceptMessage = {
      id: messages.length + 1,
      sender: 'me' as const,
      text: 'Perfect! I\'ve accepted the meeting request. Looking forward to our discussion.',
      timestamp: new Date().toISOString(),
      isSystemMessage: true
    };
    setMessages([...messages, acceptMessage]);
  };

  const MessageBubble = ({ msg }: { msg: any }) => (
    <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        msg.sender === 'me' 
          ? 'bg-blue-600 text-white' 
          : 'bg-white border border-gray-200 text-gray-900'
      }`}>
        <p className="text-sm">{msg.text}</p>
        
        {msg.meetingRequest && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Meeting Request</span>
            </div>
            <div className="space-y-1 text-xs text-blue-800">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {msg.meetingRequest.date} at {msg.meetingRequest.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {msg.meetingRequest.location}
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleAcceptMeeting}
                className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
              >
                Accept
              </button>
              <button className="flex-1 border border-blue-300 text-blue-600 py-1 px-3 rounded text-xs hover:bg-blue-50 transition-colors">
                Decline
              </button>
            </div>
          </div>
        )}
        
        <div className={`flex items-center justify-end mt-2 text-xs ${
          msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
        }`}>
          <span>{formatTime(msg.timestamp)}</span>
          {msg.sender === 'me' && (
            <Check className="w-3 h-3 ml-1" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('dashboard')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <img
            src={contactInfo.photo}
            alt={contactInfo.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{contactInfo.name}</h1>
            <p className="text-sm text-gray-600">{contactInfo.title} at {contactInfo.company}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;