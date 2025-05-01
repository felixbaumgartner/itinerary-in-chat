
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Check, Calendar as CalendarIcon, Clock, Sun } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number;
}

interface DateSelector {
  startDate: Date;
  endDate: Date;
}

export interface MessageProps {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: ActivityOption[];
  typing?: boolean;
  icon?: React.ReactNode;
  onBookActivity?: (activity: ActivityOption) => void;
  dateSelector?: DateSelector;
  onDateSelect?: (date: Date | undefined) => void;
  timeSlots?: string[];
  onTimeSelect?: (time: string) => void;
}

const ChatMessage: React.FC<MessageProps> = ({
  content,
  sender,
  timestamp,
  options,
  typing = false,
  onBookActivity,
  icon,
  dateSelector,
  onDateSelect,
  timeSlots,
  onTimeSelect
}) => {
  const isUser = sender === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleBookActivity = (activity: ActivityOption) => {
    if (onBookActivity) {
      onBookActivity(activity);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%]",
        !isUser && (options || dateSelector || timeSlots) && "w-full"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl",
          isUser ? "bg-booking-blue text-white rounded-br-none" : "bg-booking-lightBlue text-gray-800 rounded-bl-none"
        )}>
          {typing ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-300"></div>
            </div>
          ) : (
            <>
              <div className="whitespace-pre-line">{content}</div>
              {icon && <div className="mt-2">{icon}</div>}
            </>
          )}
        </div>

        {/* Date Selector */}
        {dateSelector && onDateSelect && (
          <div className="mt-3 bg-white p-4 rounded-md shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <CalendarIcon className="mr-2 h-5 w-5 text-booking-blue" />
              <h4 className="font-medium text-booking-blue">Select a date for your visit</h4>
            </div>
            <Calendar
              mode="single"
              onSelect={onDateSelect}
              disabled={(date) => {
                // Disable dates before today or after the end date
                return date < new Date() || (dateSelector.endDate ? date > dateSelector.endDate : false);
              }}
              initialFocus
            />
          </div>
        )}

        {/* Time Slots */}
        {timeSlots && timeSlots.length > 0 && (
          <div className="mt-3 bg-white p-4 rounded-md shadow-sm border border-gray-100">
            <h4 className="font-medium text-booking-blue mb-3">Available Time Slots</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm text-booking-blue hover:bg-booking-lightBlue hover:text-booking-navy"
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Activity Options */}
        {options && options.length > 0 && (
          <div className="mt-3 space-y-3">
            {options.map((option) => (
              <Card key={option.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div 
                    className="w-full sm:w-1/3 h-32 sm:h-auto bg-cover bg-center" 
                    style={{ backgroundImage: `url(${option.image})` }}
                  />
                  <CardContent className="p-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-booking-blue">{option.title}</h3>
                      <Badge className="bg-booking-yellow text-booking-darkGray font-medium ml-2">
                        {option.rating}/10 ({option.reviewCount})
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 line-clamp-2">{option.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold text-booking-green">{option.price}</div>
                      <Button 
                        size="sm" 
                        className="bg-booking-blue hover:bg-booking-navy text-white"
                        onClick={() => handleBookActivity(option)}
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Book now
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className={cn(
          "text-xs text-gray-500 mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
