import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const handleCall = () => {
    window.location.href = 'tel:+919884397271';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:lightwaveproduction@gmail.com';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919884397271', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Ready to make your event extraordinary? Contact us today for a consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <a
                    href="tel:+919884397271"
                    className="text-gray-300 hover:text-amber-400 transition-colors text-lg"
                  >
                    +91 98843 97271
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a
                    href="mailto:lightwaveproduction@gmail.com"
                    className="text-gray-300 hover:text-amber-400 transition-colors break-all"
                  >
                    lightwaveproduction@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                  <a
                    href="https://wa.me/919884397271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-amber-400 transition-colors text-lg"
                  >
                    +91 98843 97271
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-gray-300">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Availability</h3>
                  <p className="text-gray-300">
                    Available for events across Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Start?</h3>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Contact us today to discuss your event requirements. We'll provide a customized quote and help you create an unforgettable experience.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleCall}
                className="w-full py-4 px-6 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 px-6 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </button>
              <button
                onClick={handleEmail}
                className="w-full py-4 px-6 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
