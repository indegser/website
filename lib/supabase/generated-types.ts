export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      content: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id: string;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      databases: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          last_synced_at: string;
          raw_data: Json;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          last_synced_at?: string;
          raw_data: Json;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          last_synced_at?: string;
          raw_data?: Json;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'databases_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      episodes: {
        Row: {
          content_id: string;
          created_at: string;
          series_id: string | null;
        };
        Insert: {
          content_id: string;
          created_at?: string;
          series_id?: string | null;
        };
        Update: {
          content_id?: string;
          created_at?: string;
          series_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_episodes_content_id_fkey';
            columns: ['content_id'];
            isOneToOne: true;
            referencedRelation: 'content';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_episodes_series_id_fkey';
            columns: ['series_id'];
            isOneToOne: false;
            referencedRelation: 'series';
            referencedColumns: ['id'];
          },
        ];
      };
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
          database_id: string;
          excerpt: string | null;
          id: string;
          is_draft: boolean | null;
          last_edited_time: string;
          raw_data: Json | null;
          title: string;
        };
        Insert: {
          content?: Json | null;
          cover?: string | null;
          created_time?: string;
          database_id: string;
          excerpt?: string | null;
          id: string;
          is_draft?: boolean | null;
          last_edited_time?: string;
          raw_data?: Json | null;
          title?: string;
        };
        Update: {
          content?: Json | null;
          cover?: string | null;
          created_time?: string;
          database_id?: string;
          excerpt?: string | null;
          id?: string;
          is_draft?: boolean | null;
          last_edited_time?: string;
          raw_data?: Json | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pages_database_id_fkey';
            columns: ['database_id'];
            isOneToOne: false;
            referencedRelation: 'databases';
            referencedColumns: ['id'];
          },
        ];
      };
      series: {
        Row: {
          color: string | null;
          created_at: string;
          id: string;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id: string;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      tokens: {
        Row: {
          created_at: string;
          token: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          token: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          token?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tokens_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
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
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
