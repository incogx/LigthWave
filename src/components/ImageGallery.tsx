import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Project } from '../lib/types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ImageGallery({ project, onClose }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    const shareText = `Check out ${project.event_title} by LightWave Production!\n\n${project.short_description}\n\nLocation: ${project.event_location}\nDate: ${new Date(project.event_date).toLocaleDateString()}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.event_title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Open WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <div>
          <h2 className="text-white text-xl font-bold">{project.event_title}</h2>
          <p className="text-gray-400 text-sm">{project.event_type}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Share on WhatsApp"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Image Slider */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.event_title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Navigation Buttons */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>

        {/* Project Details Panel */}
        <div className="lg:w-96 bg-gray-900 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Event Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm">
                      {new Date(project.event_date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm">{project.event_location}</p>
                  </div>
                </div>
                {project.guest_count && (
                  <div className="flex items-start gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Guests</p>
                      <p className="text-sm">{project.guest_count.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Highlight/Challenge */}
            {project.highlight_or_challenge && (
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Highlight</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.highlight_or_challenge}
                </p>
              </div>
            )}

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Services Provided</h3>
              <div className="flex flex-wrap gap-2">
                {project.services_used.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Before/After Images */}
            {project.before_image_url && project.after_image_url && (
              <div>
                <h3 className="text-white font-bold text-lg mb-3">Before & After</h3>
                <BeforeAfterSlider
                  beforeImage={project.before_image_url}
                  afterImage={project.after_image_url}
                />
              </div>
            )}

            {/* Instagram Reel */}
            {project.instagram_reel_url && (
              <div>
                <h3 className="text-white font-bold text-lg mb-3">Instagram Reel</h3>
                <a
                  href={project.instagram_reel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Watch on Instagram
                </a>
              </div>
            )}

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div>
                <h3 className="text-white font-bold text-lg mb-3">All Images</h3>
                <div className="grid grid-cols-4 gap-2">
                  {project.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-amber-500 scale-95'
                          : 'border-transparent hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
