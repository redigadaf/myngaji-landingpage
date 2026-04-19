-- ============================================================
-- MIGRATION: SEED DATA DARI JSON KE SUPABASE
-- 
-- 1. Insert 29 Tenaga Pengajar dari data-guru.json
-- 2. Insert 10 Artikel Blog dari blog-articles.json
-- ============================================================

-- ============================================================
-- BAHAGIAN 1: TEACHERS (Tenaga Pengajar)
-- ============================================================
-- Memandangkan email dan phone_wa adalah WAJIB (NOT NULL) dalam table anda, 
-- kita gunakan dummy value. Anda boleh kemaskini kemudian.

INSERT INTO teachers (nama, email, phone_wa, display_role, experience, bio, image_url)
VALUES
  ('Ustazah Farra Aina', 'farra.aina@myngaji.com', '-', 'Pengasas Myngaji Academy', '10 Tahun', 'Memiliki Ijazah Bacaan Riwayat Hafs ''an ''Asim.', '/tenaga-pengajar/Ustazah Farra Aina.png'),
  ('Ustazah Asma', 'asma@myngaji.com', '-', 'Guru Al-Quran', '7 Tahun', 'Memiliki Ijazah Bacaan Riwayat Hafs ''an ''Asim dari Jordan.', '/tenaga-pengajar/Ustazah Asma.png'),
  ('Ustazah Ezwin', 'ezwin@myngaji.com', '-', 'Guru Al-Quran & Tajwid', '3 Tahun', 'Pelajar Universiti Sains Islam Malaysia.', '/tenaga-pengajar/Ustazah Ezwin.png'),
  ('Ustazah Farah Humairaa', 'farah.h@myngaji.com', '-', 'Guru Mengaji , Sirah , Bahasa Arab', '1 Tahun', 'Graduan Universiti Malaya (Ijazah Sarjana Muda Syariah).', '/tenaga-pengajar/Ustazah Farah Humairaa.png'),
  ('Ustazah Irdina', 'irdina@myngaji.com', '-', 'Guru Jawi, Mengaji (Iqra’ dan Al-Quran) & Bahasa Arab', '5 Tahun', 'Graduan Universiti Pendidikan Sultan Idris.', '/tenaga-pengajar/Ustazah Irdina.png'),
  ('Ustazah Amirah', 'amirah@myngaji.com', '-', 'Guru Al-Quran', '5 Tahun', 'Graduan Darul Quran Jakim', '/tenaga-pengajar/Ustazah Amirah.png'),
  ('Ustazah Afya', 'afya@myngaji.com', '-', 'Guru Al-Quran', '1 Tahun', 'Degree in Islamic Education, IPG Kampus Darulaman.', '/tenaga-pengajar/Afya.png'),
  ('Ustazah Kaiyisah', 'kaiyisah@myngaji.com', '-', 'Guru Al-Quran', '2 Tahun', 'Graduan Universiti Sains Islam Malaysia.', '/tenaga-pengajar/Ustazah Kaiyisah.png'),
  ('Ustaz Baihaqi', 'baihaqi@myngaji.com', '-', 'Guru Al-Quran', '6 Bulan', 'Ijazah Sarjana Muda Sunnah dengan Pengurusan Maklumat, USIM.', '/tenaga-pengajar/Baihaqi.png'),
  ('Ustazah Hajar', 'hajar@myngaji.com', '-', 'Guru Fardhu Ain', '3 Tahun', 'Sudah khatam kitab Islamiah, mengajar Fardhu Ain.', '/tenaga-pengajar/Ustazah Hajar.png'),
  ('Ustaz Naim', 'naim@myngaji.com', '-', 'Guru Al-Quran & As-Sunnah', '3 Tahun', 'Graduan Universiti Sains Islam Malaysia.', '/tenaga-pengajar/Ustaz Naim.png'),
  ('Ustaz ‘Afif', 'afif@myngaji.com', '-', 'Guru Tahfiz Al-Quran & Qiraat', '6 Tahun', 'Diploma Darul Quran Jakim. Degree UPSI.', '/tenaga-pengajar/Ustaz Afif.png'),
  ('Ustazah Afifah', 'afifah@myngaji.com', '-', 'Guru Alquran & Tajwid', '7 Tahun', 'Graduan Universiti Mu''tah, Jordan.', '/tenaga-pengajar/Ustazah Afifah.png'),
  ('Ustazah Bahiyyah', 'bahiyyah@myngaji.com', '-', 'Guru Mengaji', '4 Tahun', 'Khatam Hafazan di Maahad Nasihun Amin.', '/tenaga-pengajar/Ustazah Bahiyyah.png'),
  ('Ustazah Shazleen', 'shazleen@myngaji.com', '-', 'Guru Al-Quran', '2 Tahun', 'Graduan Usuluddin Universiti Malaya.', '/tenaga-pengajar/Ustazah Shazleen.png'),
  ('Ustazah Izzah', 'izzah@myngaji.com', '-', 'Guru Iqra'' & Al-Quran', '3 Tahun', 'Graduan UPSI.', '/tenaga-pengajar/Ustazah Izzah.png'),
  ('Ustaz Afif Syatir', 'afif.syatir@myngaji.com', '-', 'Guru Al-Quran, Bahasa Arab & Hafazan', '3 Tahun', 'Graduan Universiti Yarmouk, Jordan.', '/tenaga-pengajar/Ustaz Afif Syatir.png'),
  ('Ustazah Ain', 'ain@myngaji.com', '-', 'Guru Al-Quran', '1 Tahun', 'Graduan Universiti Malaya dalam pengkhususan Al-Quran & Al-Hadith.', '/tenaga-pengajar/Ustazah Ain.png'),
  ('Ustazah Asyiqin', 'asyiqin@myngaji.com', '-', 'Guru Al-Quran', '2 Tahun', 'Mahasiswa Quran dan Sunnah dengan minor Human Sciences, UIAM.', '/tenaga-pengajar/Ustazah Asyiqin.png'),
  ('Ustazah Hanifah', 'hanifah@myngaji.com', '-', 'Guru Al Quran Dan Iqra', '3 Tahun', 'Graduan university of jordan.', '/tenaga-pengajar/Ustazah Hanifah.png'),
  ('Ustazah Syaimaa''', 'syaimaa@myngaji.com', '-', 'Guru Al-Quran', '2 Tahun', 'Tahun 2 Ijazah UKM. STAM KISAS.', '/tenaga-pengajar/Ustazah Syaimaa.png'),
  ('Ustazah Najwa''', 'najwa@myngaji.com', '-', 'Guru Al Quran Dan Iqra', '5 Tahun', 'Ijazah Sarjana Muda Al Quran dan Al Sunnah dari UIS.', '/tenaga-pengajar/Ustazah Najwa.png'),
  ('Ustazah Hafizah', 'hafizah@myngaji.com', '-', 'Guru Al-Quran', '1 Tahun', 'Penterjemah Luar Institut Terjemahan & Buku Malaysia.', '/tenaga-pengajar/Ustazah Hafizah.png'),
  ('Ustazah Alwani', 'alwani@myngaji.com', '-', 'Guru Bahasa Arab', '3 Tahun', 'Graduan universiti mu’tah.', '/tenaga-pengajar/Ustazah Alwani.png'),
  ('Ustazah Aisyah Jahidah', 'aisyah.j@myngaji.com', '-', 'Guru Bahasa Arab', '5 Tahun', 'Graduan Universiti Mu’tah, Jordan.', '/tenaga-pengajar/Ustazah Aisyah Jahidah.png'),
  ('Ustazah Afina', 'afina@myngaji.com', '-', 'Guru Mengaji', '1 Tahun', 'Lepasan Diploma Tahfiz Al-Quran & Qiraat Darul Quran.', '/tenaga-pengajar/Ustazah Afina.png'),
  ('Ustazah Syakirah', 'syakirah@myngaji.com', '-', 'Guru Al-Quran', '5 Tahun', 'Graduan Universiti Sultan Zainal Abidin.', '/tenaga-pengajar/Ustazah Syakirah.png'),
  ('Ustazah Farah Suhada', 'farah.suhada@myngaji.com', '-', 'Guru Al-Quran', '4 Tahun', '-', '/tenaga-pengajar/Ustazah Farah Suhada.png'),
  ('Ustazah Nurul Aini', 'nurul.aini@myngaji.com', '-', 'Guru Al-Quran', '5 Tahun', 'Graduan USIM & UM.', '/tenaga-pengajar/Ustazah Nurul Aini.png')
