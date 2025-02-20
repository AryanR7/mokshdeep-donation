import { X } from 'lucide-react';

interface QRCodeProps {
  upiId: string;
  amount?: number; // ✅ Now optional
  onClose: () => void;
}

export function QRCode({ upiId, amount, onClose }: QRCodeProps) {
  // ✅ Modify UPI Link to Exclude Amount if Undefined
  const upiBase = `upi://pay?pa=${upiId}&pn=Mokshdeep&tn=Diya Offering`;
  const upiData = amount ? `${upiBase}&am=${amount}` : upiBase; // ✅ Only include amount if defined
  const encodedUPI = encodeURIComponent(upiData);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUPI}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* ✅ Updated Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {amount ? `Scan to Pay ₹${amount}` : 'Scan to Pay (Enter Amount Manually)'}
        </h3>
        
        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <img
            src={qrCodeUrl}
            alt="Payment QR Code"
            className="w-48 h-48"
          />
        </div>
        
        <p className="text-sm text-gray-600 text-center">
          Scan this QR code with any UPI app to make the payment
        </p>
      </div>
    </div>
  );
}
