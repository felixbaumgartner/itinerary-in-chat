
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import ItineraryPanel from '@/components/ItineraryPanel';
import ChatInterface from '@/components/ChatInterface';
import { ActivityOption } from '@/components/ChatMessage';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const [userContext] = useState({
    name: 'Anishkumar Bhandary',
    destination: 'Amsterdam, Netherlands',
    hotel: 'Hotel Amsterdam Central',
    checkIn: 'Jul 15, 2025',
    checkOut: 'Jul 20, 2025',
    guests: {
      adults: 2,
      children: 2,
    }
  });

  const [bookings, setBookings] = useState<{
    type: string;
    name: string;
    date: string;
    time?: string;
    price: string;
  }[]>([]);

  const handleBookActivity = (activity: ActivityOption) => {
    setBookings([...bookings, {
      type: 'Activity',
      name: activity.title,
      date: 'Jul 16, 2025',
      time: '10:00 AM',
      price: activity.price
    }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavigationBar />
      
      {/* Main content area */}
      <main className="flex-grow bg-gray-100 flex flex-col">
        {/* Background hero image */}
        <div 
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584260968834-311ce8f693d5?q=80&w=2946&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
            <div className="container mx-auto h-full flex flex-col justify-center px-4 md:px-12">
              <h1 className="text-5xl font-bold text-white mb-4">Trip Planner</h1>
              <p className="text-xl text-white/90 mb-8 max-w-md">
                Get personalized recommendations and book activities for your upcoming trip
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop version: Side-by-side layout */}
        <div className="hidden md:flex container mx-auto my-6 px-4 md:px-0">
          <div className="w-1/3 mr-6">
            <ItineraryPanel userContext={userContext} bookings={bookings} />
          </div>
          <div className="w-2/3 bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
            <ChatInterface onBookActivity={handleBookActivity} />
          </div>
        </div>
        
        {/* Mobile version: Floating chat button */}
        <div className="md:hidden block fixed bottom-6 right-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-booking-blue text-white p-4 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] p-0">
              <ChatInterface onBookActivity={handleBookActivity} />
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile Itinerary Panel */}
        <div className="md:hidden container mx-auto my-6 px-4">
          <ItineraryPanel userContext={userContext} bookings={bookings} />
        </div>
      </main>
    </div>
  );
};

export default Index;
