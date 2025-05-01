
import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SearchResults from './SearchResults';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from './ChatInterface';

interface SearchFormProps {
  onBookActivity: (activity: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onBookActivity }) => {
  const { toast } = useToast();
  const [destination, setDestination] = useState('Amsterdam');
  const [dateRange, setDateRange] = useState('Jul 15 - Jul 20, 2025');
  const [guests, setGuests] = useState('2 adults · 0 children · 1 room');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [bookedProperty, setBookedProperty] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(true);
  };

  const handleBookProperty = (property: any) => {
    setBookedProperty(property);
    setShowSearchResults(false);
    
    // Show success toast
    toast({
      title: "Booking confirmed!",
      description: "Your stay at " + property.name + " is confirmed.",
    });
    
    // Show concierge after a short delay
    setTimeout(() => {
      setShowConcierge(true);
    }, 1500);
  };

  return (
    <>
      <div className="container mx-auto px-6 lg:px-12 relative">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-2">
          <div className="flex-1 bg-white border-2 border-yellow-400 rounded-md flex items-center relative pl-3 py-2">
            <Search className="h-5 w-5 text-gray-400 absolute left-3" />
            <Input 
              type="text" 
              placeholder="Where are you going?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-0 pl-6 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="bg-white border-2 border-yellow-400 rounded-md flex items-center relative py-2 pl-3">
            <Calendar className="h-5 w-5 text-gray-400 absolute left-3" />
            <Input 
              type="text" 
              placeholder="Check-in - Check-out" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border-0 pl-6 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="bg-white border-2 border-yellow-400 rounded-md flex items-center relative py-2 pl-3">
            <User className="h-5 w-5 text-gray-400 absolute left-3" />
            <Input 
              type="text" 
              placeholder="2 adults · 0 children" 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border-0 pl-6 p-0 focus:outline-none focus:ring-0"
            />
          </div>
          
          <Button type="submit" className="bg-[#0071c2] hover:bg-[#00487a] text-white py-2 px-8 text-lg font-medium rounded-md">
            Search
          </Button>
        </form>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center">
            <input type="checkbox" id="entire-home" className="mr-2" />
            <label htmlFor="entire-home" className="text-white text-sm">I'm looking for an entire home or apartment</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="flights" className="mr-2" />
            <label htmlFor="flights" className="text-white text-sm">I'm looking for flights</label>
          </div>
        </div>
      </div>

      {/* Search Results Dialog */}
      <Dialog open={showSearchResults} onOpenChange={setShowSearchResults}>
        <DialogContent className="sm:max-w-[90vw] h-[90vh] p-4 overflow-auto">
          <SearchResults 
            destination={destination}
            dateRange={dateRange}
            guests={guests}
            onBookProperty={handleBookProperty}
          />
        </DialogContent>
      </Dialog>

      {/* Concierge Chat Dialog - shown after booking */}
      <Dialog open={showConcierge} onOpenChange={setShowConcierge}>
        <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0 overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 h-full overflow-auto border-r border-gray-200">
              <div className="p-4 bg-[#003580] text-white">
                <h2 className="text-xl font-bold">Your Trip</h2>
                <p className="text-sm opacity-80">{destination}</p>
              </div>
              <div className="p-4">
                {bookedProperty && (
                  <div className="bg-white rounded-lg shadow-sm p-3 mb-4 border border-gray-200">
                    <div className="font-medium mb-2">{bookedProperty.name}</div>
                    <div className="text-sm text-gray-500">{dateRange}</div>
                    <div className="text-sm text-gray-500">{guests}</div>
                  </div>
                )}
                <p className="text-sm text-gray-500 font-medium mb-2">
                  Need help planning the rest of your {destination} trip? Chat with our AI Concierge!
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
