-- ============================================================
-- MIGRATION: Tambah kolom SEO, visibility & AI summary
-- ke dalam table blog_posts
--
-- File: migrate_blog_posts_seo_fields.sql
-- Dibuat: 2026-04-22
-- ============================================================

-- 1. Tambah kolom SEO
--    meta_title  : Judul khusus untuk mesin carian (boleh berbeza dari title)
--    meta_description : Deskripsi khusus untuk mesin carian (boleh berbeza dari excerpt)
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- 2. Tambah kolom visibility & pin
--    is_public : Artikel boleh diakses oleh umum atau tersembunyi (private)
--    is_pinned : Pin artikel di bahagian atas halaman listing
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false;

-- 3. Tambah kolom AI summary
--    ai_summary : Ringkasan artikel yang dihasilkan oleh AI
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS ai_summary TEXT;

-- 4. Jadikan content_json boleh NULL
--    UI hanya menghantar content_html. Editor JSON tidak digunakan.
ALTER TABLE public.blog_posts
  ALTER COLUMN content_json DROP NOT NULL;

-- ============================================================
-- NOTA:
-- - Kolom image_url dikekalkan untuk backward compatibility
--   dengan data lama (artikel yang sudah ada).
--   Artikel baru akan menggunakan media_id (FK ke media_assets).
-- - Migration media_id sudah dikendalikan oleh:
--   migrate_blog_media_fk.sql
-- ============================================================
