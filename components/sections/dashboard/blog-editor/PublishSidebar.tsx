"use client";

import { useState } from "react";
import { PublishSection } from "./sidebar-sections/PublishSection";
import { MetadataSection } from "./sidebar-sections/MetadataSection";
import { SEOSection } from "./sidebar-sections/SEOSection";

interface PublishSidebarProps {
  status: string;
  isPublic: boolean;
  isPinned: boolean;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  onStatusChange: (status: string) => void;
  onPublicToggle: (value: boolean) => void;
  onPinnedToggle: (value: boolean) => void;
  onSlugChange: (value: string) => void;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
}

export function PublishSidebar({ 
  status, 
  isPublic, 
  isPinned, 
  slug,
  metaTitle,
  metaDescription,
  featuredImage,
  onStatusChange, 
  onPublicToggle, 
  onPinnedToggle,
  onSlugChange,
  onMetaTitleChange,
  onMetaDescriptionChange
}: PublishSidebarProps) {
  const [activeTab, setActiveTab] = useState("Publish");

  return (
    <div className="space-y-6 pb-12">
      {/* Settings Tabs */}
      <div className="bg-gray-100/50 dark:bg-gray-900/50 p-1.5 rounded-2xl border border-gray-100/50 dark:border-gray-800">
        <div className="grid grid-cols-3 gap-1">
          {["Publish", "Metadata", "SEO"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[16px] font-bold rounded-xl transition-all ${
                activeTab === tab 
                ? "bg-white dark:bg-gray-800 text-primary shadow-sm" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="space-y-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[28px] p-5 shadow-sm">
        {activeTab === "Publish" ? (
          <PublishSection 
            status={status}
            onStatusChange={onStatusChange}
            isPublic={isPublic}
            onPublicToggle={onPublicToggle}
            isPinned={isPinned}
            onPinnedToggle={onPinnedToggle}
          />
        ) : activeTab === "Metadata" ? (
          <MetadataSection />
        ) : (
          <SEOSection 
            slug={slug} 
            onSlugChange={onSlugChange} 
            metaTitle={metaTitle} 
            onMetaTitleChange={onMetaTitleChange} 
            metaDescription={metaDescription}
            onMetaDescriptionChange={onMetaDescriptionChange}
            featuredImage={featuredImage}
          />
        )}
      </div>
    </div>
  );
}
