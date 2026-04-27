"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { EditorHeader } from "@/components/sections/dashboard/blog-editor/EditorHeader";
import { TitleSection } from "@/components/sections/dashboard/blog-editor/TitleSection";
import { ExcerptSection } from "@/components/sections/dashboard/blog-editor/ExcerptSection";
import { ImageSection } from "@/components/sections/dashboard/blog-editor/ImageSection";
import { EditorField } from "@/components/sections/dashboard/blog-editor/EditorField";
import { RelatedArticlesSection } from "@/components/sections/dashboard/blog-editor/RelatedArticlesSection";
import { PublishSidebar } from "@/components/sections/dashboard/blog-editor/PublishSidebar";
import { useDashboard } from "@/components/providers/DashboardProvider";

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
  featuredImage: string; // The public URL
  featuredImageId: string; // The UUID from media_assets
  excerpt: string;
  status: string;
  content_html: string;
  content_json: Record<string, unknown> | null;
  aiSummary: string;
  is_public: boolean;
  is_pinned: boolean;
  // Metadata tab
  category_id: string;
  reading_time: number;
  is_featured: boolean;
  tags: string[];  // raw tag names
  // SEO tab
  focus_keywords: string[];
  related_posts_ids: string[];
}

interface PinnedArticle {
  id: string;
  title: string;
}

