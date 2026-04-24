"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaType } from "./data";
import { fetchMediaAssets } from "./lib/media-services";
import { MediaHeader } from "../../../components/sections/dashboard/media-library/media-header";
import { MediaToolbar } from "../../../components/sections/dashboard/media-library/media-toolbar";
import { MediaGridView } from "../../../components/sections/dashboard/media-library/media-grid-view";
import { MediaListView } from "../../../components/sections/dashboard/media-library/media-list-view";

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaList, setMediaList] = useState<MediaType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filter media based on search query
  const filteredMediaList = mediaList.filter(media => 
    media.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMedia = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await fetchMediaAssets();
      setMediaList(data);
    } catch (error) {
      console.error("Gagal memuatkan media:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initLoad = async () => {
      // Kita tidak panggil setIsLoading(true) di sini secara manual 
      // kerana state asal sudah pun true, bagi mengelakkan amaran cascading render.
      try {
        const data = await fetchMediaAssets();
        if (isMounted) {
          setMediaList(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) setIsLoading(false);
      }
    };

    initLoad();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 font-sans">
      <MediaHeader onRefresh={loadMedia} />
      <MediaToolbar 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {isLoading ? (
        <div className="py-20 flex items-center justify-center text-gray-400 font-bold text-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            Memuatkan Pustaka Media...
          </div>
        </div>
      ) : filteredMediaList.length > 0 ? (
        viewMode === "grid" ? (
          <MediaGridView mediaList={filteredMediaList} onRefresh={loadMedia} />
        ) : (
          <MediaListView mediaList={filteredMediaList} onRefresh={loadMedia} />
        )
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-400 font-medium">Tiada media ditemui untuk carian &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  );
}
