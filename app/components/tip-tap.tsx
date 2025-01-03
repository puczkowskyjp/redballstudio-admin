import { EditorProvider, FloatingMenu, BubbleMenu, useEditor, EditorContent, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BoldIcon, ItalicIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Placeholder } from "@tiptap/extension-placeholder";
import { useFormContext } from 'react-hook-form';

export default function RichTextEditor({ content }: { content: string; }) {

  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Add a longer description for your products",
        emptyNodeClass:
          "first:before:text-gray-600 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      console.log("content", content);
      setValue("content", content, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: content,
  });

  return (
    <div className="flex flex-col gap-2 bg-gray-500">
      {editor &&
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "flex gap-2 border-gray-50 border items-center justify-center rounded-lg px-2 py-1",
              editor.isActive('bold') ? 'bg-white text-black' : ''
            )}>
            <BoldIcon className="w-4 h-4" />
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "flex gap-2 border-gray-50 border items-center justify-center rounded-lg px-2 py-1",
              editor.isActive('italic') ? 'bg-white text-black' : ''
            )}>
            <ItalicIcon className="w-4 h-4" />
            Italic
          </button>
        </div>
      }
      <EditorContent placeholder="heyy" editor={editor} />
    </div>
  );
}

function MenuBar() {
  const { editor } = useCurrentEditor();
  console.log("editor", editor);
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "flex gap-2 border-gray-50 border items-center justify-center rounded-lg px-2 py-1",
          editor.isActive('bold') ? 'bg-white text-black' : ''
        )}>
        <BoldIcon className="w-4 h-4" />
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "flex gap-2 border-gray-50 border items-center justify-center rounded-lg px-2 py-1",
          editor.isActive('italic') ? 'bg-white text-black' : ''
        )}>
        <ItalicIcon className="w-4 h-4" />
        Italic
      </button>
    </div>
  );
}

