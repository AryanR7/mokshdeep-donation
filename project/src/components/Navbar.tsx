import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Flame className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Mokshdeep</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/terms"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}