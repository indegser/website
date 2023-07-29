export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string | null;
          height: number;
          id: string;
          type: string;
          url: string;
          width: number;
        };
        Insert: {
          created_at?: string | null;
          height: number;
          id: string;
          type: string;
          url: string;
          width: number;
        };
        Update: {
          created_at?: string | null;
          height?: number;
          id?: string;
          type?: string;
          url?: string;
          width?: number;
        };
        Relationships: [];
      };
      journal: {
        Row: {
          created_time: string;
          data: Json;
          id: string;
          last_edited_time: string;
        };
        Insert: {
          created_time?: string;
          data: Json;
          id: string;
          last_edited_time?: string;
        };
        Update: {
          created_time?: string;
          data?: Json;
          id?: string;
          last_edited_time?: string;
        };
        Relationships: [];
      };
      liked_tweets: {
        Row: {
          created_at: string;
          id: number;
          text: string;
          url: string;
          user: Json | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          text: string;
          url: string;
          user?: Json | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          text?: string;
          url?: string;
          user?: Json | null;
        };
        Relationships: [];
      };
      link_previews: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_url: string | null;
          title: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          title?: string;
          url?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: {
          content: Json | null;
          cover: string | null;
          created_time: string;
          excerpt: string | null;
          id: string;
          is_draft: boolean | null;
          last_edited_time: string;
          title: string | null;
        };
        Insert: {
          content?: Json | null;
          cover?: string | null;
          created_time?: string;
          excerpt?: string | null;
          id: string;
          is_draft?: boolean | null;
          last_edited_time?: string;
          title?: string | null;
        };
        Update: {
          content?: Json | null;
          cover?: string | null;
          created_time?: string;
          excerpt?: string | null;
          id?: string;
          is_draft?: boolean | null;
          last_edited_time?: string;
          title?: string | null;
        };
        Relationships: [];
      };
      tokens: {
        Row: {
          created_at: string | null;
          database_id: string | null;
          id: string;
          token: string;
        };
        Insert: {
          created_at?: string | null;
          database_id?: string | null;
          id: string;
          token: string;
        };
        Update: {
          created_at?: string | null;
          database_id?: string | null;
          id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tokens_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
