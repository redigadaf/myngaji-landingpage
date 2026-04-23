-- ============================================================
-- MIGRATION: Tambah kolom focus_keywords ke blog_posts
--
-- File: migrate_blog_posts_keywords.sql
-- Dibuat: 2026-04-22
--
-- Pendekatan: TEXT[] (PostgreSQL native array)
-- Sebab:
--   - Fokus keyword adalah metadata ringkas untuk panduan penulis
--   - Tidak memerlukan relasi atau analitik per keyword
--   - Query mudah: WHERE 'tajwid' = ANY(focus_keywords)
-- ============================================================

-- Tambah kolom focus_keywords sebagai array teks
-- Contoh nilai: ARRAY['hukum nun mati', 'tajwid asas', 'belajar quran']
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS focus_keywords TEXT[] DEFAULT '{}';

-- ============================================================
-- CONTOH PENGGUNAAN:
--
-- INSERT:
--   INSERT INTO blog_posts (title, focus_keywords, ...)
--   VALUES ('Panduan Tajwid', ARRAY['tajwid', 'hukum nun mati'], ...);
--
-- UPDATE:
--   UPDATE blog_posts
--   SET focus_keywords = ARRAY['tajwid', 'hukum nun mati']
--   WHERE id = '...';
--
-- QUERY (cari artikel yang ada keyword tertentu):
--   SELECT * FROM blog_posts
--   WHERE 'tajwid' = ANY(focus_keywords);
-- ============================================================
