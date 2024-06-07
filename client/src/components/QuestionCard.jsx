
import PropTypes from 'prop-types';

import React from 'react';

const QuestionCard = ({
    title = 'Default Title',
    content = 'Default Content',
    author = 'Default Author',
    category = 'Default Category',
}) => {
    return (
        <div className="p-7 my-3 border rounded shadow-md bg-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <p>{content}</p>
            <p>Author: {author}</p>
            <p>Category: {category}</p>
        </div>
    );
};


QuestionCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string
};

export default QuestionCard;
