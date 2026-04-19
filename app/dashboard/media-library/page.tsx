"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaType } from "./data";
import { fetchMediaAssets } from "./lib/media-services";
import { MediaHeader } from "./components/media-header";
import { MediaToolbar } from "./components/media-toolbar";
import { MediaGridView } from "./components/media-grid-view";
import { MediaListView } from "./components/media-list-view";

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaList, setMediaList] = useState<MediaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <MediaToolbar viewMode={viewMode} setViewMode={setViewMode} />
      
      {isLoading ? (
        <div className="py-20 flex items-center justify-center text-gray-400 font-bold text-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            Memuatkan Pustaka Media...
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <MediaGridView mediaList={mediaList} onRefresh={loadMedia} />
      ) : (
        <MediaListView mediaList={mediaList} onRefresh={loadMedia} />
      )}
    </div>
  );
}
