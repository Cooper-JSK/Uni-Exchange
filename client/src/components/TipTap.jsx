// src/components/TipTap.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEffect } from 'react';

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
];

const TipTap = ({ content, setContent }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content ? JSON.parse(content) : '',  // Parse the JSON content
        onUpdate: ({ editor }) => {
            // Update the content in the parent component's state in JSON format
            setContent(JSON.stringify(editor.getJSON()));
        },
    });

    // Ensure we clean up the editor on unmount
    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    const buttonClasses = (isActive) =>
        `px-3 py-1 rounded-md border border-gray-300 text-sm transition-colors ${
            isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;

    const disabledButtonClasses = 'opacity-50 cursor-not-allowed';

    return (
        <div className="border p-4 rounded-md shadow-md space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`${buttonClasses(editor.isActive('bold'))} ${
                        !editor.can().chain().focus().toggleBold().run() ? disabledButtonClasses : ''
                    }`}
                >
                    Bold
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`${buttonClasses(editor.isActive('italic'))} ${
                        !editor.can().chain().focus().toggleItalic().run() ? disabledButtonClasses : ''
                    }`}
                >
                    Italic
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`${buttonClasses(editor.isActive('strike'))} ${
                        !editor.can().chain().focus().toggleStrike().run() ? disabledButtonClasses : ''
                    }`}
                >
                    Strike
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`${buttonClasses(editor.isActive('code'))} ${
                        !editor.can().chain().focus().toggleCode().run() ? disabledButtonClasses : ''
                    }`}
                >
                    Code
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className={buttonClasses(false)}
                >
                    Clear marks
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className={buttonClasses(false)}
                >
                    Clear nodes
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={buttonClasses(editor.isActive('paragraph'))}
                >
                    Paragraph
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    type="button"  // Prevent form submission
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    className={buttonClasses(editor.isActive('heading', {level: 2}))}
                >
                    H2
                </button>
                {/* Repeat the same for other buttons */}
            </div>

            <EditorContent editor={editor} className="prose prose-purple max-w-none"/>
        </div>
    );
};

export default TipTap;
