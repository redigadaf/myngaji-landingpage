import React from "react";
import { type Editor } from "@tiptap/react";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Type, Heading1, Heading2, Heading3, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Minus, Code, 
  Link as LinkIcon, Image as ImageIcon, Trash2, Table2, Merge, Split, Trash, Eraser,
  BetweenVerticalStart, BetweenVerticalEnd, BetweenHorizontalStart, BetweenHorizontalEnd,
  Highlighter, Subscript, Superscript
} from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";

interface EditorToolbarProps {
  editor: Editor;
  onOpenMediaPicker: (mode: "image" | "link") => void;
  onClearContent: () => void;
}

export function EditorToolbar({ editor, onOpenMediaPicker, onClearContent }: EditorToolbarProps) {
  return (
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
          icon={<Subscript className="h-5 w-5" />} 
          title="Subscript"
        />
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          active={editor.isActive("superscript")}
          icon={<Superscript className="h-5 w-5" />} 
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
              onOpenMediaPicker("link");
            }
          }}
          active={editor.isActive("link")}
          icon={<LinkIcon className="h-5 w-5" />} 
          title="Insert Link"
        />
        <ToolbarButton 
          onClick={() => onOpenMediaPicker("image")}
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
          onClick={onClearContent}
          icon={<Trash2 className="h-5 w-5" />}
          title="Clear Content"
        />
      </div>
    </div>
  );
}
