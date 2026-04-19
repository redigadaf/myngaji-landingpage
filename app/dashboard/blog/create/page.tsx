"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Save, Image as ImageIcon, Loader2 } from "lucide-react";

export default function CreateBlogPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([
    { id: "1", name: "Tips Ibu Bapa" },
    { id: "2", name: "Tajwid" },
    { id: "3", name: "Hafazan" },
    { id: "4", name: "Al-Quran" }
  ]);
  const [authors, setAuthors] = useState<{id: string, nama: string}[]>([
    { id: "1", nama: "Ustazah Siti Sarah" },
    { id: "2", nama: "Ustaz Muhammad Amirul" }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category_id: "1",
    author_id: "1",
    excerpt: "",
    content_html: "",
    reading_time: "5 min",
    image_url: "",
    status: "published",
    is_featured: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated Save
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Simulated Save Data:", formData);
      alert("Artikel berjaya disimpan (Simulasi)! Data telah dicetak ke konsol.");
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        title: "",
        slug: "",
        excerpt: "",
        content_html: "",
      }));
      
    } catch (error: unknown) {
      alert("Ralat simulasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tulis Artikel Baru</h1>
        <p className="text-gray-500 mt-2">Bina artikel blog untuk platform MyNgaji menggunakan format HTML.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="title">Tajuk Artikel</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Contoh: 7 Tips Mengajar Anak Mengaji" 
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input 
              id="slug" 
              name="slug" 
              value={formData.slug}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-800 text-gray-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Kategori</Label>
            <select 
              id="category_id" 
              name="category_id" 
              value={formData.category_id}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              {categories.map(cat => (
                 <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_id">Penulis (Tenaga Pengajar)</Label>
            <select 
              id="author_id" 
              name="author_id" 
              value={formData.author_id}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              {authors.map(auth => (
                 <option key={auth.id} value={auth.id}>{auth.nama}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Tuliskan ringkasan 2-3 ayat tentang artikel ini..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="content_html">Kandungan Utama (HTML)</Label>
            <textarea
              id="content_html"
              name="content_html"
              rows={15}
              value={formData.content_html}
              onChange={handleChange}
              placeholder="<h2>Tajuk Sub</h2><p>Perenggan pertama...</p>"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL Gambar Utama</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="image_url" 
                name="image_url" 
                placeholder="/assets/blog/gambar1.webp" 
                value={formData.image_url}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Masukkan path local atau URL penuh gambar.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reading_time">Masa Membaca</Label>
            <Input 
              id="reading_time" 
              name="reading_time" 
              placeholder="Contoh: 5 min" 
              value={formData.reading_time}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2 border-t border-gray-100 dark:border-gray-800 pt-6 mt-4">
             <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="is_featured" 
                  name="is_featured" 
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="is_featured" className="cursor-pointer font-normal">
                  Jadikan sebagai Artikel Pilihan (Featured)
                </Label>
              </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]">
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> Simpan Artikel</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
