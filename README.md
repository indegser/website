# Indegser Website

## Supabase migration quickstart

1. Run `supabase/schema.sql` in your Supabase SQL editor.
2. Set environment variables:
   - `DATA_SOURCE=supabase`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `SUPABASE_ANON_KEY=...` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `SUPABASE_SERVICE_ROLE_KEY=...` (required for `/api/image-upload`)
   - `SUPABASE_POSTS_TABLE=posts` (optional)
   - `SUPABASE_IMAGE_BUCKET=post-images` (optional)
