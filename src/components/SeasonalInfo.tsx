import React from 'react';

type Season = {
  name: string;
  months: string;
  description: string;
  temperature?: string;
  crowds?: string;
};

export function SeasonalInfo() {
  const seasons: Season[] = [
    {
      name: 'Peak Season',
      months: 'Jun - Aug',
      description: 'Warm and sunny, ideal for beachgoers and outdoor activities.',
      temperature: '25°C - 35°C',
      crowds: 'High'
    },
    {
      name: 'Shoulder Season',
      months: 'Apr - May, Sep - Oct',
      description: 'Mild weather with fewer crowds, perfect for exploring the city.',
      temperature: '15°C - 25°C',
      crowds: 'Moderate'
    },
    {
      name: 'Off Season',
      months: 'Nov - Mar',
      description: 'Cooler temperatures and possible rain, but lower prices and fewer tourists.',
      temperature: '5°C - 15°C',
      crowds: 'Low'
    }
  ];

  return (
    <div className="space-y-4">
      {seasons.map((season) => (
        <div key={season.name} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-indigo-600">{season.name}</span>
            <span className="text-sm text-gray-500">{season.months}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{season.description}</p>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-500">🌡️ {season.temperature}</span>
            <span className="text-gray-500">👥 {season.crowds}</span>
          </div>
        </div>
      ))}
    </div>
  );
}