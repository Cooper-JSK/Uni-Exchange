import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

const RenderJSON = ({ content }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content ? JSON.parse(content) : '',  // Parse the JSON content from the database
        editable: false,  // Make the editor read-only for viewing
    });

    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    if (!editor) {
        return <div>Loading content...</div>;
    }

    return <EditorContent editor={editor} className="prose prose-purple max-w-none" />;
};

export default RenderJSON;
