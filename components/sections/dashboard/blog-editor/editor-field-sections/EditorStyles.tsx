import React from "react";

export function EditorStyles() {
  return (
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
  );
}
