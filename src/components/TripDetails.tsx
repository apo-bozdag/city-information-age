import React, { useState } from 'react';
import { MapPin, Clock, Calendar, User, History, Navigation } from 'lucide-react';

type POI = {
  id: number;
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
  image: string;
};

type TripDetailsProps = {
  startDate: string;
  endDate: string;
  city: string;
  onBack: () => void;
};

export function TripDetails({ startDate, endDate, city, onBack }: TripDetailsProps) {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  const pois: POI[] = [
    {
      id: 1,
      name: "Hagia Sophia",
      description: "Ancient church turned mosque, architectural marvel that has stood for centuries as a testament to Istanbul's rich history and cultural heritage.",
      type: "Historical",
      lat: 41.008587,
      lng: 28.980170,
      image: "https://images.unsplash.com/photo-1614815407090-c2ffb7cf1f1c?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      name: "Blue Mosque",
      description: "Iconic mosque with six minarets, known for its stunning blue tile interior and cascading domes.",
      type: "Religious",
      lat: 41.005270,
      lng: 28.976960,
      image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 3,
      name: "Grand Bazaar",
      description: "One of the world's oldest and largest covered markets, featuring thousands of shops selling everything from spices to jewelry.",
      type: "Shopping",
      lat: 41.010700,
      lng: 28.968050,
      image: "https://images.unsplash.com/photo-1673697160775-96f3b7abd92c?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const MapPlaceholder = () => (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${
          selectedPOI ? `pin-l+ff0000(${selectedPOI.lng},${selectedPOI.lat})` : ''
        }/${city === 'Istanbul' ? '28.9784,41.0082,12' : '28.9784,41.0082,12'}/800x600@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V4bHVoMXgwMDRpMnJvN2V4Z2t4Z2x0In0.example')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <div className="absolute inset-0 flex items-center justify-center bg-black/5">
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <p className="text-gray-600 text-sm">
            Interactive map would be integrated here with Mapbox or Google Maps
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          ← Back to City Info
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Trip to {city}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Points of Interest */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Points of Interest</h2>
            <div className="grid gap-4">
              {pois.map((poi) => (
                <div
                  key={poi.id}
                  className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-all cursor-pointer
                    ${selectedPOI?.id === poi.id ? 'ring-2 ring-indigo-500' : ''}`}
                  onClick={() => setSelectedPOI(poi)}
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={poi.image}
                        alt={poi.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{poi.name}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{poi.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          {poi.type}
                        </span>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="h-[600px]">
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}