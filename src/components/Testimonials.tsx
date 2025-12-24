import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Client Feedback</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            What our clients say about our work
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 shadow-2xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                <Quote className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-white text-white" />
              ))}
            </div>

            <blockquote className="text-center">
              <p className="text-2xl lg:text-3xl font-semibold text-white leading-relaxed mb-6">
                "The technical setup was flawless and professionally handled. The lighting and sound elevated the entire event."
              </p>
              <footer className="text-white/90 font-medium">
                Client Feedback
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="text-4xl font-bold text-amber-400 mb-2">100+</div>
            <div className="text-gray-300">Events Completed</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="text-4xl font-bold text-amber-400 mb-2">4+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
