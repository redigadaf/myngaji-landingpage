"use client";

import { useState } from "react";
import { useEditor, EditorContent, type AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import * as TextAlignModule from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

const TextAlign = ((TextAlignModule as Record<string, unknown>)["TextAlign"] || (TextAlignModule as Record<string, unknown>)["default"]) as { configure: (options: Record<string, unknown>) => AnyExtension };
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Type, Heading1, Heading2, Heading3, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Minus, Code, Link as LinkIcon, Image as ImageIcon, Trash2,
  Undo, Redo, Highlighter, Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  PlusSquare, MinusSquare, LayoutGrid, Trash, Columns, 
  BetweenVerticalStart, BetweenVerticalEnd, BetweenHorizontalStart, BetweenHorizontalEnd, Merge, Split, Eraser, Table2
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { MediaPickerModal } from "../media-library/MediaPickerModal";


interface EditorFieldProps {
  label: string;
  placeholder?: string;
  minHeight?: string;
  value?: string;
  onChange?: (value: string) => void;
  onChangeJSON?: (json: Record<string, unknown>) => void;
  className?: string;
}

export function EditorField({ label, placeholder, minHeight = "min-h-[150px]", value, onChange, onChangeJSON, className }: EditorFieldProps) {
  const [, setUpdateNonce] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"image" | "link">("image");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "editor-inline-image",
        },
      }),
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder,
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
      if (onChangeJSON) onChangeJSON(editor.getJSON());
    },
    onSelectionUpdate: () => setUpdateNonce((curr) => curr + 1),
    editorProps: {
      attributes: {
        class: `focus:outline-none prose prose-sm dark:prose-invert max-w-none p-8 min-h-[150px] text-[16px] leading-relaxed font-sans cursor-text`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-8 shadow-sm font-sans relative ${className || ""}`}>
      <MediaPickerModal 
        isOpen={showMediaPicker}
        mode={pickerMode}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(media) => {
          if (pickerMode === "image") {
            editor.chain().focus().setImage({ src: media.url }).run();
          } else {
            editor.chain().focus().setLink({ href: media.url }).run();
          }
        }}
      />
      <div className="space-y-4">
        <Label className="text-[16px] font-semibold uppercase text-gray-500 tracking-[0.1em]">{label}</Label>
        
        <div className={`border rounded-[20px] overflow-hidden bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 ${
          editor.isFocused || !editor.isEmpty 
            ? "border-primary ring-4 ring-[#17838F]/50" 
            : "border-gray-100 dark:border-gray-800"
        } focus-within:ring-4 focus-within:ring-[#17838F]/50`}>
          {/* Toolbar */}
          <div className="px-3 py-2 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/10 space-y-2 sticky top-0 z-10 backdrop-blur-md">
            {/* First Row: Main Controls */}
            <div className="flex items-center flex-wrap gap-1">
              {/* Formatting */}
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
                icon={<Bold className="h-5 w-5" />} 
                title="Bold"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
                icon={<Italic className="h-5 w-5" />} 
                title="Italic"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive("underline")}
                icon={<UnderlineIcon className="h-5 w-5" />} 
                title="Underline"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
                icon={<Strikethrough className="h-5 w-5" />} 
                title="Strikethrough"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                active={editor.isActive("highlight")}
                icon={<Highlighter className="h-5 w-5" />} 
                title="Highlight"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                active={editor.isActive("subscript")}
                icon={<SubscriptIcon className="h-5 w-5" />} 
                title="Subscript"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                active={editor.isActive("superscript")}
                icon={<SuperscriptIcon className="h-5 w-5" />} 
                title="Superscript"
              />
              
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
              
              {/* Typography */}
              <ToolbarButton 
                onClick={() => editor.chain().focus().setParagraph().run()}
                active={editor.isActive("paragraph")}
                icon={<Type className="h-5 w-5" />} 
                title="Paragraph"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive("heading", { level: 1 })}
                icon={<Heading1 className="h-5 w-5" />} 
                title="Heading 1"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive("heading", { level: 2 })}
                icon={<Heading2 className="h-5 w-5" />} 
                title="Heading 2"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive("heading", { level: 3 })}
                icon={<Heading3 className="h-5 w-5" />} 
                title="Heading 3"
              />
              
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
              
              {/* Alignment */}
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                active={editor.isActive({ textAlign: "left" })}
                icon={<AlignLeft className="h-5 w-5" />} 
                title="Align Left"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                active={editor.isActive({ textAlign: "center" })}
                icon={<AlignCenter className="h-5 w-5" />} 
                title="Align Center"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                active={editor.isActive({ textAlign: "right" })}
                icon={<AlignRight className="h-5 w-5" />} 
                title="Align Right"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                active={editor.isActive({ textAlign: "justify" })}
                icon={<AlignJustify className="h-5 w-5" />} 
                title="Justify"
              />
              
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
              
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive("bulletList")}
                icon={<List className="h-5 w-5" />} 
                title="Bullet List"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive("orderedList")}
                icon={<ListOrdered className="h-5 w-5" />} 
                title="Ordered List"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive("blockquote")}
                icon={<Quote className="h-5 w-5" />} 
                title="Quote"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                icon={<Minus className="h-5 w-5" />} 
                title="Horizontal Rule"
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive("code")}
                icon={<Code className="h-5 w-5" />} 
                title="Code"
              />

              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />

              <ToolbarButton 
                onClick={() => {
                  const url = window.prompt("Masukkan URL Pautan luaran:\n(Atau biarkan KOSONG dan tekan OK untuk pilih fail dari Media Library)");
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  } else if (url === "") {
                    setPickerMode("link");
                    setShowMediaPicker(true);
                  }
                }}
                active={editor.isActive("link")}
                icon={<LinkIcon className="h-5 w-5" />} 
                title="Insert Link"
              />
              <ToolbarButton 
                onClick={() => {
                  setPickerMode("image");
                  setShowMediaPicker(true);
                }}
                icon={<ImageIcon className="h-5 w-5" />} 
                title="Media Library"
              />

              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />

              <ToolbarButton 
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                active={editor.isActive("table")}
                icon={<Table2 className="h-5 w-5" />} 
                title="Insert Table"
              />

              {editor.isActive("table") && (
                <>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    icon={<BetweenVerticalStart className="h-5 w-5" />} 
                    title="Add Column Before"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    icon={<BetweenVerticalEnd className="h-5 w-5" />} 
                    title="Add Column After"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    icon={<Eraser className="h-5 w-5 rotate-90" />} 
                    title="Delete Column"
                  />
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    icon={<BetweenHorizontalStart className="h-5 w-5" />} 
                    title="Add Row Above"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    icon={<BetweenHorizontalEnd className="h-5 w-5" />} 
                    title="Add Row Below"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    icon={<Eraser className="h-5 w-5" />} 
                    title="Delete Row"
                  />
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    icon={<Merge className="h-5 w-5" />} 
                    title="Merge Cells"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().splitCell().run()}
                    icon={<Split className="h-5 w-5" />} 
                    title="Split Cell"
                  />
                  <ToolbarButton 
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    icon={<Trash className="h-5 w-5" />} 
                    title="Delete Table"
                    className="text-red-400 hover:text-red-500"
                  />
                </>
              )}

              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />

              <ToolbarButton 
                onClick={() => setShowClearConfirm(true)}
                icon={<Trash2 className="h-5 w-5" />}
                title="Clear Content"
              />
            </div>
          </div>

          {/* Editor Area */}
          <EditorContent editor={editor} className="min-h-[260px] cursor-text" />
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror {
          min-height: inherit;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          clear: both;
        }
        /* Inline Image Styles - Force Overrides */
        .ProseMirror img {
          max-width: 250px !important;
          width: 250px !important;
          height: auto !important;
          border-radius: 12px !important;
          display: inline-block !important;
          float: left !important;
          margin: 0.5rem 1.5rem 0.5rem 0 !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        /* Table Styles */
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 2rem 0;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .ProseMirror td,
        .ProseMirror th {
          min-width: 1em;
          border: 1px solid #e2e8f0;
          padding: 12px 15px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
          color: #000000;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        .dark .ProseMirror table,
        .dark .ProseMirror td,
        .dark .ProseMirror th {
          border-color: #334155;
        }
        .dark .ProseMirror th {
          background-color: #1e293b;
          color: #ffffff;
        }
        .ProseMirror .selectedCell:after {
          z-index: 2;
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(23, 131, 143, 0.08);
          pointer-events: none;
        }
        .ProseMirror .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #17838F;
          pointer-events: none;
        }
      `}</style>
      {/* Confirm Clear Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-full text-red-500">
                <Trash2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kosongkan Kandungan?</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Semua teks dan media dalam editor ini akan dipadamkan secara kekal. Tindakan ini tidak boleh diundur.
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 pt-2">
                <button 
                  onClick={() => {
                    editor.commands.clearContent();
                    setShowClearConfirm(false);
                  }}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-500/20"
                >
                  Ya, Padam Semua
                </button>
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-2xl font-bold transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ icon, active = false, onClick, className, title }: { icon: React.ReactNode, active?: boolean, onClick: () => void, className?: string, title?: string }) {
  return (
    <button 
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 border border-transparent ${
        active 
          ? 'bg-primary text-white shadow-md scale-105 border-primary' 
          : 'text-gray-400 hover:bg-[#17838F]/10 hover:text-primary hover:border-[#17838F]/20'
      } ${className || ''}`}
    >
      {icon}
    </button>
  );
}
