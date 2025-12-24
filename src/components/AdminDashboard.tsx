import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectUploadForm from './ProjectUploadForm';

export default function AdminDashboard() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication or demo mode
    const demoMode = localStorage.getItem('admin_demo_mode');
    
    if (demoMode === 'true') {
      setUser({ email: 'admin@lightwave.com', id: 'demo' });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your portfolio projects</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {showUploadForm ? (
          <ProjectUploadForm onClose={() => setShowUploadForm(false)} />
        ) : (
          <ProjectList />
        )}
      </div>
    </div>
  );
}
