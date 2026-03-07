-- Drop legacy denormalized categories jsonb after backfilling join table.

alter table public.posts
  drop constraint if exists posts_categories_array_or_null;

alter table public.posts
  drop column if exists categories;
