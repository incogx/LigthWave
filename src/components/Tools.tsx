import { Cpu, Radio, Monitor, FileSpreadsheet, MessageSquare, Palette } from 'lucide-react';

const tools = [
  { name: 'Digital Mixers and PA Systems', icon: Radio },
  { name: 'Lighting Consoles', icon: Cpu },
  { name: 'LED Wall Controllers', icon: Monitor },
  { name: 'Excel and Google Sheets', icon: FileSpreadsheet },
  { name: 'WhatsApp Business', icon: MessageSquare },
  { name: 'Canva', icon: Palette }
];

export default function Tools() {
  return (
    <section id="tools" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Tools & Technology</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Industry-standard equipment and software for professional event execution
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-amber-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-gray-300 text-sm font-semibold leading-tight group-hover:text-white transition-colors">
                  {tool.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
