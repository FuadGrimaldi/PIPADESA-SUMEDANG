"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import ReactQuill dinamically untuk menghindari SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="border w-full h-32 px-3 py-2 rounded bg-gray-50 animate-pulse">
      Loading editor...
    </div>
  ),
});

// Import styles
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  initialData?: string;
  onChange: (data: string) => void;
}

export default function RichTextEditor({
  initialData = "",
  onChange,
}: EditorProps) {
  const [data, setData] = useState(initialData);
  const [mounted, setMounted] = useState(false);

  // Pastikan component sudah mounted di client
  useEffect(() => {
    setMounted(true);
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  // Update data ketika initialData berubah (untuk edit mode)
  useEffect(() => {
    if (mounted) {
      setData(initialData);
    }
  }, [initialData, mounted]);

  const handleChange = (content: string) => {
    setData(content);
    onChange(content);
  };

  // Konfigurasi toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  if (!mounted) {
    return (
      <div className="border w-full h-32 px-3 py-2 rounded bg-gray-50 animate-pulse">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="quill-editor">
      <ReactQuill
        value={data}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Tulis konten artikel di sini..."
        style={{
          backgroundColor: "white",
          minHeight: "200px",
        }}
      />
    </div>
  );
}
