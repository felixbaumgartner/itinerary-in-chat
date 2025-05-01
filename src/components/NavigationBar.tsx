
import React from 'react';
import { Hotel, Plane, Car, MapPin, Truck } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="bg-booking-blue text-white py-3 border-t border-white/20">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <a href="#" className="flex flex-col items-center px-6 py-2 rounded-full bg-white/20 text-white">
          <Hotel className="h-5 w-5 mb-1" />
          <span className="text-sm">Stays</span>
        </a>
        <a href="#" className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white">
          <Plane className="h-5 w-5 mb-1" />
          <span className="text-sm">Flights</span>
        </a>
        <a href="#" className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white">
          <div className="flex items-center">
            <Plane className="h-5 w-5 mb-1" />
            <span className="mx-1 mb-1">+</span>
            <Hotel className="h-5 w-5 mb-1" />
          </div>
          <span className="text-sm">Flight + Hotel</span>
        </a>
        <a href="#" className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white">
          <Car className="h-5 w-5 mb-1" />
          <span className="text-sm">Car rentals</span>
        </a>
        <a href="#" className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white">
          <MapPin className="h-5 w-5 mb-1" />
          <span className="text-sm">Attractions</span>
        </a>
        <a href="#" className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white">
          <Truck className="h-5 w-5 mb-1" />
          <span className="text-sm">Airport taxis</span>
        </a>
      </div>
    </nav>
  );
};

export default NavigationBar;
