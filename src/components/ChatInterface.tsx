import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, Calendar, Ticket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, addDays } from "date-fns";
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

// Available time slots for bookings
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Canal cruise options
const canalCruiseOptions = [
  {
    id: 'canal1',
    title: 'Evening Canal Cruise',
    description: '90-minute boat tour with cheese & wine through Amsterdam\'s iconic canals.',
    price: '€42 per person',
    image: 'https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?q=80&w=2940&auto=format&fit=crop',
    rating: 9.2,
    reviewCount: 1875
  }
];

// Transportation options
const transportOptions = [
  {
    id: 'transfer1',
    title: 'Private Airport Transfer',
    description: 'Door-to-door service from Schiphol Airport to your hotel with meet & greet.',
    price: '€48 total',
    image: 'https://images.unsplash.com/photo-1553194642-8dcb1c431cb8?q=80&w=2874&auto=format&fit=crop',
    rating: 9.0,
    reviewCount: 934
  }
];

interface ChatInterfaceProps {
  onBookActivity: (activity: ActivityOption) => void;
}

interface BookingDetails {
  activity: ActivityOption;
  date?: Date;
  time?: string;
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingDetails | null>(null);
  const [pendingBooking, setPendingBooking] = useState<ActivityOption | null>(null);
  
  // Track conversation state to avoid repetitive responses
  const [conversationState, setConversationState] = useState({
    askedAboutMuseums: false,
    askedAboutAvailability: false,
    waitingForDateSelection: false,
    waitingForTimeSelection: false,
    askedGenericQuestion: 0,
    lastResponseType: ''
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    // Short delay to ensure DOM updates before scrolling
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleConfirmation = (confirmed: boolean) => {
    // Add user's selection as a message
    const userMessage: MessageProps = {
      content: confirmed ? "Yes, I confirm the booking." : "No, cancel the booking.",
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (confirmed && pendingBooking) {
        // Process the booking
        onBookActivity(pendingBooking);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        
        // Confirmation message
        setMessages(prev => [
          ...prev,
          {
            content: `🎉 Booking confirmed! Your ${pendingBooking.title} has been booked successfully. You'll receive a confirmation email with all the details shortly. Is there anything else I can help you with?`,
            sender: 'assistant',
            timestamp: new Date(),
            icon: (
              <div className="flex items-center gap-2 mt-2 text-booking-blue">
                <Ticket className="h-5 w-5" />
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Booking confirmed!</span>
              </div>
            )
          }
        ]);
      } else {
        // Cancellation message
        setMessages(prev => [
          ...prev,
          {
            content: "No problem. The booking has been cancelled. Is there anything else you'd like to explore instead?",
            sender: 'assistant',
            timestamp: new Date(),
          }
        ]);
      }
      
      // Clear pending booking
      setPendingBooking(null);
    }, 1000);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !currentBooking) return;
    
    const selectedDate = date;
    
    // Add user's selection as a message
    const userMessage: MessageProps = {
      content: `I'd like to visit on ${format(selectedDate, "MMMM d, yyyy")}`,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update booking details with selected date
    setCurrentBooking({
      ...currentBooking,
      date: selectedDate
    });
    
    // Show AI is typing
    setIsTyping(true);
    
    // Update conversation state
    setConversationState(prev => ({
      ...prev,
      waitingForDateSelection: false,
      waitingForTimeSelection: true,
      lastResponseType: 'time_selection'
    }));
    
    // Simulate AI response with time slot options
    setTimeout(() => {
      setIsTyping(false);
      
      setMessages(prev => [
        ...prev,
        {
          content: `Great! What time on ${format(selectedDate, "MMMM d, yyyy")} would you prefer to visit ${currentBooking.activity.title}? Here are the available time slots:`,
          sender: 'assistant',
          timestamp: new Date(),
          timeSlots: timeSlots
        }
      ]);
    }, 1000);
  };
  
  const handleTimeSelect = (time: string) => {
    if (!currentBooking) return;
    
    // Add user's selection as a message
    const userMessage: MessageProps = {
      content: `I'd like the ${time} timeslot`,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update booking with selected time
    const updatedBooking = {
      ...currentBooking,
      time: time
    };
    setCurrentBooking(updatedBooking);
    
    // Show AI is typing
    setIsTyping(true);
    
    // Update conversation state
    setConversationState(prev => ({
      ...prev,
      waitingForTimeSelection: false,
      lastResponseType: 'booking_confirmation_request'
    }));
    
    // Ask for confirmation before finalizing the booking
    setTimeout(() => {
      setIsTyping(false);
      
      // Format the date string for display
      const dateString = updatedBooking.date ? format(updatedBooking.date, "MMMM d, yyyy") : "selected date";
      
      setMessages(prev => [
        ...prev,
        {
          content: `You're about to book ${updatedBooking.activity.title} for ${dateString} at ${updatedBooking.time}. The price is ${updatedBooking.activity.price}. Would you like to confirm this booking?`,
          sender: 'assistant',
          timestamp: new Date(),
          confirmationActions: true
        }
      ]);
      
      // Set the pending booking for confirmation
      setPendingBooking(updatedBooking.activity);
    }, 1500);
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
    
    // Process user message and generate response
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerCaseMessage = newMessage.toLowerCase();
      const newState = {...conversationState};
      
      // Check for availability or specific slot requests
      if (lowerCaseMessage.includes('availability') || 
          lowerCaseMessage.includes('available') || 
          lowerCaseMessage.includes('check') || 
          lowerCaseMessage.includes('anne frank') ||
          lowerCaseMessage.includes('slot') ||
          lowerCaseMessage.includes('booking') ||
          lowerCaseMessage.includes('time')) {
        
        // Set the selected activity for booking
        const selectedActivity = sampleActivities[0]; // Anne Frank House
        setCurrentBooking({ activity: selectedActivity });
        
        newState.askedAboutAvailability = true;
        newState.waitingForDateSelection = true;
        newState.lastResponseType = 'availability';
        
        const tomorrow = addDays(new Date(), 1);
        const nextWeek = addDays(new Date(), 7);
        
        setMessages(prev => [
          ...prev, 
          {
            content: "I'd be happy to check availability for the Anne Frank House. When would you like to visit? You can select a date from the calendar below:",
            sender: 'assistant' as 'assistant',
            timestamp: new Date(),
            dateSelector: {
              startDate: tomorrow,
              endDate: nextWeek
            }
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
            sender: 'assistant' as 'assistant',
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
      // Canal cruise queries
      else if (lowerCaseMessage.includes('canal') || 
              lowerCaseMessage.includes('cruise') ||
              lowerCaseMessage.includes('boat') ||
              lowerCaseMessage.includes('tour')) {
        
        newState.lastResponseType = 'canal_cruise';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "A canal cruise is one of the best ways to see Amsterdam! Here's a popular evening cruise option:",
            sender: 'assistant',
            timestamp: new Date(),
            options: canalCruiseOptions
          }
        ]);
      }
      // Transport queries
      else if (lowerCaseMessage.includes('airport') || 
              lowerCaseMessage.includes('transfer') ||
              lowerCaseMessage.includes('taxi') ||
              lowerCaseMessage.includes('transportation')) {
        
        newState.lastResponseType = 'transportation';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "I can help arrange transportation for you. Here's a private transfer option from Schiphol Airport:",
            sender: 'assistant',
            timestamp: new Date(),
            options: transportOptions
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
              lowerCaseMessage.includes('rental')) {
        
        newState.lastResponseType = 'transport';
        
        setMessages(prev => [
          ...prev, 
          {
            content: "Amsterdam is very easy to navigate! The best options are:\n\n1. Public Transport - Get an I Amsterdam City Card for unlimited access to public transport plus free entry to many museums.\n\n2. Bicycle Rental - Amsterdam is famous for cycling. Family bikes are available.\n\n3. Canal Boats - A hop-on-hop-off canal cruise is a fun way to see the city.\n\nWould you like me to arrange any of these for you?",
            sender: 'assistant',
            timestamp: new Date()
          }
        ]);
      } 
      // Generic response - vary it based on how many generic responses have been given
      else {
        newState.askedGenericQuestion++;
        
        // Different variations of generic responses to avoid repetition
        let genericResponses = [
          "I'm here to help you plan your trip to Amsterdam! I can recommend activities, restaurants, or transportation options. What specifically are you looking for?",
          "I'd love to assist with your Amsterdam trip! I can suggest museums, family activities, or dining options. What aspect of your trip would you like assistance with?",
          "For your Amsterdam visit, I can help with bookings, recommendations, and local tips. Which part of your trip would you like assistance with today?",
          "How can I make your Amsterdam experience amazing? I can help with attractions, dining, or transportation. What would you like to know about?"
        ];
        
        // Use the counter to cycle through different generic responses
        const responseIndex = (newState.askedGenericQuestion - 1) % genericResponses.length;
        
        setMessages(prev => [
          ...prev, 
          {
            content: genericResponses[responseIndex],
            sender: 'assistant' as 'assistant',
            timestamp: new Date()
          }
        ]);
      }
      
      // Update the conversation state
      setConversationState(newState);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-h-full">
      <div className="p-3 bg-white border-b flex-shrink-0">
        <h2 className="text-base font-semibold text-booking-blue">Trip Assistant</h2>
        <p className="text-xs text-gray-500">Amsterdam · Jul 15-20 · 2 adults</p>
      </div>
      
      <div className="flex-grow overflow-hidden relative">
        <ScrollArea className="h-full w-full absolute inset-0 pb-16">
          <div className="p-3 bg-gray-50 min-h-full">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                content={message.content} 
                sender={message.sender} 
                timestamp={message.timestamp}
                options={message.options}
                onBookActivity={(activity) => {
                  // Start the booking flow when an activity is selected
                  setCurrentBooking({ activity });
                  setConversationState(prev => ({
                    ...prev,
                    waitingForDateSelection: true,
                    lastResponseType: 'activity_selected'
                  }));
                  
                  // Add a message to prompt date selection
                  const tomorrow = addDays(new Date(), 1);
                  const nextWeek = addDays(new Date(), 7);
                  
                  setMessages(prev => [
                    ...prev,
                    {
                      content: `Great choice! When would you like to visit ${activity.title}? Please select a date:`,
                      sender: 'assistant',
                      timestamp: new Date(),
                      dateSelector: {
                        startDate: tomorrow,
                        endDate: nextWeek
                      }
                    }
                  ]);
                }}
                icon={message.icon}
                timeSlots={message.timeSlots}
                onTimeSelect={handleTimeSelect}
                dateSelector={message.dateSelector}
                onDateSelect={handleDateSelect}
                typing={message.typing}
                confirmationActions={message.confirmationActions}
                onConfirm={() => handleConfirmation(true)}
                onCancel={() => handleConfirmation(false)}
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
            
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </ScrollArea>
      </div>
      
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t flex gap-2 absolute bottom-0 left-0 right-0">
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
