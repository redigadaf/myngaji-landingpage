import { supabase } from "@/lib/supabase/client";
import { MediaType } from "../data";

const BUCKET_NAME = "blog-image";

// Helper: Format Saiz Fail
function formatBytes(bytes: number | null | undefined, decimals = 2) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Helper: Bersihkan Nama Fail (Sanitize)
function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-") // Ganti semua aksara khas dengan sengkang
    .replace(/-+/g, "-");         // Buang sengkang berulang
}

// Helper: Ekstrak ekstensi (cth: .jpg)
function getFileExtension(filename: string) {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts.pop()}` : "";
}

// 1. DAPATKAN SEMUA MEDIA DARI DATABASE
export async function fetchMediaAssets(): Promise<MediaType[]> {
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ralat menarik media:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    type: item.mime_type?.split("/")[1]?.toUpperCase() || "FAIL",
    size: formatBytes(item.size_bytes),
    resolution: item.width && item.height ? `${item.width}x${item.height}` : "–",
    date: new Date(item.created_at).toLocaleDateString("ms-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    url: item.url,
    storage_path: item.storage_path,
  }));
}

// 2. MUAT NAIK MEDIA BARU
export async function uploadMediaAsset(file: File) {
  try {
    const ext = getFileExtension(file.name);
    const baseName = file.name.replace(ext, "");
    
    // Pastikan nama unik dengan meletakkan timestamp jika perlu. 
    // Tapi sbb user nak nama fail sama dgn tajuk, kita sanitize:
    const safeTitle = sanitizeFileName(baseName);
    const timestamp = new Date().getTime();
    
    // Guna timestamp supaya tak clash (Tindih). Tapi cantik.
    const storagePath = `${safeTitle}-${timestamp}${ext}`;

    // A. Upload ke Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // B. Dapatkan Public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    // C. Dapatkan Dimensi Gambar (Cara manual melalui browser)
    const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = URL.createObjectURL(file);
    });

    // D. Simpan ke Database (Jadual media_assets)
    const { data: dbData, error: dbError } = await supabase
      .from("media_assets")
      .insert({
        title: baseName, // Tajuk tanpa .jpg untuk paparan UI
        storage_path: storagePath,
        url: publicUrlData.publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
        width: dimensions.width,
        height: dimensions.height,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return dbData;
  } catch (error) {
    console.error("Ralat muat naik:", error);
    throw error;
  }
}

// 3. EDIT TAJUK & RENAME STORAGE
export async function updateMediaTitle(
  id: string, 
  oldStoragePath: string, 
  newTitle: string
) {
  try {
    const ext = getFileExtension(oldStoragePath);
    
    // Hasilkan nama fail baru yang bersih
    const safeNewTitle = sanitizeFileName(newTitle);
    const timestamp = new Date().getTime(); // Mesti guna ID/Timestamp sikit utk halang duplicated
    const newStoragePath = `${safeNewTitle}-${timestamp}${ext}`;

    // A. Rename (Move) di Storage
    const { error: moveError } = await supabase.storage
      .from(BUCKET_NAME)
      .move(oldStoragePath, newStoragePath);

    if (moveError) throw moveError;

    // B. Dapatkan Public URL baharu
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(newStoragePath);

    // C. Kemaskini Database
    const { error: dbError } = await supabase
      .from("media_assets")
      .update({
        title: newTitle,
        storage_path: newStoragePath,
        url: publicUrlData.publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error("Ralat menukar tajuk:", error);
    throw error;
  }
}

// 4. HAPUS MEDIA
export async function deleteMediaAsset(id: string, storagePath: string) {
  try {
    // A. Tarik keluar dari Storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (storageError) throw storageError;

    // B. Padam dari Database
    const { error: dbError } = await supabase
      .from("media_assets")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error("Ralat menghapus media:", error);
    throw error;
  }
}
