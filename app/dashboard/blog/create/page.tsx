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
    excerpt: "",
    status: "Draft",
    content_html: "",
    aiSummary: "",
    is_public: true,
    is_pinned: false
  });

  const handleUpdate = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    // Logic will go here
    console.log("Publishing article...", formData);
    await new Promise(r => setTimeout(r, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-gray-950 font-sans tracking-tight">
      <EditorHeader 
        status={formData.status}
        onPreview={() => console.log("Preview")}
        onSaveDraft={() => console.log("Save Draft")}
        onPublish={handlePublish}
      />

      <div className="max-w-full mx-auto px-8 py-8">
        <div className="flex gap-12">
          <div className="flex-1 space-y-6">
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


            <ImageSection />

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

          <PublishSidebar 
            status={formData.status}
            isPublic={formData.is_public}
            isPinned={formData.is_pinned}
            onStatusChange={(val) => handleUpdate("status", val)}
            onPublicToggle={(val) => handleUpdate("is_public", val)}
            onPinnedToggle={(val) => handleUpdate("is_pinned", val)}
          />
        </div>
      </div>
    </div>
  );
}
