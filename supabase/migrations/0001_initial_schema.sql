-- ParkWatch — initial schema
-- Run once in the Supabase SQL Editor (or via the Supabase CLI).
-- Version-safe (no IF NOT EXISTS on CREATE POLICY) and re-runnable.

create extension if not exists pgcrypto;

create table if not exists public.violations (
  id uuid primary key default gen_random_uuid(),
  vehicle_number text not null,
  location text not null,
  photo_url text,
  created_at timestamptz not null default now()
);

alter table public.violations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'violations'
      and policyname = 'violations_select'
  ) then
    create policy "violations_select" on public.violations
      for select to anon, authenticated using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'violations'
      and policyname = 'violations_insert'
  ) then
    create policy "violations_insert" on public.violations
      for insert to anon, authenticated with check (true);
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('violations', 'violations', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'violations_storage_insert'
  ) then
    create policy "violations_storage_insert" on storage.objects
      for insert to anon, authenticated with check (bucket_id = 'violations');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'violations_storage_select'
  ) then
    create policy "violations_storage_select" on storage.objects
      for select to anon, authenticated using (bucket_id = 'violations');
  end if;
end $$;