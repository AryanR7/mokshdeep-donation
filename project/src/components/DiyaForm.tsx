import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Flame, Heart } from 'lucide-react';
import { QRCode } from './QRCode';

interface FormData {
  name: string;
  phone: string;
  recipientName: string;
  relationship: string;
  transactionId: string;
}

// ✅ Fixing relationships type issue
const relationships: string[] = [
  'Myself',
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Other'
];

export function DiyaForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    recipientName: '',
    relationship: '',
    transactionId: ''
  });

  const [showQR, setShowQR] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [paymentType, setPaymentType] = useState<'deep' | 'gupt' | null>(null);


  const validateForm = (): boolean => {
    let newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
    if (!formData.relationship.trim()) newErrors.relationship = 'Relationship selection is required';
    if (paymentStarted && !formData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentClick = (type: 'deep' | 'gupt') => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields before proceeding.');
      return;
    }
  
    setPaymentType(type); // ✅ Set the payment type (Deep or Gupt)
    setPaymentStarted(true); // ✅ Ensure "Payment Done" & "Cancel" buttons appear
    setShowQR(true); // ✅ Open QR Code
  };
  
  
  

  const [showThankYou, setShowThankYou] = useState(false); // ✅ State for popup

  const handlePaymentDone = async () => {
    // ✅ Ensure Transaction ID is entered before proceeding
    if (!formData.transactionId.trim()) {
      toast.error('Please enter the Transaction ID before proceeding.');
      return;
    }
  
    console.log("Submitting to Supabase:", formData); // ✅ Log form data before sending
  
    try {
      const { data, error } = await supabase
        .from('diya_requests')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            recipient_name: formData.recipientName,
            relationship: formData.relationship,
            transaction_id: formData.transactionId, // ✅ Store Transaction ID
            payment_status: 'completed',
            video_url: null,
            whatsapp_sent: false
          }
        ]);
  
      console.log("Supabase Response:", data, error); // ✅ Log Supabase response
  
      if (error) {
        toast.error('Failed to save payment details. Check Supabase logs.');
        console.error('Supabase Insert Error:', error);
        return;
      }
  
      toast.success('Payment confirmed! Data stored successfully.');
  
      // ✅ Show Thank You Popup
      setShowThankYou(true);
  
      // ✅ Wait 5 seconds, then refresh the page
      setTimeout(() => {
        setShowThankYou(false);
        window.location.reload();
      }, 5000);
  
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Unexpected Error:', error);
    }
  };
  



  const handleCancel = () => {
    setShowQR(false);
    setPaymentStarted(false);
    toast.error('Payment canceled. Refreshing page...');
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 w-full max-w-md">
      {/* Form Fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Your Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
          Name of the Person You Want to Daan For
        </label>
        <input
          type="text"
          id="recipientName"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          value={formData.recipientName}
          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
        />
        {errors.recipientName && <p className="text-red-500 text-sm">{errors.recipientName}</p>}
      </div>

      <div>
        <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
          Relationship with the Person
        </label>
        <select
          id="relationship"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          value={formData.relationship}
          onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
        >
          <option value="">Select Relationship</option>
          {relationships.map((rel) => (
            <option key={rel} value={rel}>{rel}</option>
          ))}
        </select>
        {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship}</p>}
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handlePaymentClick('deep')}
          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
        >
          <Flame className="w-5 h-5 mr-2" />
          Deep Daan (₹179)
        </button>
        
        <button
          type="button"
          onClick={() => handlePaymentClick('gupt')}
          className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <Heart className="w-5 h-5 mr-2" />
          Gupt Daan
        </button>
      </div>

      {/* ✅ QR Code Section */}
      {showQR && paymentType && (
  <div className="mt-6 flex flex-col items-center">
    <QRCode 
      upiId="9911825047@ptsbi" 
      amount={paymentType === 'deep' ? 179 : undefined} // ✅ Gupt Daan has no pre-filled amount
      onClose={() => setShowQR(false)}
    />
  </div>
)}


      {/* ✅ Thank You Popup */}
{showThankYou && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
      <h2 className="text-xl font-bold text-green-600 mb-4">Thank You for Your Payment!</h2>
      <p className="text-gray-700">
        Once the payment is confirmed, you will be contacted via WhatsApp.
      </p>
    </div>
  </div>
)}


      {/* ✅ Payment Done & Cancel Buttons (Separate from QR Code) */}
      {paymentStarted && (
  <div className="mt-6 flex flex-col items-center space-y-4">
    {/* ✅ Transaction ID Field (Appears when payment starts) */}
    <div className="w-full max-w-md">
      <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
        Transaction ID (Required)
      </label>
      <input
        type="text"
        id="transactionId"
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        value={formData.transactionId}
        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
      />
      {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId}</p>}
    </div>

    {/* ✅ Payment Done & Cancel Buttons */}
    <div className="flex justify-center space-x-4">
      <button 
        onClick={handlePaymentDone} 
        className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
      >
        Payment Done!
      </button>
      <button 
        onClick={handleCancel} 
        className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </form>
  );
}
