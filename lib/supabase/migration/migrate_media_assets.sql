-- Migration file: media_assets_schema.sql
-- Run this in the Supabase SQL Editor

-- 1. Create the media_assets table
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,                     -- Nama paparan yang boleh diedit oleh admin
    storage_path TEXT NOT NULL,              -- Laluan/Nama fizikal dalam Supabase Storage (tak boleh diubah)
    url TEXT NOT NULL,                       -- URL awam gambar
    mime_type TEXT,                          -- Jenis fail (cth: image/jpeg, image/png, image/webp)
    size_bytes BIGINT,                       -- Saiz dalam bait
    width INTEGER,                           -- Lebar gambar (px) - pilihan
    height INTEGER,                          -- Tinggi gambar (px) - pilihan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Set up RLS (Row Level Security)
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 3. Create basic policies
-- Membenarkan orang awam untuk MEMBACA (SELECT) media
CREATE POLICY "Enable read access for all users" 
    ON public.media_assets FOR SELECT 
    USING (true);

-- Membenarkan hanya pengguna berdaftar/admin untuk INSERT, UPDATE, DELETE
-- Nota: Pastikan logic auth anda (seperti Supabase Auth) sudah dipasang. 
-- Buat masa ini, policy di bawah membenarkan auth users sahaja. 
CREATE POLICY "Enable insert for authenticated users only" 
    ON public.media_assets FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" 
    ON public.media_assets FOR UPDATE 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" 
    ON public.media_assets FOR DELETE 
    USING (auth.role() = 'authenticated');

-- 4. Create trigger to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_media_assets_updated_at
    BEFORE UPDATE ON public.media_assets
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- -- TIPS UNTUK STORAGE BUCKET:
-- -- Jangan lupa untuk buat bucket baharu bernama "media" di Supabase Storage anda
-- -- dan pastikan bucket tersebut ditetapkan sebagai "Public".
