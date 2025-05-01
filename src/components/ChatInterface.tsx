
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage, { MessageProps, ActivityOption } from './ChatMessage';

// Sample activity options
const sampleActivities: ActivityOption[] = [
  {
    id: '1',
    title: 'Anne Frank House Museum',
    description: "Explore the hiding place where Anne Frank wrote her famous diary during World War II. This moving museum presents the story of her life and times.",
    price: '€14 per person',
    image: 'https://images.unsplash.com/photo-1584260968834-311ce8f693d5?q=80&w=2946&auto=format&fit=crop',
    rating: 8.9,
    reviewCount: 1432
  },
  {
    id: '2',
    title: 'NEMO Science Museum',
    description: 'A family-friendly interactive science center with five floors of exhibitions, experiments, demonstrations and workshops.',
    price: '€17.50 per person',
    image: 'https://images.unsplash.com/photo-1583953599450-eb085562a370?q=80&w=2960&auto=format&fit=crop',
    rating: 9.1,
    reviewCount: 876
  },
  {
    id: '3',
    title: 'Vondelpark Guided Family Bike Tour',
    description: "A fun 2-hour guided bicycle tour through Amsterdam's famous park, with child-sized bikes and seats available.",
    price: '€29 per person',
    image: 'https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?q=80&w=2874&auto=format&fit=crop',
    rating: 9.4,
    reviewCount: 564
  }
];

interface ChatInterfaceProps {
  onBookActivity: (activity: ActivityOption) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBookActivity }) => {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      content: "Congratulations on booking your stay! Need help planning the rest of your Amsterdam trip? I can suggest family-friendly activities, restaurants, or transportation options.",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: MessageProps = {
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate response based on message content
    setTimeout(() => {
      setIsTyping(false);
      
      if (newMessage.toLowerCase().includes('activities') || 
          newMessage.toLowerCase().includes('things to do') ||
          newMessage.toLowerCase().includes('family')) {
        
        setMessages(prev => [
          ...prev, 
          {
            content: "I'd be happy to help you find family-friendly activities in Amsterdam! Here are some great options that are perfect for families with children:",
            sender: 'assistant',
            timestamp: new Date(),
            options: sampleActivities
          }
        ]);
      } else if (newMessage.toLowerCase().includes('anne frank') || 
                newMessage.toLowerCase().includes('museum')) {
        
        const anneOption = sampleActivities.filter(act => act.id === '1')[0];
        
        setMessages(prev => [
          ...prev, 
          {
            content: `The Anne Frank House is one of Amsterdam's most significant museums. It's where Anne Frank and her family hid during WWII and where she wrote her famous diary.\n\nTickets cost €14 per person, and I recommend booking in advance as it's very popular. They offer special family-friendly tours at 10:00 AM and 3:00 PM.\n\nWould you like me to check availability for your dates (July 15-20)?`,
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } else if (newMessage.toLowerCase().includes('restaurant') || 
                newMessage.toLowerCase().includes('eat') ||
                newMessage.toLowerCase().includes('food')) {
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam has amazing dining options! With children, I'd recommend:\n\n1. Pancake Bakery - Traditional Dutch pancakes with sweet and savory options.\n\n2. Foodhallen - Indoor food market with lots of stalls to choose from.\n\n3. Pasta e Basta - Italian restaurant where the staff sing opera!\n\nWould you like me to make a reservation at any of these for your stay?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } else if (newMessage.toLowerCase().includes('transport') || 
                newMessage.toLowerCase().includes('getting around')) {
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam is very easy to navigate! The best options are:\n\n1. Public Transport - Get an I Amsterdam City Card for unlimited access to public transport plus free entry to many museums.\n\n2. Bicycle Rental - Amsterdam is famous for cycling. Family bikes are available.\n\n3. Canal Boats - A hop-on-hop-off canal cruise is a fun way to see the city.\n\nWould you like me to arrange any of these for you?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          {
            content: "I'm here to help you plan your trip to Amsterdam! I can recommend activities, restaurants, or transportation options. What specifically are you looking for?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white border-b">
        <h2 className="text-xl font-semibold text-booking-blue">Trip Assistant</h2>
        <p className="text-sm text-gray-500">Ask about activities, restaurants, and transportation</p>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            content={message.content} 
            sender={message.sender} 
            timestamp={message.timestamp}
            options={message.options}
            onBookActivity={onBookActivity}
          />
        ))}
        
        {isTyping && (
          <ChatMessage 
            content="" 
            sender="assistant" 
            timestamp={new Date()} 
            typing={true}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          className="flex-grow"
        />
        <Button type="submit" className="bg-booking-blue text-white hover:bg-booking-navy">
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
