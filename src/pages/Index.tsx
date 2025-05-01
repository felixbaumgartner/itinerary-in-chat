
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import SearchForm from '@/components/SearchForm';
import { ActivityOption } from '@/components/ChatMessage';
import { MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";

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
      <main className="flex-grow bg-[#003580] flex flex-col">
        {/* Hero section */}
        <div 
          className="w-full bg-cover bg-center pt-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2940&auto=format&fit=crop')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "500px"
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 pt-8 pb-16">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">Unpack the feeling of home</h1>
              <p className="text-xl text-white/90 mb-8">
                Choose from houses, chalets, villas and more
              </p>
              <Button className="bg-[#0071c2] hover:bg-[#00487a] text-white py-2 px-8 text-lg font-medium rounded-md mb-8">
                Book yours
              </Button>
            </div>
          </div>
          
          {/* Search form - positioned at the bottom of hero */}
          <div className="container mx-auto -mt-16 relative z-10">
            <SearchForm onBookActivity={handleBookActivity} />
          </div>
        </div>
        
        {/* Recent searches section */}
        <div className="bg-white py-6 flex-grow">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-6">Your recent searches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex">
                <img 
                  src="https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=2831&auto=format&fit=crop" 
                  alt="Bandung" 
                  className="w-1/3 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">Bandung</h3>
                  <p className="text-sm text-gray-600">3 May–4 May, 2 people</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex">
                <img 
                  src="https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2846&auto=format&fit=crop" 
                  alt="Bandar Seri Begawan" 
                  className="w-1/3 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">Bandar Seri Begawan</h3>
                  <p className="text-sm text-gray-600">20 May–21 May, 2 people</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile version: Floating chat button for already booked trips */}
        <div className="md:hidden block fixed bottom-6 right-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-[#003580] text-white p-4 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] p-0">
              {bookings.length > 0 ? (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-[#003580] text-white">
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
