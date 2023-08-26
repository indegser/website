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
      episodes: {
        Row: {
          created_time: string | null
          last_edited_time: string | null
          page_id: string
          series_id: string
        }
        Insert: {
          created_time?: string | null
          last_edited_time?: string | null
          page_id: string
          series_id: string
        }
        Update: {
          created_time?: string | null
          last_edited_time?: string | null
          page_id?: string
          series_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "episodes_page_id_fkey"
            columns: ["page_id"]
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "episodes_series_id_fkey"
            columns: ["series_id"]
            referencedRelation: "series"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          created_at: string | null
          height: number
          id: string
          type: string
          url: string
          width: number
        }
        Insert: {
          created_at?: string | null
          height: number
          id: string
          type: string
          url: string
          width: number
        }
        Update: {
          created_at?: string | null
          height?: number
          id?: string
          type?: string
          url?: string
          width?: number
        }
        Relationships: []
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
        Relationships: []
      }
      link_previews: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          url?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json | null
          cover: string | null
          created_time: string
          excerpt: string | null
          id: string
          is_draft: boolean | null
          last_edited_time: string
          title: string | null
        }
        Insert: {
          content?: Json | null
          cover?: string | null
          created_time?: string
          excerpt?: string | null
          id: string
          is_draft?: boolean | null
          last_edited_time?: string
          title?: string | null
        }
        Update: {
          content?: Json | null
          cover?: string | null
          created_time?: string
          excerpt?: string | null
          id?: string
          is_draft?: boolean | null
          last_edited_time?: string
          title?: string | null
        }
        Relationships: []
      }
      series: {
        Row: {
          color: string | null
          created_time: string | null
          id: string
          last_edited_time: string | null
          name: string | null
        }
        Insert: {
          color?: string | null
          created_time?: string | null
          id: string
          last_edited_time?: string | null
          name?: string | null
        }
        Update: {
          color?: string | null
          created_time?: string | null
          id?: string
          last_edited_time?: string | null
          name?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "tokens_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}