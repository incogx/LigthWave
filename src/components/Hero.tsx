import { Phone, MessageCircle, Image } from 'lucide-react';

export default function Hero() {
  const handleCall = () => {
    window.location.href = 'tel:+919884397271';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919884397271', '_blank');
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            LightWave <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Production</span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light tracking-wide">
            Sound • Light • LED Wall • Stage Production
          </p>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting powerful live event experiences across Tamil Nadu
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={handleCall}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="group relative px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={scrollToPortfolio}
              className="group relative px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-500 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-amber-500 hover:text-white hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Image className="w-5 h-5" />
              <span>View Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
