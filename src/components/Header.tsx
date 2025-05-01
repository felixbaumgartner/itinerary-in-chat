
import React from 'react';
import { User, HelpCircle, MapPin, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-booking-blue text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl">Booking.com</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center px-3 py-1 rounded border border-white/30">
          <span className="font-medium">EUR</span>
        </div>
        
        <Button variant="ghost" className="p-1 text-white hover:bg-booking-navy">
          <Globe className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" className="p-1 text-white hover:bg-booking-navy">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" className="text-white hover:bg-booking-navy">
          <span>List your property</span>
        </Button>
        
        <div className="flex items-center bg-booking-yellow text-booking-darkGray p-1 rounded-full">
          <div className="flex items-center justify-center bg-[#F5AD45] rounded-full h-8 w-8 font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