export default function CreateBlogPost() {
  const router = useRouter();
  const { setIsLoading } = useDashboard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>("");
  const [currentPinned, setCurrentPinned] = useState<PinnedArticle | null>(null);

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
    related_posts_ids: [],
  });

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isMetaTitleManuallyEdited, setIsMetaTitleManuallyEdited] = useState(false);
  const [isMetaDescriptionManuallyEdited, setIsMetaDescriptionManuallyEdited] = useState(false);

  // ─── Fetch bootstrap data ──────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      // 1. Get current user & find their teacher_id
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch full_name from accounts table for display
        const { data: account } = await supabase
          .from("accounts")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        const displayName = account?.full_name || user.user_metadata?.full_name || user.email || "";

        if (user.email) {
          const { data: teacher } = await supabase
            .from("teachers")
            .select("id, name")
            .eq("email", user.email)
            .single();
            
          if (teacher) {
            setAuthorId(teacher.id);
            setAuthorName(displayName);
          } else {
            setAuthorName(displayName);
            // Fallback: if logged-in user is not in teachers table, pick the first available teacher
            // to satisfy the NOT NULL constraint on author_id
            const { data: fallbackTeacher } = await supabase
              .from("teachers")
              .select("id")
              .limit(1)
              .single();
            if (fallbackTeacher) {
              setAuthorId(fallbackTeacher.id);
            }
          }
        }
      }

      // 2. Fetch categories
      const { data: cats, error: catsError } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .order("name");
      if (catsError) console.error("[blog_categories] fetch error:", catsError);
      if (cats) {
        setCategories(cats);
        if (cats.length > 0) {
          setFormData(prev => ({ ...prev, category_id: cats[0].id }));
        }
      }
      // 3. Fetch tags
      const { data: tagsList } = await supabase.from("blog_tags").select("id, name").order("name");
      if (tagsList) setAvailableTags(tagsList);

      // 4. Check if any article is already pinned
      const { data: pinned } = await supabase
        .from("blog_posts")
        .select("id, title")
        .eq("is_pinned", true)
        .limit(1)
        .single();
      if (pinned) setCurrentPinned(pinned);
    };
    bootstrap();
  }, []);

  // ─── Slug helper ──────────────────────────────────────
  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

  // ─── Unified update handler ────────────────────────────
  const handleUpdate = useCallback((field: string, value: string | boolean | number | string[] | Record<string, unknown> | null) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Re-sync if cleared
      if (field === "slug" && value === "") {
        setIsSlugManuallyEdited(false);
        updated.slug = slugify(prev.title);
      }
      if (field === "metaTitle" && value === "") {
        setIsMetaTitleManuallyEdited(false);
        updated.metaTitle = prev.title;
      }
      if (field === "metaDescription" && value === "") {
        setIsMetaDescriptionManuallyEdited(false);
        updated.metaDescription = prev.excerpt;
      }

      // Auto-generate from title
      if (field === "title") {
        if (!isSlugManuallyEdited) updated.slug = slugify(value as string);
        if (!isMetaTitleManuallyEdited) updated.metaTitle = value as string;
      }
      // Auto-generate meta description from excerpt
      if (field === "excerpt" && !isMetaDescriptionManuallyEdited) {
        updated.metaDescription = value as string;
      }

      return updated;
    });

    if (field === "slug" && value !== "") setIsSlugManuallyEdited(true);
    if (field === "metaTitle" && value !== "") setIsMetaTitleManuallyEdited(true);
    if (field === "metaDescription" && value !== "") setIsMetaDescriptionManuallyEdited(true);
  }, [isSlugManuallyEdited, isMetaTitleManuallyEdited, isMetaDescriptionManuallyEdited]);

  // ─── Add Categoriy/Tag handlers ───────────────────────
  const handleAddCategory = async (name: string) => {
    try {
      const slug = slugify(name);
      const { data, error } = await supabase
        .from("blog_categories")
        .insert({ name, slug })
        .select()
        .single();
      
      if (error) throw error;
      if (data) {
        setCategories(prev => prev ? [...prev, data].sort((a, b) => a.name.localeCompare(b.name)) : [data]);
        handleUpdate("category_id", data.id);
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setSubmitError("Gagal menambah kategori baru.");
    }
  };

  const handleAddTag = async (name: string) => {
    try {
      const slug = slugify(name);
      const { data, error } = await supabase
        .from("blog_tags")
        .insert({ name, slug })
        .select()
        .single();
      
      if (error) throw error;
      if (data) {
        setAvailableTags(prev => [...prev, { id: data.id, name: data.name }].sort((a, b) => a.name.localeCompare(b.name)));
      }
    } catch (err) {
      console.error("Error adding tag:", err);
      // Even if database fail, the tag is already in formData.tags list locally
    }
  };

  // ─── Handle tags upsert ───────────────────────────────
  const upsertTags = async (postId: string, tagNames: string[]) => {
    if (!tagNames.length) return;

    for (const rawName of tagNames) {
      const name = rawName.trim();
      if (!name) continue;
      const tagSlug = slugify(name);

      // Upsert tag
      const { data: tag, error: tagError } = await supabase
        .from("blog_tags")
        .upsert({ name, slug: tagSlug }, { onConflict: "slug" })
        .select("id")
        .single();
        
      if (tagError) {
        console.error("Error upserting tag in create:", tagError);
      }

      if (tag) {
        const { error: linkError } = await supabase
          .from("blog_post_tags")
          .insert({ post_id: postId, tag_id: tag.id });
          
        if (linkError) {
          console.error("Error inserting blog_post_tags in create:", linkError);
        }
      }
    }
  };

  // ─── Submit handler ───────────────────────────────────
  const handlePublish = async () => {
    if (!formData.title.trim()) {
      setSubmitError("Tajuk artikel tidak boleh kosong.");
      return;
    }
    if (!formData.slug.trim()) {
      setSubmitError("URL slug tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setSubmitError(null);

    try {
      // Handle Exclusive Pinning: If this is pinned, unpin all others first
      if (formData.is_pinned) {
        const { error: unpinError } = await supabase
          .from("blog_posts")
          .update({ is_pinned: false })
          .eq("is_pinned", true);
        
        if (unpinError) {
          console.error("Error unpinning other articles:", unpinError);
          // We continue anyway, the latest update will override
        }
      }

      const isPublishing = formData.status === "Published";

      // Auto-extract TOC items from content_html
      let extractedTOC: { id: string; title: string; level: number }[] = [];
      if (typeof window !== "undefined" && formData.content_html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(formData.content_html, "text/html");
        const headings = doc.querySelectorAll("h2, h3");
        extractedTOC = Array.from(headings).map((h) => {
          const text = h.textContent?.trim() || "";
          const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/^-+|-+$/g, "");
          return {
            id: slug,
            title: text,
            level: parseInt(h.tagName.substring(1)),
          };
        });
      }

      const { data: post, error } = await supabase
        .from("blog_posts")
        .insert({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt || null,
          content_html: formData.content_html || null,
          content_json: formData.content_json || null,
          ai_summary: formData.aiSummary || null,
          media_id: formData.featuredImageId || null,
          author_id: authorId || null,
          category_id: formData.category_id || null,
          reading_time: `${formData.reading_time} min`,
          toc_items: extractedTOC.length > 0 ? extractedTOC : [],
          is_featured: formData.is_featured,
          is_public: formData.is_public,
          is_pinned: formData.is_pinned,
          status: formData.status.toLowerCase(),
          published_at: isPublishing ? new Date().toISOString() : null,
          meta_title: formData.metaTitle || null,
          meta_description: formData.metaDescription || null,
          focus_keywords: formData.focus_keywords.length ? formData.focus_keywords : [],
          related_posts_ids: formData.related_posts_ids.length ? formData.related_posts_ids : [],
        })
        .select("id")
        .single();

      if (error) throw error;

      // Upsert tags
      if (post && formData.tags.length) {
        await upsertTags(post.id, formData.tags);
      }

      // Redirect to blog list on success
      router.refresh();
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Publish error:", err);
      const errorObj = err as { message?: string };
      const msg = errorObj?.message || "Terdapat ralat. Cuba lagi.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    handleUpdate("status", "Draft");
    setTimeout(() => handlePublish(), 50);
  };

  // ─── Render ───────────────────────────────────────────
  return (
    <div className="h-screen bg-[#FDFDFD] dark:bg-gray-950 font-sans tracking-tight flex flex-col overflow-hidden">
      <EditorHeader 
        status={formData.status}
        isSubmitting={isSubmitting}
        onPreview={() => console.log("Preview")}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      {/* Submit error banner */}
      {submitError && (
        <div className="mx-8 mt-4 px-5 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-[14px] font-medium flex items-center justify-between">
          <span>{submitError}</span>
          <button onClick={() => setSubmitError(null)} className="text-red-400 hover:text-red-600 font-bold">×</button>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-12 px-8 py-8 max-w-full">
          {/* Main Content Area */}
          <div className="flex-1 h-full overflow-y-auto pr-4 scrollbar-hide">
            <div className="space-y-6 pb-20">
              <div className="mb-4">
                <h1 className="text-[32px] font-black text-gray-900 dark:text-white mb-2 leading-none">Editor Article</h1>
                <p className="text-gray-500 text-[16px] mb-6">Sediakan kandungan ilmiah yang berkualiti untuk pembaca MyNgaji.</p>

                {/* Quick Design Guide for Authors */}
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-6 flex gap-5 items-start mb-8 shadow-sm">
                  <div className="bg-amber-500 text-white p-3 rounded-2xl shrink-0 shadow-lg shadow-amber-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m14.83 4.93-4.24 4.24"/><path d="m4.93 14.83 4.24 4.24"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-100 text-[15px] mb-2 uppercase tracking-wider">Aturan Format Kandungan MyNgaji:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                       <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                         <span><strong>Heading 2:</strong> Poin Utama (Nombor muncul automatik)</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                         <span><strong>Heading 3:</strong> Sub-topik / Perincian Poin</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                         <span><strong>Blockquote:</strong> Poin Penting atau <strong>Kesimpulan</strong></span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                         <span><strong>Imej:</strong> Masukkan dari Media Library (Auto-Rounded)</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <TitleSection 
                value={formData.title} 
                onChange={(val) => handleUpdate("title", val)} 
              />

              <ExcerptSection 
                value={formData.excerpt} 
                onChange={(val) => handleUpdate("excerpt", val)} 
              />

              <ImageSection 
                value={formData.featuredImage} 
                onChange={(url, id) => {
                  handleUpdate("featuredImage", url);
                  handleUpdate("featuredImageId", id);
                }} 
              />

              <EditorField 
                label="AI Summary" 
                placeholder="Hasilkan ringkasan berbantuan AI di sini..." 
                value={formData.aiSummary}
                onChange={(val) => handleUpdate("aiSummary", val)}
              />

              <EditorField 
                label="Article Content" 
                placeholder="Mula menulis kandungan artikel anda..." 
                minHeight="min-h-[500px]" 
                value={formData.content_html}
                onChange={(val) => handleUpdate("content_html", val)}
                onChangeJSON={(json) => handleUpdate("content_json", json)}
              />

              <RelatedArticlesSection 
                value={formData.related_posts_ids} 
                onChange={(val) => handleUpdate("related_posts_ids", val)} 
              />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-[340px] h-full overflow-y-auto pr-1 pb-20 transition-all custom-scrollbar">
            <PublishSidebar 
              status={formData.status}
              isPublic={formData.is_public}
              isPinned={formData.is_pinned}
              slug={formData.slug}
              metaTitle={formData.metaTitle}
              metaDescription={formData.metaDescription}
              featuredImage={formData.featuredImage}
              // Metadata
              authorName={authorName}
              categories={categories}
              categoryId={formData.category_id}
              availableTags={availableTags}
              readingTime={formData.reading_time}
              isFeatured={formData.is_featured}
              tags={formData.tags}
              // SEO
              focusKeywords={formData.focus_keywords}
              // Handlers
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
              onAddCategory={handleAddCategory}
              onAddTag={handleAddTag}
              onFocusKeywordsChange={(val) => handleUpdate("focus_keywords", val)}
              // Pass current pinned info for UI feedback
              currentPinned={currentPinned}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
