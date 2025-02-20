import React from 'react';
import { Scroll } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Scroll className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read these terms carefully before using our Diya offering service
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Service Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Mokshdeep provides a service that allows users to request the offering of diyas during the Maha Kumbh Mela. 
                For Deep Daan offerings, we will send you a WhatsApp video showing the diya being offered in your name.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Payment and Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                The service fee is non-refundable once payment is made. By proceeding with the payment, you acknowledge 
                and agree that you will not be eligible for a refund under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Provide accurate and complete information when submitting requests</li>
                <li>Maintain the sanctity of the religious ceremony</li>
                <li>Use the service only for legitimate spiritual purposes</li>
                <li>Not misuse the service for any unauthorized or illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Video Documentation</h2>
              <p className="text-gray-600 leading-relaxed">
                For Deep Daan offerings, we will send a WhatsApp video of your diya offering within 24 hours of the ceremony. 
                While we strive to capture every offering, factors such as weather conditions may affect video quality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We respect your privacy and handle all personal information in accordance with applicable laws. 
                Your contact information will only be used for service-related communications and sending the WhatsApp video 
                of your diya offering.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are available 24/7 during the Maha Kumbh Mela 2025. However, we may experience delays 
                during peak times or due to unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                For any questions regarding these terms, please contact us at Mokshdeep007@gmail.com
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: February 19, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}