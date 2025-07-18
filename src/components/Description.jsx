// DescriptionEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useMemo } from "react";

export default function Description({onChange}) {
  const extensions = useMemo(
    () => [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: ";",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md p-4 mt-4 w-full max-w-2xl">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Link URL kiriting");
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="px-2 py-1 border rounded"
        >
          Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] w-full h-full outline-none"
        placeholder="Hisob haqida malumot"
      />
    </div>
  );
}