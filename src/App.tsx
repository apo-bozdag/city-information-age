import React, { useState } from 'react';
import { Wifi, ThermometerSun, Phone, Zap, Calendar, MapPin, Info } from 'lucide-react';
import { SeasonalInfo } from './components/SeasonalInfo';
import { CreateTripButton } from './components/CreateTripButton';
import { TripModal } from './components/TripModal';
import { TripDetails } from './components/TripDetails';

function CityInfoCard({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function QualityIndex({ name, value, color }: { name: string, value: number, color: string }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-600">{name}</span>
      <div className="flex items-center gap-2">
        <div className={`w-24 h-2 rounded-full ${color}`}>
          <div className={`h-full rounded-full bg-indigo-600`} style={{ width: `${value}%` }}></div>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripDetails, setTripDetails] = useState<null | {
    startDate: string;
    endDate: string;
    city: string;
  }>(null);

  if (tripDetails) {
    return (
      <TripDetails
        {...tripDetails}
        onBack={() => setTripDetails(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1581430872221-d1cfed785922?auto=format&fit=crop&q=80&w=2070"
            alt="Istanbul Cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 p-8">
              <div className="flex items-center gap-2 text-white/90 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Turkey</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">Istanbul</h1>
              <p className="text-white/90 text-lg max-w-2xl">
                Where East meets West, Istanbul is a vibrant metropolis that bridges two continents, 
                blending ancient history with modern culture in a spectacular setting.
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CityInfoCard icon={Wifi} title="WiFi Information">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Public WiFi Coverage</span>
                <span className="font-medium">Good</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Average Speed</span>
                <span className="font-medium">25 Mbps</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Free Hotspots</span>
                <span className="font-medium">500+</span>
              </li>
            </ul>
          </CityInfoCard>

          <CityInfoCard icon={Info} title="Life Quality Indices">
            <div className="space-y-3">
              <QualityIndex name="Safety" value={75} color="bg-gray-200" />
              <QualityIndex name="Healthcare" value={82} color="bg-gray-200" />
              <QualityIndex name="Education" value={88} color="bg-gray-200" />
              <QualityIndex name="Cost of Living" value={65} color="bg-gray-200" />
            </div>
          </CityInfoCard>

          <CityInfoCard icon={Phone} title="Emergency Numbers">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Police</span>
                <span className="font-medium">155</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Ambulance</span>
                <span className="font-medium">112</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Fire Department</span>
                <span className="font-medium">110</span>
              </li>
            </ul>
          </CityInfoCard>

          <CityInfoCard icon={Zap} title="Power Information">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Voltage</span>
                <span className="font-medium">220V</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Frequency</span>
                <span className="font-medium">50Hz</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Plug Types</span>
                <span className="font-medium">C & F</span>
              </li>
            </ul>
          </CityInfoCard>

          <CityInfoCard icon={ThermometerSun} title="Best Time to Visit">
            <SeasonalInfo />
          </CityInfoCard>

          <CityInfoCard icon={Calendar} title="Events & Festivals">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Istanbul Biennial</span>
                <span className="font-medium">September</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Jazz Festival</span>
                <span className="font-medium">July</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Film Festival</span>
                <span className="font-medium">April</span>
              </li>
            </ul>
          </CityInfoCard>
        </div>

        <CreateTripButton onClick={() => setIsModalOpen(true)} />
        
        <TripModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateTrip={(details) => {
            setTripDetails(details);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;