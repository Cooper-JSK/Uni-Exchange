import { useState } from 'react';

const DashBoardSideBar = ({ setView }) => {
    const [activeItem, setActiveItem] = useState('questions');

    const handleClick = (view) => {
        setActiveItem(view);
        setView(view);
    };

    return (
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow flex md:flex-col space-x-4 md:space-x-0 space-y-0 md:space-y-4">
            <ul className="flex md:flex-col w-full">
                <li
                    className={`cursor-pointer ${activeItem === 'questions' ? 'text-blue-500 font-bold' : ''} flex-1 md:flex-none`}
                    onClick={() => handleClick('questions')}
                >
                    Questions
                </li>
                <li
                    className={`cursor-pointer ${activeItem === 'answers' ? 'text-blue-500 font-bold' : ''} flex-1 md:flex-none`}
                    onClick={() => handleClick('answers')}
                >
                    Answers
                </li>
            </ul>
        </div>
    );
};

export default DashBoardSideBar;
