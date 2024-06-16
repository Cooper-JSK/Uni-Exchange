import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SidebarLeft = ({ setFilterCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/questions/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => setFilterCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarLeft;
