import React, { useState } from 'react';

const DashSidebar = ({ setView }) => {
    const [activeItem, setActiveItem] = useState('questions');

    const handleClick = (view) => {
        setActiveItem(view);
        setView(view);
    };

    return (
        <div className="w-1/4 bg-white p-4 rounded-lg shadow">
            <ul className="space-y-4">
                <li
                    className={`cursor-pointer ${activeItem === 'questions' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleClick('questions')}
                >
                    Questions
                </li>
                <li
                    className={`cursor-pointer ${activeItem === 'answers' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleClick('answers')}
                >
                    Answers
                </li>
            </ul>
        </div>
    );
};

export default DashSidebar;
