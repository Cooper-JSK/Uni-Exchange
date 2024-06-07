import React, { useState, useEffect } from 'react';

const QAForm = ({ initialData, onSubmit, formType }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [category, setCategory] = useState(initialData?.category || '');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setCategory(initialData.category || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { title, content, category };
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            {formType === 'question' && (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                ></textarea>
            </div>
            {formType === 'question' && (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
            )}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default QAForm;
