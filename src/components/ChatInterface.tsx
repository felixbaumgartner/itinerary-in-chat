import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Calendar, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage, { MessageProps, ActivityOption } from './ChatMessage';
import Confetti from './Confetti';

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

// Museum-specific activities
const museumActivities: ActivityOption[] = [
  {
    id: '4',
    title: 'Rijksmuseum',
    description: "The Dutch national museum dedicated to arts and history in Amsterdam with masterpieces from Rembrandt and Vermeer.",
    price: '€20 per person',
    image: 'https://images.unsplash.com/photo-1583029901628-8039987f8fe0?q=80&w=2874&auto=format&fit=crop',
    rating: 9.5,
    reviewCount: 2100
  },
  {
    id: '5',
    title: 'Van Gogh Museum',
    description: 'Home to the largest collection of artworks by Vincent van Gogh in the world, including over 200 paintings and 500 drawings.',
    price: '€19 per person',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=2874&auto=format&fit=crop',
    rating: 9.3,
    reviewCount: 1876
  },
  // Keep Anne Frank House as an option for museums too
  sampleActivities[0]
];

interface ChatInterfaceProps {
  onBookActivity: (activity: ActivityOption) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBookActivity }) => {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      content: "Hello! I'm your personal Trip Assistant for your upcoming stay in Amsterdam. How can I help you plan your visit?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Track conversation state to avoid repetitive responses
  const [conversationState, setConversationState] = useState({
    askedAboutMuseums: false,
    askedAboutAvailability: false,
    askedGenericQuestion: 0, // Counter for generic responses
    lastResponseType: '' // Track last response type
  });

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
      
      const lowerCaseMessage = newMessage.toLowerCase();
      const newState = {...conversationState};
      
      // Check if user is asking about availability or specific slot
      if (lowerCaseMessage.includes('availability') || 
          lowerCaseMessage.includes('available') || 
          lowerCaseMessage.includes('check') || 
          lowerCaseMessage.includes('anne frank') ||
          lowerCaseMessage.includes('slot') ||
          lowerCaseMessage.includes('booking') ||
          lowerCaseMessage.includes('time')) {
        
        // Set the selected activity for future reference
        setSelectedActivity(sampleActivities[0]); // Anne Frank House
        newState.askedAboutAvailability = true;
        newState.lastResponseType = 'availability';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Good news! I found a free slot for the Anne Frank House on July 17th at 10:00 AM. The weather forecast for that day is excellent (25°C and sunny) ☀️, making it a perfect day to visit. Would you like me to book it for you?",
            sender: 'assistant',
            timestamp: new Date(),
            // Include an icon element to make the message more visually appealing
            icon: (
              <div className="flex items-center gap-2 mt-2 text-booking-blue">
                <Sun className="h-5 w-5" />
                <Calendar className="h-5 w-5" />
                <span className="font-medium">July 17th · 10:00 AM · 25°C Sunny</span>
              </div>
            )
          }
        ]);
      } 
      // Check if user is confirming the booking
      else if ((lowerCaseMessage.includes('yes') || 
               lowerCaseMessage.includes('book it') ||
               lowerCaseMessage.includes('sure') ||
               lowerCaseMessage.includes('okay') ||
               lowerCaseMessage.includes('perfect') ||
               lowerCaseMessage.includes('book for me') ||
               lowerCaseMessage.includes('sounds good')) &&
               (selectedActivity || conversationState.askedAboutAvailability)) {
        
        // Reset conversation state after booking
        newState.askedAboutAvailability = false;
        newState.lastResponseType = 'booking_confirmation';
        
        // Book the activity
        if (selectedActivity && onBookActivity) {
          onBookActivity(selectedActivity);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else {
          // If somehow selectedActivity is null but we're in this flow, use Anne Frank House
          onBookActivity(sampleActivities[0]);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        setMessages(prev => [
          ...prev, 
          {
            content: `Perfect! I've booked your visit to the Anne Frank House for July 17th at 10:00 AM. You'll receive a confirmation email with your e-tickets shortly. The weather is expected to be 25°C and sunny, so don't forget sunscreen! Is there anything else you'd like help with for your Amsterdam trip?`,
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } 
      // Check for museum-related queries
      else if (lowerCaseMessage.includes('museum') || 
              lowerCaseMessage.includes('museums') ||
              lowerCaseMessage.includes('art') ||
              lowerCaseMessage.includes('gallery') ||
              lowerCaseMessage.includes('exhibition') ||
              lowerCaseMessage.includes('culture') ||
              lowerCaseMessage.includes('visit') && lowerCaseMessage.includes('museum') ||
              lowerCaseMessage.includes('trip to')) {
        
        newState.askedAboutMuseums = true;
        newState.lastResponseType = 'museums';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam is home to world-class museums! Here are some must-visit museums that I would recommend:",
            sender: 'assistant',
            timestamp: new Date(),
            options: museumActivities
          }
        ]);
      }
      // Check for activity and family-friendly requests
      else if (lowerCaseMessage.includes('activities') || 
              lowerCaseMessage.includes('things to do') ||
              lowerCaseMessage.includes('family') ||
              lowerCaseMessage.includes('fun') ||
              lowerCaseMessage.includes('kids') ||
              lowerCaseMessage.includes('sightseeing') ||
              lowerCaseMessage.includes('attractions')) {
        
        newState.lastResponseType = 'activities';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "I'd be happy to help you find family-friendly activities in Amsterdam! Here are some great options that are perfect for visitors of all ages:",
            sender: 'assistant',
            timestamp: new Date(),
            options: sampleActivities
          }
        ]);
      } 
      // Restaurant and food queries
      else if (lowerCaseMessage.includes('restaurant') || 
              lowerCaseMessage.includes('eat') ||
              lowerCaseMessage.includes('food') ||
              lowerCaseMessage.includes('dining') ||
              lowerCaseMessage.includes('meal') ||
              lowerCaseMessage.includes('dinner') ||
              lowerCaseMessage.includes('lunch')) {
        
        newState.lastResponseType = 'restaurants';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam has amazing dining options! Here are some recommendations:\n\n1. Pancake Bakery - Traditional Dutch pancakes with sweet and savory options.\n\n2. Foodhallen - Indoor food market with lots of stalls to choose from.\n\n3. Moeders - A unique Dutch restaurant serving traditional home-cooked meals in a quirky setting.\n\n4. La Pizza Pazza - Great Italian food if you need a break from Dutch cuisine.\n\nWould you like me to make a reservation at any of these for your stay?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } 
      // Transport and getting around
      else if (lowerCaseMessage.includes('transport') || 
              lowerCaseMessage.includes('getting around') ||
              lowerCaseMessage.includes('travel') ||
              lowerCaseMessage.includes('bus') ||
              lowerCaseMessage.includes('tram') ||
              lowerCaseMessage.includes('bike') ||
              lowerCaseMessage.includes('rental') ||
              lowerCaseMessage.includes('taxi')) {
        
        newState.lastResponseType = 'transport';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam is very easy to navigate! The best options are:\n\n1. Public Transport - Get an I Amsterdam City Card for unlimited access to public transport plus free entry to many museums.\n\n2. Bicycle Rental - Amsterdam is famous for cycling. Family bikes are available.\n\n3. Canal Boats - A hop-on-hop-off canal cruise is a fun way to see the city.\n\nWould you like me to arrange any of these for you?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } else {
        // Generic response - vary it based on how many generic responses have been given
        newState.askedGenericQuestion++;
        
        // Different variations of generic responses to avoid loops
        let genericResponses = [
          "I'm here to help you plan your trip to Amsterdam! I can recommend activities, restaurants, or transportation options. What specifically are you looking for?",
          "I'd love to assist with your Amsterdam trip! I can suggest museums, family activities, or dining options. What aspect of your trip would you like assistance with today?",
          "For your Amsterdam visit, I can help with bookings, recommendations, and local tips. Which part of your trip would you like assistance with today?",
          "How can I make your Amsterdam experience amazing? I can help with attractions, dining, or transportation. What would you like to know about?"
        ];
        
        // Use the counter to cycle through different generic responses
        const responseIndex = (newState.askedGenericQuestion - 1) % genericResponses.length;
        
        setMessages(prev => [
          ...prev, 
          {
            content: genericResponses[responseIndex],
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      }
      
      // Update the conversation state
      setConversationState(newState);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-white border-b">
        <h2 className="text-base font-semibold text-booking-blue">Trip Assistant</h2>
        <p className="text-xs text-gray-500">Amsterdam · Jul 15-20 · 2 adults</p>
      </div>
      
      <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            content={message.content} 
            sender={message.sender} 
            timestamp={message.timestamp}
            options={message.options}
            onBookActivity={onBookActivity}
            icon={message.icon}
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
      
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          className="flex-grow text-sm"
        />
        <Button type="submit" size="sm" className="bg-booking-blue text-white hover:bg-booking-navy">
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
      
      {/* Add confetti component */}
      <Confetti active={showConfetti} />
    </div>
  );
};

export default ChatInterface;
