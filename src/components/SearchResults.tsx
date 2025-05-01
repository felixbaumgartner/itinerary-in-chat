
import React, { useState } from 'react';
import { Star, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  price: number;
  features: string[];
  availability: string;
}

interface SearchResultsProps {
  destination: string;
  dateRange: string;
  guests: string;
  onBookProperty: (property: Property) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  destination,
  dateRange,
  guests,
  onBookProperty,
}) => {
  const { toast } = useToast();
  const [filters] = useState({
    budget: 'all',
    rating: 'all',
    propertyType: 'all',
  });

  // Sample properties data
  const properties: Property[] = [
    {
      id: '1',
      name: 'Hotel Amsterdam Central',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop',
      rating: 8.9,
      reviewCount: 1432,
      location: 'Amsterdam City Center',
      description: 'Excellent location - 500m from Dam Square',
      price: 189,
      features: ['Free WiFi', 'Non-smoking rooms', 'Family rooms'],
      availability: 'Only 2 rooms left at this price!'
    },
    {
      id: '2',
      name: 'Canal View Apartments',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop',
      rating: 9.1,
      reviewCount: 876,
      location: 'Amsterdam Canal Belt',
      description: 'Overlooking the beautiful canals',
      price: 210,
      features: ['Kitchen', 'Washing machine', 'Private bathroom'],
      availability: 'Only 1 apartment left!'
    },
    {
      id: '3',
      name: 'CitizenM Amsterdam',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop',
      rating: 8.7,
      reviewCount: 3245,
      location: 'Amsterdam South',
      description: 'Modern design hotel with XL beds',
      price: 149,
      features: ['24-hour front desk', 'Bar', 'Free WiFi'],
      availability: '4 rooms left at this price!'
    },
    {
      id: '4',
      name: 'The Hoxton Amsterdam',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2940&auto=format&fit=crop',
      rating: 9.2,
      reviewCount: 1120,
      location: 'Amsterdam Canal Belt',
      description: 'Stylish rooms in a historic building',
      price: 230,
      features: ['Restaurant', 'Room service', 'Facilities for disabled guests'],
      availability: 'Only 3 rooms left at this price!'
    },
    {
      id: '5',
      name: 'NH Collection Amsterdam',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop',
      rating: 8.8,
      reviewCount: 2198,
      location: 'Amsterdam City Center',
      description: 'Luxury hotel with city views',
      price: 205,
      features: ['Fitness center', 'Restaurant', 'Room service'],
      availability: '5 rooms left at this price!'
    }
  ];

  const handleBookNow = (property: Property) => {
    onBookProperty(property);
    toast({
      title: "Hotel booked!",
      description: `You've successfully booked ${property.name} for ${dateRange}`,
    });
  };

  return (
    <div className="container mx-auto pt-6 pb-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Filter by:</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Your budget (per night)</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="budget" className="mr-2" defaultChecked />
                    <span>All</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="budget" className="mr-2" />
                    <span>$0 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="budget" className="mr-2" />
                    <span>$100 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="budget" className="mr-2" />
                    <span>$200+</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Rating score</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="rating" className="mr-2" defaultChecked />
                    <span>All</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>8+</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>9+</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Property type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="propertyType" className="mr-2" defaultChecked />
                    <span>All</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="propertyType" className="mr-2" />
                    <span>Hotels</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="propertyType" className="mr-2" />
                    <span>Apartments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="propertyType" className="mr-2" />
                    <span>Hostels</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results list */}
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-bold text-xl">{destination}: {properties.length} properties found</h1>
            <div className="text-sm text-gray-600">
              <span>Sort by: </span>
              <select className="border-0 bg-transparent font-medium text-booking-blue">
                <option>Our top picks</option>
                <option>Lowest price first</option>
                <option>Best reviewed first</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-start justify-between md:justify-start">
                          <h2 className="text-lg font-bold text-booking-blue">{property.name}</h2>
                          <div className="flex md:ml-3">
                            {Array(Math.round(property.rating / 2)).fill(0).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">{property.location}</span>
                        </div>
                        <p className="mt-2 text-sm">{property.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-2">
                          <div className="bg-booking-blue text-white px-2 py-1 rounded font-bold mr-2">
                            {property.rating}
                          </div>
                          <div className="text-sm text-gray-600">
                            {property.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-1">
                      {property.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50 text-booking-blue">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end">
                      <div className="text-red-500 text-sm font-medium">
                        {property.availability}
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="text-2xl font-bold text-gray-900">
                          €{property.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          per night
                        </div>
                        <Button 
                          onClick={() => handleBookNow(property)}
                          className="mt-2 bg-booking-blue hover:bg-booking-navy text-white"
                        >
                          Book now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
