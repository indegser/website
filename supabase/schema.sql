-- Supabase bootstrap for blog posts + image uploads.
-- Apply in SQL Editor (or migration tooling) before setting DATA_SOURCE=supabase.

create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.posts (
  _id text primary key default gen_random_uuid()::text,
  slug jsonb not null,
  title text not null,
  excerpt text not null default '',
  cover jsonb,
  body jsonb not null default '[]'::jsonb,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint posts_slug_has_current check (
    jsonb_typeof(slug) = 'object'
    and slug ? 'current'
    and jsonb_typeof(slug -> 'current') = 'string'
  )
);

create unique index if not exists posts_slug_current_unique_idx
  on public.posts ((slug ->> 'current'));

create index if not exists posts_published_at_desc_idx
  on public.posts (published_at desc);

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.posts enable row level security;

drop policy if exists posts_public_read on public.posts;
create policy posts_public_read
on public.posts
for select
using (true);

drop policy if exists posts_service_role_write on public.posts;
create policy posts_service_role_write
on public.posts
for all
to service_role
using (true)
with check (true);

create table if not exists public.categories (
  _id text primary key,
  title text not null,
  avatar jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.post_categories (
  post_id text not null references public.posts(_id) on delete cascade,
  category_id text not null references public.categories(_id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, category_id)
);

create index if not exists post_categories_category_id_idx
  on public.post_categories (category_id);

alter table public.categories enable row level security;
alter table public.post_categories enable row level security;

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read
on public.categories
for select
using (true);

drop policy if exists categories_service_role_write on public.categories;
create policy categories_service_role_write
on public.categories
for all
to service_role
using (true)
with check (true);

drop policy if exists post_categories_public_read on public.post_categories;
create policy post_categories_public_read
on public.post_categories
for select
using (true);

drop policy if exists post_categories_service_role_write on public.post_categories;
create policy post_categories_service_role_write
on public.post_categories
for all
to service_role
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists post_images_public_read on storage.objects;
create policy post_images_public_read
on storage.objects
for select
using (bucket_id = 'post-images');

drop policy if exists post_images_service_upload on storage.objects;
create policy post_images_service_upload
on storage.objects
for insert
to service_role
with check (bucket_id = 'post-images');

drop policy if exists post_images_service_update on storage.objects;
create policy post_images_service_update
on storage.objects
for update
to service_role
using (bucket_id = 'post-images')
with check (bucket_id = 'post-images');

drop policy if exists post_images_service_delete on storage.objects;
create policy post_images_service_delete
on storage.objects
for delete
to service_role
using (bucket_id = 'post-images');
