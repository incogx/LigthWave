export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          event_title: string
          event_type: string
          event_location: string
          event_date: string
          guest_count: number | null
          services_used: string[]
          short_description: string
          highlight_or_challenge: string | null
          images: string[]
          videos: string[] | null
          before_image_url: string | null
          after_image_url: string | null
          instagram_reel_url: string | null
          is_featured: boolean
          is_new: boolean
          display_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          event_title: string
          event_type: string
          event_location: string
          event_date: string
          guest_count?: number | null
          services_used: string[]
          short_description: string
          highlight_or_challenge?: string | null
          images: string[]
          videos?: string[] | null
          before_image_url?: string | null
          after_image_url?: string | null
          instagram_reel_url?: string | null
          is_featured?: boolean
          is_new?: boolean
          display_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          event_title?: string
          event_type?: string
          event_location?: string
          event_date?: string
          guest_count?: number | null
          services_used?: string[]
          short_description?: string
          highlight_or_challenge?: string | null
          images?: string[]
          videos?: string[] | null
          before_image_url?: string | null
          after_image_url?: string | null
          instagram_reel_url?: string | null
          is_featured?: boolean
          is_new?: boolean
          display_order?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
