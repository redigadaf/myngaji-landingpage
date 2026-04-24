"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { EditorHeader } from "@/components/sections/dashboard/blog-editor/EditorHeader";
import { TitleSection } from "@/components/sections/dashboard/blog-editor/TitleSection";
import { ExcerptSection } from "@/components/sections/dashboard/blog-editor/ExcerptSection";
import { ImageSection } from "@/components/sections/dashboard/blog-editor/ImageSection";
import { EditorField } from "@/components/sections/dashboard/blog-editor/EditorField";
import { RelatedArticlesSection } from "@/components/sections/dashboard/blog-editor/RelatedArticlesSection";
import { PublishSidebar } from "@/components/sections/dashboard/blog-editor/PublishSidebar";

// ─── Types ────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FormData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  featuredImageId: string;
  excerpt: string;
  status: string;
  content_html: string;
  content_json: Record<string, unknown> | null;
  aiSummary: string;
  is_public: boolean;
  is_pinned: boolean;
  category_id: string;
  reading_time: number;
  is_featured: boolean;
  tags: string[];
  focus_keywords: string[];
}

interface BlogPostWithRelations {
  id: string;
  title: string | null;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  status: string;
  content_html: string | null;
  content_json: Record<string, unknown> | null;
  ai_summary: string | null;
  is_public: boolean | null;
  is_pinned: boolean | null;
  category_id: string | null;
  reading_time: string | number | null;
  is_featured: boolean | null;
  focus_keywords: string[] | null;
  media_assets: { id: string; url: string } | null;
  blog_post_tags: { blog_tags: { name: string } | null }[];
  teachers: { id: string; accounts: { full_name: string } | null } | null;
}

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [authorName, setAuthorName] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    featuredImageId: "",
    excerpt: "",
    status: "Draft",
    content_html: "",
    content_json: null,
    aiSummary: "",
    is_public: true,
    is_pinned: false,
    category_id: "",
    reading_time: 5,
    is_featured: false,
    tags: [],
    focus_keywords: [],
  });

  // ─── Fetch bootstrap data & Article ──────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catsRes, tagsRes] = await Promise.all([
          supabase.from("blog_categories").select("id, name, slug").order("name"),
          supabase.from("blog_tags").select("id, name").order("name")
        ]);
        
        if (catsRes.data) setCategories(catsRes.data);
        if (tagsRes.data) setAvailableTags(tagsRes.data);

        const { data, error: blogError } = await supabase
          .from("blog_posts")
          .select(`
            *,
            media_assets ( id, url ),
            blog_post_tags ( blog_tags ( name ) ),
            teachers ( id, accounts ( full_name ) )
          `)
          .eq("id", id)
          .single();

        if (blogError) throw blogError;
        const b = data as unknown as BlogPostWithRelations;
        
        if (b) {
          const postTags = b.blog_post_tags?.map((t) => t.blog_tags?.name).filter(Boolean) as string[] || [];
          
          setFormData({
            title: b.title || "",
            slug: b.slug || "",
            metaTitle: b.meta_title || b.title || "",
            metaDescription: b.meta_description || b.excerpt || "",
            featuredImage: b.media_assets?.url || "",
            featuredImageId: b.media_assets?.id || "",
            excerpt: b.excerpt || "",
            status: b.status.charAt(0).toUpperCase() + b.status.slice(1).toLowerCase(),
            content_html: b.content_html || "",
            content_json: b.content_json || null,
            aiSummary: b.ai_summary || "",
            is_public: b.is_public ?? true,
            is_pinned: b.is_pinned || false,
            category_id: b.category_id || "",
            reading_time: parseInt((b.reading_time || "5").toString()) || 5,
            is_featured: b.is_featured || false,
            tags: postTags,
            focus_keywords: b.focus_keywords || [],
          });

          if (b.teachers) {
            setAuthorName(b.teachers.accounts?.full_name || "");
          }
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setSubmitError("Gagal memuatkan artikel.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ─── Slug helper ──────────────────────────────────────
  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

  // ─── Unified update handler ────────────────────────────
  const handleUpdate = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "slug" && !value) (updated as FormData).slug = slugify(prev.title);
      return updated;
    });
  }, []);

  // ─── Handle tags upsert ───────────────────────────────
  const upsertTags = async (postId: string, tagNames: string[]) => {
    // Basic implementation: delete existing post tags and insert new ones
    await supabase.from("blog_post_tags").delete().eq("post_id", postId);
    
    if (!tagNames.length) return;

    for (const rawName of tagNames) {
      const name = rawName.trim();
      if (!name) continue;
      const tagSlug = slugify(name);

      const { data: tag, error: tagError } = await supabase
        .from("blog_tags")
        .upsert({ name, slug: tagSlug }, { onConflict: "slug" })
        .select("id")
        .single();

      if (tagError) {
        console.error("Error upserting tag:", tagError);
      }

      if (tag) {
        const { error: linkError } = await supabase
          .from("blog_post_tags")
          .insert({ post_id: postId, tag_id: tag.id });
          
        if (linkError) {
          console.error("Error inserting blog_post_tags:", linkError);
        }
      }
    }
  };

  // ─── Submit handler ───────────────────────────────────
  const handlePublish = async () => {
    if (!formData.title.trim()) return setSubmitError("Tajuk artikel kosong.");
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const isPublishing = formData.status === "Published";

      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt || null,
          content_html: formData.content_html || null,
          content_json: formData.content_json || null,
          ai_summary: formData.aiSummary || null,
          media_id: formData.featuredImageId || null,
          category_id: formData.category_id || null,
          reading_time: `${formData.reading_time} min`,
          is_featured: formData.is_featured,
          is_public: formData.is_public,
          is_pinned: formData.is_pinned,
          status: formData.status.toLowerCase(),
          updated_at: new Date().toISOString(),
          published_at: isPublishing ? (formData.status === "Published" ? new Date().toISOString() : null) : null,
          meta_title: formData.metaTitle || null,
          meta_description: formData.metaDescription || null,
          focus_keywords: formData.focus_keywords.length ? formData.focus_keywords : null,
        })
        .eq("id", id);

      if (error) throw error;

      await upsertTags(id, formData.tags);

      router.refresh();
      router.push("/dashboard");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Gagal menyimpan perubahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500 font-bold">Memuatkan artikel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#FDFDFD] dark:bg-gray-950 font-sans tracking-tight flex flex-col overflow-hidden">
      <EditorHeader 
        status={formData.status}
        isSubmitting={isSubmitting}
        onPreview={() => window.open(`/blog/${formData.slug}`, "_blank")}
        onSaveDraft={() => { handleUpdate("status", "Draft"); setTimeout(handlePublish, 50); }}
        onPublish={handlePublish}
      />

      {submitError && (
        <div className="mx-8 mt-4 px-5 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-[14px] font-medium flex items-center justify-between">
          <span>{submitError}</span>
          <button onClick={() => setSubmitError(null)} className="text-red-400 hover:text-red-600 font-bold">×</button>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-12 px-8 py-8 max-w-full">
          <div className="flex-1 h-full overflow-y-auto pr-4 scrollbar-hide">
            <div className="space-y-6 pb-20">
              <div className="mb-4">
                <h1 className="text-[32px] font-black text-gray-900 dark:text-white mb-2 leading-none">Kemaskini Artikel</h1>
                <p className="text-gray-500 text-[16px]">Edit kandungan artikel terpilih dangan editor premium MyNgaji.</p>
              </div>
              
              <TitleSection value={formData.title} onChange={(val) => handleUpdate("title", val)} />
              <ExcerptSection value={formData.excerpt} onChange={(val) => handleUpdate("excerpt", val)} />
              <ImageSection 
                value={formData.featuredImage} 
                onChange={(url, id) => {
                  handleUpdate("featuredImage", url);
                  handleUpdate("featuredImageId", id);
                }} 
              />
              <EditorField label="AI Summary" placeholder="..." value={formData.aiSummary} onChange={(val) => handleUpdate("aiSummary", val)} />
              <EditorField 
                label="Article Content" 
                placeholder="..." 
                minHeight="min-h-[500px]" 
                value={formData.content_html}
                onChange={(val) => handleUpdate("content_html", val)}
                onChangeJSON={(json) => handleUpdate("content_json", json)}
              />
              <RelatedArticlesSection />
            </div>
          </div>

          <div className="w-[340px] h-full overflow-y-auto pr-1 pb-20 transition-all custom-scrollbar">
            <PublishSidebar 
              status={formData.status}
              isPublic={formData.is_public}
              isPinned={formData.is_pinned}
              slug={formData.slug}
              metaTitle={formData.metaTitle}
              metaDescription={formData.metaDescription}
              featuredImage={formData.featuredImage}
              authorName={authorName}
              categories={categories}
              categoryId={formData.category_id}
              availableTags={availableTags}
              readingTime={formData.reading_time}
              isFeatured={formData.is_featured}
              tags={formData.tags}
              focusKeywords={formData.focus_keywords}
              onStatusChange={(val) => handleUpdate("status", val)}
              onPublicToggle={(val) => handleUpdate("is_public", val)}
              onPinnedToggle={(val) => handleUpdate("is_pinned", val)}
              onSlugChange={(val) => handleUpdate("slug", val)}
              onMetaTitleChange={(val) => handleUpdate("metaTitle", val)}
              onMetaDescriptionChange={(val) => handleUpdate("metaDescription", val)}
              onCategoryChange={(val) => handleUpdate("category_id", val)}
              onReadingTimeChange={(val) => handleUpdate("reading_time", val)}
              onFeaturedToggle={(val) => handleUpdate("is_featured", val)}
              onTagsChange={(val) => handleUpdate("tags", val)}
              onFocusKeywordsChange={(val) => handleUpdate("focus_keywords", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
