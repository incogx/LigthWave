import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>by LightWave Production</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LightWave Production. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Professional Event Production Services across Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