ON CONFLICT DO NOTHING;

-- ============================================================
-- BAHAGIAN 2: BLOG POSTS (Artikel)
-- ============================================================
-- SELECT digunakan untuk mendapatkan id yang betul secara dinamik
-- berdasarkan nama penulis dan slug kategori
-- (Perhatikan pemetaan author_id mengikut padanan gambar dalam json)

INSERT INTO blog_posts (title, slug, category_id, excerpt, content_html, content_json, author_id, reading_time, image_url, is_featured, published_at, status)
SELECT 
  '7 Tips Mudah Ajar Anak Mengaji di Rumah', '7-tips-mudah-ajar-anak-mengaji-di-rumah',
  (SELECT id FROM blog_categories WHERE slug = 'tips-ibu-bapa'),
  'Mengajar anak mengaji di rumah boleh jadi lebih mudah dengan pendekatan yang betul. Ketahui tips praktikal untuk ibu bapa.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustazah Afifah'),
  '5 min', '/assets/blog/blog1.webp', false, '2024-02-01'::timestamptz, 'published'
UNION ALL
SELECT 
  'Panduan Lengkap Belajar Tajwid untuk Pemula', 'panduan-lengkap-belajar-tajwid-untuk-pemula',
  (SELECT id FROM blog_categories WHERE slug = 'tajwid'),
  'Tajwid adalah asas bacaan Al-Quran yang betul. Pelajari hukum-hukum tajwid asas dengan mudah melalui panduan ini.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz ‘Afif'),
  '8 min', '/assets/blog/blog2.webp', true, '2024-01-28'::timestamptz, 'published'
