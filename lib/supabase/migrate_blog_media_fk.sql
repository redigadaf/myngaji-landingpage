-- Migration file: alter_blog_posts_media_fk.sql
-- Digunakan untuk menggantikan lajur image_url statik dengan media_id (Foreign Key) 
-- yang terhubung secara terus (relational) dengan jadual media_assets.

-- 1. Tambahkan lajur media_id (Foreign Key)
ALTER TABLE public.blog_posts
ADD COLUMN media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL;

-- 2. Padam lajur image_url lama yang statik (Kerana kita kini menggunakan media_id)
ALTER TABLE public.blog_posts
DROP COLUMN image_url;

-- Nota: 
-- Penggunaan 'ON DELETE SET NULL' memastikan jika gambar di Pustaka Media dipadam, 
-- artikel blog tidak akan dipadam bersama. Sebaliknya, lajur media_id di dalam 
-- jadual artikel blog hanya menjadi 'NULL' (Kosong).
