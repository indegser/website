-- Add normalized categories tables and backfill from posts.categories jsonb.

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

insert into public.categories (_id, title)
select distinct
  category_item ->> '_id' as _id,
  coalesce(nullif(category_item ->> 'title', ''), 'Untitled') as title
from public.posts p
cross join lateral jsonb_array_elements(coalesce(p.categories, '[]'::jsonb)) as category_item
where jsonb_typeof(category_item) = 'object'
  and category_item ? '_id'
  and nullif(category_item ->> '_id', '') is not null
on conflict (_id) do update
set title = excluded.title;

insert into public.post_categories (post_id, category_id)
select distinct
  p._id,
  category_item ->> '_id' as category_id
from public.posts p
cross join lateral jsonb_array_elements(coalesce(p.categories, '[]'::jsonb)) as category_item
where jsonb_typeof(category_item) = 'object'
  and category_item ? '_id'
  and nullif(category_item ->> '_id', '') is not null
on conflict (post_id, category_id) do nothing;
