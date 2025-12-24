import { Wrench, Heart } from 'lucide-react';

const hardSkills = [
  'Event Production Planning',
  'Sound and Lighting System Setup',
  'LED Wall Configuration and Operation',
  'Truss and Stage Rigging',
  'Power and Load Management',
  'Technical Troubleshooting'
];

const softSkills = [
  'Client Communication',
  'Leadership and Team Coordination',
  'Crisis and Time Management',
  'Vendor Handling',
  'Attention to Detail'
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive skill set combining technical mastery with exceptional people management
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
            </div>

            <div className="space-y-3">
              {hardSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Professional Skills</h3>
            </div>

            <div className="space-y-3">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
