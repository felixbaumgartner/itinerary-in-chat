
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface MessageProps {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: ActivityOption[];
  typing?: boolean;
}

const ChatMessage: React.FC<MessageProps> = ({
  content,
  sender,
  timestamp,
  options,
  typing = false
}) => {
  const isUser = sender === 'user';
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%]",
        !isUser && options && "w-full"
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
            <div className="whitespace-pre-line">{content}</div>
          )}
        </div>

        {options && options.length > 0 && (
          <div className="mt-3 space-y-3">
            {options.map((option) => (
              <Card key={option.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  <div 
                    className="w-full sm:w-1/3 h-32 sm:h-auto bg-cover bg-center" 
                    style={{ backgroundImage: `url(${option.image})` }}
                  />
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-booking-blue">{option.title}</h3>
                      <Badge className="bg-booking-yellow text-booking-darkGray font-medium ml-2">
                        {option.rating}/10 ({option.reviewCount})
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 line-clamp-2">{option.description}</p>
                    <div className="mt-2 font-bold text-booking-green">{option.price}</div>
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
