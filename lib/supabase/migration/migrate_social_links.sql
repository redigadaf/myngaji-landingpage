-- Migration: Create social_links table and seed initial data
-- Date: 2026-04-23

-- 1. Buat tabel social_links
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT UNIQUE NOT NULL, -- 'whatsapp', 'facebook', 'instagram', 'tiktok', 'youtube'
    url TEXT NOT NULL,
    label TEXT,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Access
-- Publik bisa melihat link
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'social_links' AND policyname = 'Public can view social links'
    ) THEN
        CREATE POLICY "Public can view social links" ON public.social_links
            FOR SELECT USING (true);
    END IF;
END $$;

-- User ter-autentikasi (admin) bisa melakukan segalanya
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'social_links' AND policyname = 'Authenticated users can manage social links'
    ) THEN
        CREATE POLICY "Authenticated users can manage social links" ON public.social_links
            FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 4. Masukkan data awal (Seed Data)
INSERT INTO public.social_links (platform, url, label) VALUES
('whatsapp', '601165691942', 'WhatsApp Number'),
('facebook', 'https://www.facebook.com/OfficialRayharTravels', 'Facebook Page'),
('instagram', 'https://www.instagram.com/rayhartravels/', 'Instagram Profile'),
('tiktok', 'https://www.tiktok.com/@rayhartravels', 'TikTok Account'),
('youtube', 'https://www.youtube.com/@rayhar', 'YouTube Channel')
ON CONFLICT (platform) DO UPDATE SET 
    url = EXCLUDED.url,
    label = EXCLUDED.label;

-- 5. Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_social_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_social_links_timestamp ON public.social_links;
CREATE TRIGGER update_social_links_timestamp
    BEFORE UPDATE ON public.social_links
    FOR EACH ROW EXECUTE PROCEDURE update_social_links_updated_at();
