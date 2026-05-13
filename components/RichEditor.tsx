"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

export default function RichEditor({ value, onChange, error }: Props) {
  return (
    <div
      data-color-mode="dark"
      className={`rounded-xl overflow-hidden border ${error ? "border-red-500" : "border-purple-900/40"}`}
      style={{ "--color-canvas-default": "#0f0f1a" } as React.CSSProperties}
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? "")}
        height={450}
        preview="live"
        style={{
          background: "transparent",
          fontSize: "14px",
        }}
      />
    </div>
  );
}