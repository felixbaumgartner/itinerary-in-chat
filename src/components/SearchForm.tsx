
import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import ChatInterface from './ChatInterface';

interface SearchFormProps {
  onBookActivity: (activity: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onBookActivity }) => {
  const [destination, setDestination] = useState('Amsterdam');
  const [dateRange, setDateRange] = useState('Jul 15 - Jul 20, 2025');
  const [guests, setGuests] = useState('2 adults · 2 children');
  const [showTrip, setShowTrip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTrip(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mx-auto -mt-12 relative z-10 max-w-6xl">
        <form onSubmit={handleSubmit} className="flex flex-wrap md:flex-nowrap items-center gap-2">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 flex-grow">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <Input 
              type="text" 
              placeholder="Where are you going?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <Input 
              type="text" 
              placeholder="Check-in - Check-out" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <Input 
              type="text" 
              placeholder="2 adults · 0 children" 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <Button type="submit" className="bg-booking-blue hover:bg-booking-navy text-white px-6 py-2">
            Search
          </Button>
        </form>
      </div>

      <Dialog open={showTrip} onOpenChange={setShowTrip}>
        <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0 overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 h-full overflow-auto border-r border-gray-200">
              <div className="p-4 bg-booking-navy text-white">
                <h2 className="text-xl font-bold">Your Trip</h2>
                <p className="text-sm opacity-80">{destination}</p>
              </div>
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border border-gray-200">
                  <div className="font-medium mb-2">Hotel Amsterdam Central</div>
                  <div className="text-sm text-gray-500">Jul 15 - Jul 20, 2025</div>
                  <div className="text-sm text-gray-500">2 adults · 2 children</div>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Chat with our trip assistant to discover and book activities, dining, and transportation!
                </p>
              </div>
            </div>
            <div className="w-2/3 h-full">
              <ChatInterface onBookActivity={onBookActivity} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchForm;
