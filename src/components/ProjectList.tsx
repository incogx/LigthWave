import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../lib/types';
import { Pencil, Trash2, Eye, Calendar, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to fetch projects');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);

      if (error) throw error;

      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No projects yet. Add your first project!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Project Image */}
          <div className="relative h-48 bg-gray-200">
            {project.images[0] ? (
              <img
                src={project.images[0]}
                alt={project.event_title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-2 right-2 flex gap-2">
              {project.is_new && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  New
                </span>
              )}
              {project.is_featured && (
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.event_title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(project.event_date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {project.event_location}
              </div>
              {project.guest_count && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {project.guest_count.toLocaleString()} guests
                </div>
              )}
            </div>

            {/* Event Type Badge */}
            <div className="mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {project.event_type}
              </span>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.services_used.slice(0, 3).map((service, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {service}
                </span>
              ))}
              {project.services_used.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{project.services_used.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`/#portfolio-${project.id}`, '_blank')}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm">
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