UNION ALL
SELECT 
  'Kelebihan Hafaz Al-Quran dari Kecil', 'kelebihan-hafaz-al-quran-dari-kecil',
  (SELECT id FROM blog_categories WHERE slug = 'hafazan'),
  'Ramai ibu bapa tertanya-tanya, adakah anak saya sesuai untuk hafaz Al-Quran? Ketahui kelebihan dan tips memulakan.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustazah Afifah'),
  '6 min', '/assets/blog/blog3.webp', false, '2024-01-25'::timestamptz, 'published'
UNION ALL
SELECT 
  '5 Kesalahan Biasa dalam Bacaan Al-Quran', '5-kesalahan-biasa-dalam-bacaan-al-quran',
  (SELECT id FROM blog_categories WHERE slug = 'al-quran'),
  'Elakkan kesalahan umum yang sering dibuat ketika membaca Al-Quran. Perbaiki bacaan anda dengan betul.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz ‘Afif'),
  '7 min', '/assets/blog/blog4.webp', false, '2024-01-20'::timestamptz, 'published'
UNION ALL
SELECT 
  'Cara Mudah Kuasai Bahasa Arab untuk Pemula', 'cara-mudah-kuasai-bahasa-arab-untuk-pemula',
  (SELECT id FROM blog_categories WHERE slug = 'bahasa-arab'),
  'Bahasa Arab tidak sesukar yang disangka. Ikuti langkah-langkah mudah ini untuk mula belajar bahasa Al-Quran.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz Naim'),
  '6 min', '/assets/blog/blog5.webp', false, '2024-01-15'::timestamptz, 'published'
UNION ALL
SELECT 
  'Fardhu Ain yang Wajib Dipelajari Setiap Muslim', 'fardhu-ain-yang-wajib-dipelajari-setiap-muslim',
  (SELECT id FROM blog_categories WHERE slug = 'fardhu-ain'),
  'Ketahui ilmu-ilmu fardhu ain yang wajib dipelajari oleh setiap muslim dan muslimah mengikut hukum syarak.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustazah Nurul Aini'),
  '10 min', '/assets/blog/blog6.webp', false, '2024-01-10'::timestamptz, 'published'
UNION ALL
SELECT 
  'Adab Membaca Al-Quran yang Perlu Diketahui', 'adab-membaca-al-quran-yang-perlu-diketahui',
  (SELECT id FROM blog_categories WHERE slug = 'al-quran'),
  'Selain tajwid, adab membaca Al-Quran juga penting. Pelajari adab-adab yang betul sebelum dan semasa membaca.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz Afif Syatir'),
  '5 min', '/assets/blog/blog7.webp', false, '2024-01-05'::timestamptz, 'published'
UNION ALL
SELECT 
  'Motivasi Anak Suka Belajar Mengaji: Strategi Berkesan', 'motivasi-anak-suka-belajar-mengaji',
  (SELECT id FROM blog_categories WHERE slug = 'tips-ibu-bapa'),
  'Anak tak berminat mengaji? Cuba strategi-strategi ini untuk meningkatkan minat anak terhadap pembelajaran Al-Quran.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustazah Afina'),
  '7 min', '/assets/blog/blog8.webp', false, '2024-01-01'::timestamptz, 'published'
UNION ALL
SELECT 
  'Kelas Online vs Kelas Fizikal: Mana Lebih Berkesan?', 'kelas-online-vs-kelas-fizikal',
  (SELECT id FROM blog_categories WHERE slug = 'inspirasi'),
  'Ramai yang masih ragu dengan kelas mengaji online. Ketahui perbandingan dan kelebihan setiap kaedah pembelajaran.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz Afif Syatir'),
  '6 min', '/assets/blog/blog9.webp', false, '2023-12-28'::timestamptz, 'published'
UNION ALL
SELECT 
  'Bacaan Makhorijul Huruf yang Betul: Panduan Asas', 'bacaan-makhorijul-huruf-yang-betul',
  (SELECT id FROM blog_categories WHERE slug = 'tajwid'),
  'Makhorijul huruf adalah tempat keluarnya huruf. Kuasai asas ini untuk memastikan bacaan Al-Quran anda sempurna.',
  '', '{}'::jsonb,
  (SELECT id FROM teachers WHERE nama = 'Ustaz ‘Afif'),
  '9 min', '/assets/blog/blog10.webp', false, '2023-12-25'::timestamptz, 'published';
