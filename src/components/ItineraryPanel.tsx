
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Hotel, User } from 'lucide-react';

interface ItineraryPanelProps {
  userContext: {
    name: string;
    destination: string;
    hotel: string;
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      children: number;
    };
  };
  bookings: {
    type: string;
    name: string;
    date: string;
    time?: string;
    price: string;
  }[];
}

const ItineraryPanel: React.FC<ItineraryPanelProps> = ({ userContext, bookings }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-booking-navy text-white">
        <h2 className="text-xl font-bold">Your Trip</h2>
        <p className="text-sm opacity-80">{userContext.destination}</p>
      </div>

      <div className="p-4">
        <Card className="mb-4 border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Hotel className="h-5 w-5 mr-2 text-booking-blue" />
              Hotel Booking
            </CardTitle>
            <CardDescription>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" /> 
                {userContext.destination}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div className="font-medium">{userContext.hotel}</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" /> 
                {userContext.checkIn} - {userContext.checkOut}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-500" /> 
                {userContext.guests.adults} adults, {userContext.guests.children} children
              </div>
            </div>
          </CardContent>
        </Card>

        {bookings.length > 0 && (
          <div>
            <h3 className="font-medium text-sm text-gray-500 uppercase mb-2">Your Add-ons</h3>
            {bookings.map((booking, index) => (
              <Card key={index} className="mb-3 border border-gray-200">
                <CardHeader className="py-2 px-3">
                  <CardTitle className="text-sm font-medium">{booking.type}</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <div className="text-sm space-y-1">
                    <div className="font-medium">{booking.name}</div>
                    <div className="text-xs text-gray-500">
                      {booking.date} {booking.time && `• ${booking.time}`}
                    </div>
                    <div className="font-medium text-booking-green">{booking.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPanel;
