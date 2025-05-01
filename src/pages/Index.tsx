
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import ItineraryPanel from '@/components/ItineraryPanel';
import ChatInterface from '@/components/ChatInterface';
import SearchForm from '@/components/SearchForm';
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
          className="w-full h-80 bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584260968834-311ce8f693d5?q=80&w=2946&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
            <div className="container mx-auto h-full flex flex-col justify-center px-4 md:px-12">
              <h1 className="text-5xl font-bold text-white mb-4">Find your next stay</h1>
              <p className="text-xl text-white/90 mb-8 max-w-md">
                Search deals on hotels, homes, and much more...
              </p>
            </div>
          </div>
        </div>
        
        {/* Search form */}
        <div className="container mx-auto px-4">
          <SearchForm onBookActivity={handleBookActivity} />
        </div>
        
        {/* Content section */}
        <div className="container mx-auto my-12 px-4">
          <h2 className="text-2xl font-bold mb-6">Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop" 
                alt="Special offer" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Early summer deals</h3>
                <p className="text-gray-600">Save 15% or more when you book and stay before August</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop" 
                alt="Special offer" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Fly away to your dream holiday</h3>
                <p className="text-gray-600">Get inspired – compare and book flights with flexibility</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop" 
                alt="Special offer" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Escape for a while</h3>
                <p className="text-gray-600">Enjoy the freedom of a monthly stay on Booking.com</p>
              </div>
            </div>
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
      </main>
    </div>
  );
};

export default Index;
