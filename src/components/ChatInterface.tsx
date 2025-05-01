import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, Calendar, Ticket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, addDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
  // Predefined script messages
  const scriptedMessages: MessageProps[] = [
    {
      content: "Hello! I'm your personal Trip Assistant for your upcoming stay in Amsterdam. How can I help you plan your visit?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ];
  
  const [messages, setMessages] = useState<MessageProps[]>(scriptedMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingDetails | null>(null);
  const [scriptStep, setScriptStep] = useState(0);
  
  // Track conversation state to avoid repetitive responses
  const [conversationState, setConversationState] = useState({
    askedAboutMuseums: false,
    askedAboutAvailability: false,
    waitingForDateSelection: false,
    waitingForTimeSelection: false,
    askedGenericQuestion: 0,
    lastResponseType: '',
    followingScript: false
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
      lastResponseType: 'booking_confirmation'
    }));
    
    // Simulate AI response for booking confirmation
    setTimeout(() => {
      setIsTyping(false);
      
      // Format the date string for display
      const dateString = updatedBooking.date ? format(updatedBooking.date, "MMMM d, yyyy") : "selected date";
      
      // Create a formatted weather info and icon without using Sun component
      const weatherInfo = (
        <div className="flex items-center gap-2 mt-2 text-booking-blue">
          <Calendar className="h-5 w-5" />
          <Ticket className="h-5 w-5" />
          <span className="font-medium">{dateString} · {updatedBooking.time} · 25°C sunny</span>
        </div>
      );
      
      setMessages(prev => [
        ...prev,
        {
          content: `Perfect! I've booked your visit to ${updatedBooking.activity.title} for ${dateString} at ${updatedBooking.time}. You'll receive a confirmation email with your e-tickets shortly. The weather is expected to be 25°C and sunny, so don't forget sunscreen! Is there anything else you'd like help with for your Amsterdam trip?`,
          sender: 'assistant',
          timestamp: new Date(),
          icon: weatherInfo
        }
      ]);
      
      // Book the activity via callback
      if (onBookActivity && updatedBooking.activity) {
        onBookActivity(updatedBooking.activity);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 1500);
  };

  // Function to continue the scripted conversation
  const continueScriptedConversation = (userInput: string) => {
    // Scripted conversation flow
    const scriptedFlow = [
      // Step 1: User asks about first-time activities
      {
        userMessage: "Hi! We arrive the afternoon of July 15. Any must-do activities for first-timers?",
        assistantResponse: {
          content: "Absolutely! Here are three popular options for a 5-day visit:\n\nEvening Canal Cruise – 90-minute boat tour with cheese & wine (€42 pp).\n\nRijksmuseum Fast-Track Ticket – Skip the line, includes audio guide (€25 pp).\n\nCountryside Bike Tour – Half-day ride through windmills & villages (€55 pp).\nWould you like details—or shall I hold seats for one of them?",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
        }
      },
      // Step 2: User wants to book canal cruise
      {
        userMessage: "The canal cruise sounds perfect for our first night. Can you book that?",
        assistantResponse: {
          content: "Sure thing! Quick question: do you prefer the 7 pm sunset sailing or the 9 pm city-lights sailing?",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
        }
      },
      // Step 3: User chooses time
      {
        userMessage: "Let's do 7 pm, two adults.",
        assistantResponse: {
          content: "Got it ✔️\nBooking summary: Evening Canal Cruise, July 15 @ 19:00, 2 adults – €84 total.\nShall I confirm and add it to your trip?",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
          icon: (
            <div className="flex items-center gap-2 mt-2 text-booking-blue">
              <Ticket className="h-5 w-5" />
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Jul 15, 2025 · 19:00 · Evening Canal Cruise</span>
            </div>
          )
        }
      },
      // Step 4: User confirms
      {
        userMessage: "Yes, please confirm.",
        assistantResponse: {
          content: "🎉 All set! Confirmation # CAN-71345. You'll board at Prins Hendrikkade 25—5 min walk from your hotel.\nAnything else I can arrange? Many travelers book airport transfers in advance to avoid taxi queues.",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
        }
      },
      // Step 5: User asks about taxi
      {
        userMessage: "Good idea. What's the cost for a private taxi from Schiphol to our hotel on the 15th at 14:30?",
        assistantResponse: {
          content: "A private sedan for two guests is €48, including meet-&-greet at arrivals and luggage assistance. Book it?",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
        }
      },
      // Step 6: User confirms taxi
      {
        userMessage: "Yes, go ahead.",
        assistantResponse: {
          content: "✅ Done! Transfer booked—confirmation # TX-55812. Driver contact details will appear here 24 hrs before arrival.\nYou now have:\n• Airport Private Taxi – Jul 15 14:30 – €48\n• Evening Canal Cruise – Jul 15 19:00 – €84\nTotal add-ons: €132\n\nNeed restaurant tips, museum tickets, or anything else?",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
          icon: (
            <div className="flex items-center gap-2 mt-2 text-booking-blue">
              <Ticket className="h-5 w-5" />
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Jul 15, 2025 · 14:30 · Airport Transfer</span>
            </div>
          )
        }
      },
      // Step 7: User is done
      {
        userMessage: "That covers it for now—thanks a lot!",
        assistantResponse: {
          content: "My pleasure. Have a fantastic time in Amsterdam! Chat with me anytime if you need more help. 🌷",
          sender: 'assistant' as 'assistant',
          timestamp: new Date(),
        }
      },
    ];

    // If we're following the script
    if (scriptStep < scriptedFlow.length) {
      const currentStep = scriptedFlow[scriptStep];
      
      // Add the scripted user message if this is the first message
      if (scriptStep === 0 || userInput.toLowerCase().includes(currentStep.userMessage.toLowerCase().substring(0, 10))) {
        // Add user message from script
        const userMessage: MessageProps = {
          content: currentStep.userMessage,
          sender: 'user',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        
        // Add assistant response after a delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, currentStep.assistantResponse]);
          
          // If booking steps, trigger confetti effect
          if (scriptStep === 3 || scriptStep === 5) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
            
            // Notify parent component about booking
            if (scriptStep === 3) {
              onBookActivity(canalCruiseOptions[0]);
            } else if (scriptStep === 5) {
              onBookActivity(transportOptions[0]);
            }
          }
          
          // Move to the next step
          setScriptStep(scriptStep + 1);
        }, 1000);
        
        return true;
      }
    }
    
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Try to continue the scripted conversation
    const followingScript = continueScriptedConversation(newMessage);
    
    if (followingScript) {
      setNewMessage('');
      return;
    }
    
    // Add user message
    const userMessage: MessageProps = {
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Special case: If we're waiting for date/time selection, handle through regular chat
    if (conversationState.waitingForDateSelection || conversationState.waitingForTimeSelection) {
      // If the conversation is already in a booking flow, continue with text input
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        setMessages(prev => [
          ...prev,
          {
            content: "I'd recommend using the calendar or time selector above to make your selection. It'll help us book the right slot for you. Would you like to continue with that?",
            sender: 'assistant',
            timestamp: new Date(),
          }
        ]);
      }, 1000);
      
      return;
    }
    
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
      
      <div className="flex-grow overflow-hidden relative h-[calc(100%-110px)]">
        <ScrollArea className="h-full w-full absolute inset-0">
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
      
      <form onSubmit={handleSubmit} className="p-2 bg-white border-t flex gap-2 flex-shrink-0">
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
