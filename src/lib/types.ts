export interface Project {
  id: string;
  created_at: string;
  event_title: string;
  event_type: string;
  event_location: string;
  event_date: string;
  guest_count: number | null;
  services_used: string[];
  short_description: string;
  highlight_or_challenge: string | null;
  images: string[];
  videos: string[] | null;
  before_image_url: string | null;
  after_image_url: string | null;
  instagram_reel_url: string | null;
  is_featured: boolean;
  is_new: boolean;
  display_order: number;
}

export interface ProjectFormData {
  event_title: string;
  event_type: string;
  event_location: string;
  event_date: string;
  guest_count: number | null;
  services_used: string[];
  short_description: string;
  highlight_or_challenge?: string;
  instagram_reel_url?: string;
  is_featured: boolean;
}

export const EVENT_TYPES = [
  'All Events',
  'Weddings',
  'Corporate',
  'Cultural Events',
  'College Events',
  'DJ Nights',
  'Live Shows',
] as const;

export const AVAILABLE_SERVICES = [
  'Sound System',
  'Lighting',
  'LED Wall',
  'Stage Production',
  'DJ Services',
  'Video Production',
  'Photography',
  'Live Streaming',
] as const;
