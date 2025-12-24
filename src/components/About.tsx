import { Award, Briefcase, GraduationCap, Trophy } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            LightWave Production is a Chennai-based event production company delivering professional sound, lighting, LED wall, and stage solutions for weddings, corporate events, and large-scale celebrations. Known for technical excellence, smooth coordination, and reliable on-ground execution.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-80 lg:h-auto">
              <img
                src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Event Production"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="border-l-4 border-amber-500 pl-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Naveen Kumar P</h3>
                  <p className="text-amber-400 text-lg font-semibold">Founder & Event Production Manager</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Education</p>
                      <p className="text-white font-semibold">B.E – Cyber Security</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white font-semibold">4+ Years</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Events Executed</p>
                      <p className="text-white font-semibold">100+ Events</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Specialty</p>
                      <p className="text-white font-semibold">Technical Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
