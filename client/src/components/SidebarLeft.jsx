import { useState, useEffect } from 'react';
import { fetchCategories } from '@/api/apiService.js';

const SidebarLeft = ({ setFilterCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoryData = await fetchCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        getCategories();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => setFilterCategory(category)} // Update the filter when a category is clicked
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarLeft;
