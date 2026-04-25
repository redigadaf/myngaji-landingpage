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

import { Label } from "@/components/ui/label";
import { MediaPickerModal } from "../media-library/MediaPickerModal";
import { EditorToolbar } from "./editor-field-sections/EditorToolbar";
import { ClearConfirmModal } from "./editor-field-sections/ClearConfirmModal";
import { EditorStyles } from "./editor-field-sections/EditorStyles";

const TextAlign = ((TextAlignModule as Record<string, unknown>)["TextAlign"] || (TextAlignModule as Record<string, unknown>)["default"]) as { configure: (options: Record<string, unknown>) => AnyExtension };

interface EditorFieldProps {
  label: string;
  placeholder?: string;
  minHeight?: string;
  value?: string;
  onChange?: (value: string) => void;
  onChangeJSON?: (json: Record<string, unknown>) => void;
  className?: string;
}

export function EditorField({ label, placeholder, value, onChange, onChangeJSON, className }: EditorFieldProps) {
  const [, setUpdateNonce] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"image" | "link">("image");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({
        inline: true,
        HTMLAttributes: { class: "editor-inline-image" },
      }),
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder })
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

  if (!editor) return null;

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] p-8 shadow-sm font-sans relative ${className || ""}`}>
      <EditorStyles />
      
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
          
          <EditorToolbar 
            editor={editor} 
            onOpenMediaPicker={(mode) => {
              setPickerMode(mode);
              setShowMediaPicker(true);
            }}
            onClearContent={() => setShowClearConfirm(true)}
          />

          <EditorContent editor={editor} className="min-h-[260px] cursor-text" />
        </div>
      </div>

      <ClearConfirmModal 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={() => {
          editor.commands.clearContent();
          setShowClearConfirm(false);
        }}
      />
    </div>
  );
}

