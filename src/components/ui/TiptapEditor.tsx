"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

type TiptapEditorProps = {
  initialHTML?: string;
  onChange?: (html: string) => void;
};

export default function TiptapEditor({
  initialHTML,
  onChange,
}: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: initialHTML || "<p>Commence à écrire...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Si initialHTML change (ex: on ouvre un reply ou un forward), on resynchronise
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = initialHTML || "<p>Commence à écrire...</p>";
    if (current !== next) {
      // false = ne pas créer une nouvelle entrée d'historique (plus fluide)
      editor.commands.setContent(next, {});
    }
  }, [initialHTML, editor]);
  if (!mounted || !editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <Button
      variant={active ? "secondary" : "outline"}
      size="icon"
      onClick={onClick}
      className="h-9 w-9"
    >
      {children}
    </Button>
  );

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = prompt("Lien URL :");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = prompt("Image URL :");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Éditeur */}
      <EditorContent
        editor={editor}
        className="prose min-h-[200px] max-w-none"
      />
    </div>
  );
}
