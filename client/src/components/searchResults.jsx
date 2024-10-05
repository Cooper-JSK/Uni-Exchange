import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { searchContent} from "../api/apiService.js";
import SearchCard from '../components/SearchCard';

const SearchResults = () => {
    const [results, setResults] = useState({ questions: [], answers: [] });
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const searchResults = await searchContent(query); // Call the service function
                setResults(searchResults);
            } catch (error) {
                console.error('Failed to fetch search results', error);
            }
        };

        fetchResults();
    }, [location.search, query]);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-4xl p-5">
                <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
                {results.questions.length > 0 || results.answers.length > 0 ? (
                    <>
                        {results.questions.map((question) => (
                            <SearchCard
                                key={question._id}
                                title={question.title}
                                content={question.content}
                                tags={question.category}
                                author={question.author}
                            />
                        ))}
                        {results.answers.map((answer) => (
                            <SearchCard
                                key={answer._id}
                                title={answer.question.title}
                                content={answer.content}
                                tags={null}
                                author={answer.author}
                                isAnswer={true}
                                questionTitle={answer.question.title}
                            />
                        ))}
                    </>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
