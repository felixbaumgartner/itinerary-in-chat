
import React from 'react';
import { HelpCircle, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-[#003580] text-white py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl md:text-3xl">Booking.com</h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center px-3 py-1 rounded border border-white/30">
          <span className="font-medium">EUR</span>
        </div>
        
        <button className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-white/30">
          <img src="/lovable-uploads/36891a7c-1b44-4f00-8605-eb26cb35565d.png" alt="Flag" className="w-full h-full object-cover" />
        </button>
        
        <Button variant="ghost" className="p-1 text-white hover:bg-[#00224f]">
          <HelpCircle className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" className="hidden md:flex text-white hover:bg-[#00224f]">
          <span>List your property</span>
        </Button>
        
        <div className="flex items-center bg-[#ffb700] text-[#262626] p-1 rounded-full">
          <div className="flex items-center justify-center bg-[#F5AD45] rounded-full h-8 w-8 font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
