import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SearchResults from './SearchResults';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from './ChatInterface';
import Confetti from './Confetti';

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
  const [showConfetti, setShowConfetti] = useState(false);

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
    
    // Show concierge and confetti after a short delay
    setTimeout(() => {
      setShowConcierge(true);
      setShowConfetti(true);
    }, 1500);
  };

  // Reset confetti when dialog closes
  const handleDialogOpenChange = (open: boolean) => {
    setShowConcierge(open);
    if (!open) {
      setShowConfetti(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 lg:px-12 relative">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-md overflow-hidden shadow-lg border border-booking-yellow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Destination input */}
            <div className="flex-1 flex items-center relative p-3 md:p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex flex-col flex-1">
                <label htmlFor="destination" className="text-xs text-gray-500 font-medium">Where are you going?</label>
                <Input 
                  id="destination"
                  type="text" 
                  placeholder="Where are you going?" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-0 p-0 h-auto focus:outline-none focus:ring-0 text-base font-normal"
                />
              </div>
            </div>
            
            {/* Date range input */}
            <div className="flex-1 flex items-center relative p-3 md:p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex flex-col flex-1">
                <label htmlFor="dates" className="text-xs text-gray-500 font-medium">Check-in - Check-out</label>
                <Input 
                  id="dates"
                  type="text" 
                  placeholder="Add dates" 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-0 p-0 h-auto focus:outline-none focus:ring-0 text-base font-normal"
                />
              </div>
            </div>
            
            {/* Guests input */}
            <div className="flex-1 flex items-center relative p-3 md:p-4">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex flex-col flex-1">
                <label htmlFor="guests" className="text-xs text-gray-500 font-medium">Who's coming?</label>
                <Input 
                  id="guests"
                  type="text" 
                  placeholder="Add guests" 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="border-0 p-0 h-auto focus:outline-none focus:ring-0 text-base font-normal"
                />
              </div>
            </div>
            
            {/* Search button - positioned properly in mobile and desktop */}
            <div className="p-3 md:p-0">
              <Button 
                type="submit" 
                className="w-full md:h-full md:rounded-none md:rounded-r-md bg-booking-yellow hover:bg-booking-yellow/90 text-black font-medium px-6"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center">
            <input type="checkbox" id="entire-home" className="mr-2 h-4 w-4" />
            <label htmlFor="entire-home" className="text-white text-sm">I'm looking for an entire home or apartment</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="flights" className="mr-2 h-4 w-4" />
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

      {/* Trip Assistant Dialog - smaller and positioned in lower right */}
      <Dialog open={showConcierge} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-[400px] w-[95vw] h-[500px] max-h-[80vh] p-0 overflow-hidden fixed bottom-6 right-6 sm:bottom-8 sm:right-8 shadow-2xl rounded-lg">
          <ChatInterface onBookActivity={onBookActivity} />
        </DialogContent>
      </Dialog>

      {/* Confetti component */}
      <Confetti active={showConfetti} duration={5000} />
    </>
  );
};

export default SearchForm;
