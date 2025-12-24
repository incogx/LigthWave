import { Music, Lightbulb, Monitor, Box, Settings, Zap, Users, Headphones } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'Professional Sound System Rental',
    description: 'High-quality audio equipment for crystal-clear sound at any venue size'
  },
  {
    icon: Lightbulb,
    title: 'Stage & Architectural Lighting',
    description: 'Creative lighting designs that transform spaces and enhance ambience'
  },
  {
    icon: Monitor,
    title: 'LED Wall (Indoor & Outdoor)',
    description: 'Stunning visual displays for presentations, branding, and live feeds'
  },
  {
    icon: Box,
    title: 'Stage Truss & Rigging',
    description: 'Professional structural support for lighting, audio, and decorative elements'
  },
  {
    icon: Settings,
    title: 'Stage Design & Technical Setup',
    description: 'Complete stage configuration tailored to your event requirements'
  },
  {
    icon: Zap,
    title: 'Power Distribution & Cabling',
    description: 'Safe and efficient power management for seamless operations'
  },
  {
    icon: Users,
    title: 'Vendor & Technical Crew Coordination',
    description: 'Expert team management ensuring smooth execution'
  },
  {
    icon: Headphones,
    title: 'On-site Event Production & Support',
    description: 'Real-time technical support and troubleshooting throughout your event'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive event production solutions delivered with precision and professionalism
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
