import { useState, useEffect } from 'react';
import { MapPin, Users2, Sparkles, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Project, EVENT_TYPES } from '../lib/types';
import ImageGallery from './ImageGallery';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All Events');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to empty array on error
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === 'All Events') return true;
    return project.event_type === selectedFilter;
  });

  return (
    <section id="portfolio" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Portfolio Highlights</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Showcasing our commitment to technical excellence and flawless execution
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {EVENT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFilter(type)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedFilter === type
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              {selectedFilter === 'All Events'
                ? 'No projects yet. Check back soon!'
                : `No ${selectedFilter} projects found.`}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.event_title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {project.is_new && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  )}
                  {project.is_featured && (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.event_title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.event_location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(project.event_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {project.guest_count && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <Users2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {project.guest_count.toLocaleString()} Guests
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.services_used.slice(0, 3).map((service, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20"
                    >
                      {service}
                    </span>
                  ))}
                  {project.services_used.length > 3 && (
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
                      +{project.services_used.length - 3}
                    </span>
                  )}
                </div>

                {project.short_description && (
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {project.short_description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedProject && (
        <ImageGallery
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
