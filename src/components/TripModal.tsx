import React, { useState } from 'react';
import { X, Calendar, MapPin, User, History, ArrowRight, ArrowLeft } from 'lucide-react';

type TripDetails = {
  startDate: string;
  endDate: string;
  city: string;
  travelHistory: {
    firstTime: boolean;
    previousVisits: number;
  };
  travelCompanions: {
    isSolo: boolean;
    companionCount: number;
  };
};

const steps = ['Travel Dates', 'Travel History', 'Companions', 'Review'];

export function TripModal({ 
  isOpen, 
  onClose,
  onCreateTrip 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onCreateTrip: (details: TripDetails) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TripDetails>({
    startDate: '',
    endDate: '',
    city: 'Istanbul',
    travelHistory: {
      firstTime: true,
      previousVisits: 0
    },
    travelCompanions: {
      isSolo: true,
      companionCount: 0
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      onCreateTrip(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
            ${index === currentStep ? 'bg-indigo-600 text-white' : 
              index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-1 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                City
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Istanbul">Istanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="Izmir">Izmir</option>
                <option value="Antalya">Antalya</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Have you visited {formData.city} before?</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    travelHistory: { ...formData.travelHistory, firstTime: true, previousVisits: 0 }
                  })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    formData.travelHistory.firstTime
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  First Time
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    travelHistory: { ...formData.travelHistory, firstTime: false }
                  })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    !formData.travelHistory.firstTime
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  Returning
                </button>
              </div>
            </div>
            
            {!formData.travelHistory.firstTime && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many times have you visited before?
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.travelHistory.previousVisits}
                  onChange={(e) => setFormData({
                    ...formData,
                    travelHistory: { ...formData.travelHistory, previousVisits: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Are you traveling solo?</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    travelCompanions: { isSolo: true, companionCount: 0 }
                  })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    formData.travelCompanions.isSolo
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  Solo Travel
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    travelCompanions: { isSolo: false, companionCount: 1 }
                  })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    !formData.travelCompanions.isSolo
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  With Others
                </button>
              </div>
            </div>
            
            {!formData.travelCompanions.isSolo && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of companions
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.travelCompanions.companionCount}
                  onChange={(e) => setFormData({
                    ...formData,
                    travelCompanions: { ...formData.travelCompanions, companionCount: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Trip Summary</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Destination:</dt>
                  <dd className="font-medium">{formData.city}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dates:</dt>
                  <dd className="font-medium">
                    {new Date(formData.startDate).toLocaleDateString()} - {new Date(formData.endDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Experience:</dt>
                  <dd className="font-medium">
                    {formData.travelHistory.firstTime ? 'First Time Visitor' : `${formData.travelHistory.previousVisits} Previous Visits`}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Travel Group:</dt>
                  <dd className="font-medium">
                    {formData.travelCompanions.isSolo 
                      ? 'Solo Traveler' 
                      : `Group of ${formData.travelCompanions.companionCount + 1}`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Your Trip</h2>
        
        {renderStepIndicator()}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStepContent()}
          
          <div className="flex gap-3 justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg
                  hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg
                hover:bg-indigo-700 transition-colors ml-auto"
            >
              {currentStep === steps.length - 1 ? 'Create Trip' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}