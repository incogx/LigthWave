import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { EVENT_TYPES, AVAILABLE_SERVICES, ProjectFormData } from '../lib/types';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';

const projectSchema = z.object({
  event_title: z.string().min(3, 'Title must be at least 3 characters'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_location: z.string().min(3, 'Location is required'),
  event_date: z.string().min(1, 'Event date is required'),
  guest_count: z.number().nullable(),
  services_used: z.array(z.string()).min(1, 'Select at least one service'),
  short_description: z.string().min(10, 'Description must be at least 10 characters'),
  highlight_or_challenge: z.string().optional(),
  instagram_reel_url: z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean(),
});

interface Props {
  onClose: () => void;
}

export default function ProjectUploadForm({ onClose }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      event_title: '',
      event_type: '',
      event_location: '',
      event_date: '',
      guest_count: null,
      services_used: [],
      short_description: '',
      highlight_or_challenge: '',
      instagram_reel_url: '',
      is_featured: false,
    },
  });

  const selectedServices = watch('services_used') || [];

  const handleServiceToggle = (service: string) => {
    const current = selectedServices;
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue('services_used', updated);
  };

  const compressImage = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  };

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const compressedFile = await compressImage(file);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, compressedFile);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from('project-images').getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (images.length === 0) {
      toast.error('Please upload at least one project image');
      return;
    }

    setUploading(true);

    try {
      // Upload main images
      const imageUrls = await Promise.all(
        images.map((img) => uploadImage(img, 'projects'))
      );

      // Upload before/after images if provided
      const beforeImageUrl = beforeImage
        ? await uploadImage(beforeImage, 'before-after')
        : null;
      const afterImageUrl = afterImage
        ? await uploadImage(afterImage, 'before-after')
        : null;

      // Calculate if project is "new" (within last 30 days)
      const eventDate = new Date(data.event_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const isNew = eventDate >= thirtyDaysAgo;

      // Insert into database
      const { error } = await supabase.from('projects').insert([{
        event_title: data.event_title,
        event_type: data.event_type,
        event_location: data.event_location,
        event_date: data.event_date,
        guest_count: data.guest_count,
        services_used: data.services_used,
        short_description: data.short_description,
        highlight_or_challenge: data.highlight_or_challenge || null,
        images: imageUrls,
        before_image_url: beforeImageUrl,
        after_image_url: afterImageUrl,
        instagram_reel_url: data.instagram_reel_url || null,
        is_featured: data.is_featured,
        is_new: isNew,
        display_order: 0,
      }] as any);

      if (error) throw error;

      toast.success('Project uploaded successfully!');
      onClose();
      window.location.reload(); // Refresh to show new project
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload project. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            {...register('event_title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="e.g., Grand Wedding at Taj Palace"
          />
          {errors.event_title && (
            <p className="text-red-600 text-sm mt-1">{errors.event_title.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type *
          </label>
          <select
            {...register('event_type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Select event type</option>
            {EVENT_TYPES.filter((type) => type !== 'All Events').map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.event_type && (
            <p className="text-red-600 text-sm mt-1">{errors.event_type.message}</p>
          )}
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Location *
          </label>
          <input
            {...register('event_location')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="e.g., Chennai, Tamil Nadu"
          />
          {errors.event_location && (
            <p className="text-red-600 text-sm mt-1">{errors.event_location.message}</p>
          )}
        </div>

        {/* Event Date and Guest Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date *
            </label>
            <input
              {...register('event_date')}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {errors.event_date && (
              <p className="text-red-600 text-sm mt-1">{errors.event_date.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Count
            </label>
            <input
              {...register('guest_count', { valueAsNumber: true })}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., 500"
            />
          </div>
        </div>

        {/* Services Used */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Used *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {AVAILABLE_SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => handleServiceToggle(service)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedServices.includes(service)
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          {errors.services_used && (
            <p className="text-red-600 text-sm mt-1">{errors.services_used.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            {...register('short_description')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Brief description of the event and services provided..."
          />
          {errors.short_description && (
            <p className="text-red-600 text-sm mt-1">{errors.short_description.message}</p>
          )}
        </div>

        {/* Highlight or Challenge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highlight or Challenge
          </label>
          <textarea
            {...register('highlight_or_challenge')}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="What made this event special or challenging?"
          />
        </div>

        {/* Instagram Reel URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instagram Reel URL
          </label>
          <input
            {...register('instagram_reel_url')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="https://www.instagram.com/reel/..."
          />
        </div>

        {/* Main Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Images * (Multiple images supported)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setImages(files);
              }}
              className="hidden"
              id="main-images"
            />
            <label htmlFor="main-images" className="cursor-pointer">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Click to upload project images
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {images.length > 0 ? `${images.length} images selected` : 'PNG, JPG up to 10MB each'}
              </p>
            </label>
          </div>
        </div>

        {/* Before/After Images */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Before Image (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-amber-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
                className="hidden"
                id="before-image"
              />
              <label htmlFor="before-image" className="cursor-pointer">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="text-sm text-gray-600">
                  {beforeImage ? beforeImage.name : 'Upload before'}
                </p>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              After Image (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-amber-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
                className="hidden"
                id="after-image"
              />
              <label htmlFor="after-image" className="cursor-pointer">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="text-sm text-gray-600">
                  {afterImage ? afterImage.name : 'Upload after'}
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-3">
          <input
            {...register('is_featured')}
            type="checkbox"
            id="is_featured"
            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
          />
          <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
            Mark as Featured Project
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
