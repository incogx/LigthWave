import { Heart, Building2, Church, GraduationCap, ShoppingBag, Shirt, Music2 } from 'lucide-react';

const expertiseCategories = [
  {
    icon: Heart,
    title: 'Weddings & Receptions',
    description: 'Creating magical moments with elegant lighting and perfect sound',
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    icon: Building2,
    title: 'Corporate Events & Conferences',
    description: 'Professional AV solutions for business excellence',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Church,
    title: 'Cultural & Religious Events',
    description: 'Respectful and precise technical support for traditional celebrations',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: GraduationCap,
    title: 'College & School Functions',
    description: 'Energetic setups for youth events and annual days',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: ShoppingBag,
    title: 'Product Launches',
    description: 'High-impact presentations that make brands shine',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: Shirt,
    title: 'Fashion Shows',
    description: 'Runway lighting and sound that captivates audiences',
    gradient: 'from-fuchsia-500 to-pink-500'
  },
  {
    icon: Music2,
    title: 'DJ Nights & Live Music Events',
    description: 'Powerful audio and dynamic lighting for unforgettable performances',
    gradient: 'from-red-500 to-orange-500'
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Event Expertise</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized technical production across diverse event categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"
                  style={{ backgroundImage: `linear-gradient(to bottom right, rgb(251 191 36), rgb(245 158 11))` }}
                ></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{category.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
