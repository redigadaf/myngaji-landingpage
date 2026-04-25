/**
 * Blog Configuration
 * Centralized settings for the auto-healing and formatting logic
 */

export const BLOG_CONFIG = {
  // Keywords that trigger automatic demotion of H2 to H3 in the Table of Contents
  SUB_TOPIC_KEYWORDS: [
    "pembimbing",
    "psikologi",
    "perincian",
    "detail",
    "info",
    "saran",
    "catatan",
  ],

  // Keywords that identify a conclusion section
  CONCLUSION_KEYWORDS: [
    "kesimpulan",
    "penutup",
    "rumusan",
    "akhir kata",
  ],

  // Common sub-topic prefixes that shouldn't be numbered as main sections
  SUB_SECTION_PREFIXES: [
    "tips:",
    "nota:",
    "pembimbing:",
  ]
};
