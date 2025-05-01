
import React from 'react';
import { Hotel, Plane, Car, MapPin, Building } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="bg-[#003580] text-white py-1 pb-3">
      <div className="container mx-auto flex justify-start overflow-x-auto px-6 lg:px-12 space-x-1">
        <a href="#" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00224f] text-white whitespace-nowrap">
          <Hotel className="h-5 w-5" />
          <span className="text-sm">Stays</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-5 py-2 hover:bg-[#00224f]/50 rounded-full text-white/90 hover:text-white whitespace-nowrap">
          <Plane className="h-5 w-5" />
          <span className="text-sm">Flights</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-5 py-2 hover:bg-[#00224f]/50 rounded-full text-white/90 hover:text-white whitespace-nowrap">
          <div className="flex items-center">
            <Plane className="h-5 w-5" />
            <span className="mx-1">+</span>
            <Hotel className="h-5 w-5" />
          </div>
          <span className="text-sm">Flight + Hotel</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-5 py-2 hover:bg-[#00224f]/50 rounded-full text-white/90 hover:text-white whitespace-nowrap">
          <Car className="h-5 w-5" />
          <span className="text-sm">Car rentals</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-5 py-2 hover:bg-[#00224f]/50 rounded-full text-white/90 hover:text-white whitespace-nowrap">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">Attractions</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-5 py-2 hover:bg-[#00224f]/50 rounded-full text-white/90 hover:text-white whitespace-nowrap">
          <Building className="h-5 w-5" />
          <span className="text-sm">Airport taxis</span>
        </a>
      </div>
    </nav>
  );
};

export default NavigationBar;
