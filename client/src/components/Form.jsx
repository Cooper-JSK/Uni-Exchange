// src/components/Form.jsx
import { useState } from 'react';
import TipTap from './TipTap.jsx';

const QAForm = ({ onSubmit, formType }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // For rich text content
    const [categories, setCategories] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            content,  // Content now contains the rich text HTML
            categories,
        };
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Enter the title of your question"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                {/* TipTap to handle content */}
                <TipTap content={content} setContent={setContent} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
                <input
                    type="text"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="e.g., JavaScript, React"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                {formType === 'question' ? 'Submit Question' : 'Submit Answer'}
            </button>
        </form>
    );
};

export default QAForm;
