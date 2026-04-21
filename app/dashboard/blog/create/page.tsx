"use client";

import { useState } from "react";
import { EditorHeader } from "@/components/sections/dashboard/blog-editor/EditorHeader";
import { TitleSection } from "@/components/sections/dashboard/blog-editor/TitleSection";
import { ExcerptSection } from "@/components/sections/dashboard/blog-editor/ExcerptSection";
import { ImageSection } from "@/components/sections/dashboard/blog-editor/ImageSection";
import { EditorField } from "@/components/sections/dashboard/blog-editor/EditorField";
import { RelatedArticlesSection } from "@/components/sections/dashboard/blog-editor/RelatedArticlesSection";
import { PublishSidebar } from "@/components/sections/dashboard/blog-editor/PublishSidebar";

export default function CreateBlogPost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    excerpt: "",
    status: "Draft",
    content_html: "",
    aiSummary: "",
    is_public: true,
    is_pinned: false
  });

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isMetaTitleManuallyEdited, setIsMetaTitleManuallyEdited] = useState(false);
  const [isMetaDescriptionManuallyEdited, setIsMetaDescriptionManuallyEdited] = useState(false);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const handleUpdate = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Handle clearing of manual edits to trigger re-sync
      if (field === "slug" && (value === "" || value === null)) {
        setIsSlugManuallyEdited(false);
        newData.slug = slugify(prev.title);
      }
      if (field === "metaTitle" && (value === "" || value === null)) {
        setIsMetaTitleManuallyEdited(false);
        newData.metaTitle = prev.title;
      }
      if (field === "metaDescription" && (value === "" || value === null)) {
        setIsMetaDescriptionManuallyEdited(false);
        newData.metaDescription = prev.excerpt;
      }

      // Auto-generate from title/excerpt if not manually edited
      if (field === "title") {
        if (!isSlugManuallyEdited) newData.slug = slugify(value as string);
        if (!isMetaTitleManuallyEdited) newData.metaTitle = value as string;
      }
      if (field === "excerpt") {
        if (!isMetaDescriptionManuallyEdited) newData.metaDescription = value as string;
      }
      
      return newData;
    });

    if (field === "slug" && value !== "") setIsSlugManuallyEdited(true);
    if (field === "metaTitle" && value !== "") setIsMetaTitleManuallyEdited(true);
    if (field === "metaDescription" && value !== "") setIsMetaDescriptionManuallyEdited(true);
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    // Logic will go here
    console.log("Publishing article...", formData);
    await new Promise(r => setTimeout(r, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="h-screen bg-[#FDFDFD] dark:bg-gray-950 font-sans tracking-tight flex flex-col overflow-hidden">
      <EditorHeader 
        status={formData.status}
        onPreview={() => console.log("Preview")}
        onSaveDraft={() => console.log("Save Draft")}
        onPublish={handlePublish}
      />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-12 px-8 py-8 max-w-full">
          {/* Main Content Area - Independent Scroll (Hidden Scrollbar) */}
          <div className="flex-1 h-full overflow-y-auto pr-4 scrollbar-hide">
            <div className="space-y-6 pb-20">
              <div className="mb-4">
                <h1 className="text-[32px] font-black text-gray-900 dark:text-white mb-2 leading-none">Editor Article</h1>
                <p className="text-gray-500 text-[16px]">Sediakan kandungan ilmiah yang berkualiti untuk pembaca MyNgaji.</p>
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
                onChange={(val) => handleUpdate("featuredImage", val)} 
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
              />

              <RelatedArticlesSection />
            </div>
          </div>

          {/* Sidebar Area - Independent Scroll (Visible Scrollbar on Right) */}
          <div className="w-[340px] h-full overflow-y-auto pr-1 pb-20 transition-all custom-scrollbar">
            <PublishSidebar 
              status={formData.status}
              isPublic={formData.is_public}
              isPinned={formData.is_pinned}
              slug={formData.slug}
              metaTitle={formData.metaTitle}
              metaDescription={formData.metaDescription}
              featuredImage={formData.featuredImage}
              onStatusChange={(val) => handleUpdate("status", val)}
              onPublicToggle={(val) => handleUpdate("is_public", val)}
              onPinnedToggle={(val) => handleUpdate("is_pinned", val)}
              onSlugChange={(val) => handleUpdate("slug", val)}
              onMetaTitleChange={(val) => handleUpdate("metaTitle", val)}
              onMetaDescriptionChange={(val) => handleUpdate("metaDescription", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
