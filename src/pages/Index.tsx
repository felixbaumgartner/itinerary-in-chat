
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import SearchForm from '@/components/SearchForm';
import { ActivityOption } from '@/components/ChatMessage';
import { MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
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
    
    toast({
      title: "Activity booked!",
      description: `You've successfully booked ${activity.title}`,
    });
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
        
        {/* Mobile version: Floating chat button for already booked trips */}
        <div className="md:hidden block fixed bottom-6 right-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-booking-blue text-white p-4 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] p-0">
              {bookings.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-booking-navy text-white">
                    <h2 className="text-xl font-bold">Trip Assistant</h2>
                    <p className="text-sm opacity-80">How can I help with your trip?</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">
                      Need help planning the rest of your trip? I can suggest activities, restaurants, or transportation options.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <h2 className="text-xl font-bold mb-2">No trips booked yet</h2>
                  <p className="text-gray-600">
                    Search and book a stay to start planning your trip with our AI assistant.
                  </p>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </main>
    </div>
  );
};

export default Index;
