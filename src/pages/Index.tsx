
import React, { useState } from 'react';
import Header from '@/components/Header';
import ItineraryPanel from '@/components/ItineraryPanel';
import ChatInterface from '@/components/ChatInterface';
import { ActivityOption } from '@/components/ChatMessage';

const Index = () => {
  const [userContext] = useState({
    name: 'John Smith',
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
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col lg:flex-row flex-grow overflow-hidden">
        <ItineraryPanel userContext={userContext} bookings={bookings} />
        <div className="flex-grow">
          <ChatInterface onBookActivity={handleBookActivity} />
        </div>
      </main>
    </div>
  );
};

export default Index;
