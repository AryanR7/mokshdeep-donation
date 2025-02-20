import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Flame } from 'lucide-react';
import { DiyaForm } from './components/DiyaForm';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Navbar } from './components/Navbar';

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Container with text overlay on image */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-0 py-3">
        
        {/* Image Section with Overlay */}
        <div className="relative w-full h-[550px] rounded-lg overflow-hidden">
          <img 
            src="/src/Images/Haridwar.webp" 
            alt="Haridwar Ghat" 
            className="w-full h-full object-cover opacity-90"
          />

          {/* Overlay for better readability */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black bg-opacity-50 rounded-lg">
            <Flame className="w-16 h-16 text-orange-400 mb-4" />
            
            <h1 className="text-white text-4xl font-bold sm:text-5xl md:text-6xl">
              Mokshdeep
            </h1>
            
            <h2 className="text-orange-300 text-xl sm:text-2xl mt-3">
              A Light for Your Loved Ones, A Blessing for the Soul
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
              Offer a sacred diya in the holy waters during the Maha Kumbh Mela. Your offering will be captured in a personalized video, connecting you spiritually across distances or donate anonymously.
            </p>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Flame className="w-5 h-5 mr-2" />
                Proceed
              </button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mt-12 flex justify-center">
            <DiyaForm />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}

export default App;
