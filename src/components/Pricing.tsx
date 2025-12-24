import { Check, Sparkles } from 'lucide-react';

const packages = [
  {
    name: 'Basic Event Package',
    features: [
      'Professional Sound System',
      'Basic Stage Lighting',
      'Technical Support',
      'Setup & Breakdown'
    ],
    bestFor: 'Small gatherings and intimate events'
  },
  {
    name: 'Premium Production Package',
    features: [
      'Advanced Sound & Lighting',
      'LED Wall Display',
      'Stage Truss & Rigging',
      'Full Technical Crew',
      'Power Management',
      'On-site Coordination'
    ],
    bestFor: 'Large events and corporate functions',
    featured: true
  },
  {
    name: 'Custom Event Solutions',
    features: [
      'Tailored to Your Needs',
      'Complete AV Production',
      'Multi-venue Support',
      'Dedicated Project Manager',
      'Vendor Coordination',
      'Post-event Support'
    ],
    bestFor: 'Unique and complex events'
  }
];

export default function Pricing() {
  const handleContact = () => {
    window.location.href = 'tel:+919884397271';
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Pricing Packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Flexible solutions tailored to your event needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                pkg.featured
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl ring-2 ring-amber-500 scale-105'
                  : 'bg-white shadow-xl'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>POPULAR</span>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    pkg.featured ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm ${
                    pkg.featured ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {pkg.bestFor}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        pkg.featured ? 'bg-amber-500' : 'bg-amber-100'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          pkg.featured ? 'text-white' : 'text-amber-600'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        pkg.featured ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleContact}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  pkg.featured
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:shadow-xl hover:shadow-amber-500/50'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All packages are customizable. Contact us for detailed pricing and availability.
          </p>
        </div>
      </div>
    </section>
  );
}
