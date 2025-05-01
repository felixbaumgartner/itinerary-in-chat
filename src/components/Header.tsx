
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-booking-blue text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-2xl">Booking.com</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:bg-booking-navy">
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
