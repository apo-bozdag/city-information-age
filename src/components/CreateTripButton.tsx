import React from 'react';
import { Plane } from 'lucide-react';

export function CreateTripButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-3 rounded-full 
        flex items-center gap-2 shadow-lg hover:bg-indigo-700 transform hover:scale-105 
        transition-all duration-200 group"
    >
      <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      <span className="font-medium">Plan Your Trip</span>
    </button>
  );
}