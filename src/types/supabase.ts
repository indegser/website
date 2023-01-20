export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      journal: {
        Row: {
          created_time: string
          data: Json
          id: string
          last_edited_time: string
        }
        Insert: {
          created_time?: string
          data: Json
          id: string
          last_edited_time?: string
        }
        Update: {
          created_time?: string
          data?: Json
          id?: string
          last_edited_time?: string
        }
      }
      liked_tweets: {
        Row: {
          created_at: string
          id: number
          text: string
          url: string
          user: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          text: string
          url: string
          user?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          text?: string
          url?: string
          user?: Json | null
        }
      }
      tokens: {
        Row: {
          created_at: string | null
          database_id: string | null
          id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          database_id?: string | null
          id: string
          token: string
        }
        Update: {
          created_at?: string | null
          database_id?: string | null
          id?: string
          token?: string
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
