-- Align posts schema with sanity production seed shape.
-- Scope: posts table shape only.

alter table public.posts
  alter column categories drop not null;

alter table public.posts
  drop constraint if exists posts_categories_array_or_null;

alter table public.posts
  add constraint posts_categories_array_or_null
  check (categories is null or jsonb_typeof(categories) = 'array');
