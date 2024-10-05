// src/api/apiService.js
import axios from 'axios';

// Create an axios instance with the base URL and other configurations
const apiClient = axios.create({
    baseURL: 'https://uni-exchange.onrender.com', // Your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    // Add other configurations if needed (like timeout, interceptors, etc.)
});

//Upvote api call
export const upvoteAnswer = async (answerId, token) => {
    try {
        const response = await apiClient.post(
            `/api/answer/${answerId}/upvote`,
            {},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    }catch(error) {
        throw error.response?.data?.message || 'Failed to upvote. Please try again.'
    }
}

export const downvoteAnswer = async (answerId, token) => {
    try {
        const response = await apiClient.post(
            `/api/answer/${answerId}/downvote`,
            {},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    }catch(error) {
        throw error.response?.data?.message || 'Failed to downvote. Please try again.'
    }
}

// Fetch questions by user ID
export const fetchUserQuestions = async (userId, token) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/questions`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch questions.';
    }
};

// Fetch answers by user ID
export const fetchUserAnswers = async (userId, token) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/answers`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch answers.';
    }
};

// Delete a question
export const deleteQuestion = async (questionId, token) => {
    try {
        const response = await apiClient.delete(`/api/questions/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete question.';
    }
};

// Delete an answer
export const deleteAnswer = async (answerId, token) => {
    try {
        const response = await apiClient.delete(`/api/answer/${answerId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete answer.';
    }
};

// Fetch all questions
export const fetchQuestions = async () => {
    try {
        const response = await apiClient.get('/api/questions');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch questions.';
    }
};

// Search with query string
export const searchContent = async (query) => {
    try {
        const response = await apiClient.get(`/api/search?query=${query}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch search results.';
    }
};

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/api/questions/categories');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch categories.';
    }
};

// Fetch stats for questions, answers, and users
export const fetchStats = async () => {
    try {
        const [questionsResponse, answersResponse, usersResponse] = await Promise.all([
            apiClient.get('/api/questions/count'),
            apiClient.get('/api/answer/count'),
            apiClient.get('/api/user/count')
        ]);

        return {
            questions: questionsResponse.data.count,
            answers: answersResponse.data.count,
            users: usersResponse.data.count
        };
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch stats.';
    }
};

// Function to update the user profile
export const updateProfile = async (id, updateData, token) => {
    try {
        const response = await apiClient.patch(`/api/user/${id}`, updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update profile.';
    }
};

// Sign in API function
export const signIn = async (credentials) => {
    try {
        const response = await apiClient.post('/api/auth/signin', credentials);
        console.log(response)
        return response // Returns { token, user }
    } catch (error) {
        throw error.response?.data || { message: 'Sign-in failed.' };
    }
};

// Sign up API function
export const signUp = async (userData) => {
    try {
        const response = await apiClient.post('/api/auth/signup', userData);
        return response; // Returns { token, user }
    } catch (error) {
        throw error.response?.data || { message: 'Signup failed.' };
    }
};

// Function to post a question
export const postQuestion = async (questionData) => {
    try {
        const response = await apiClient.post('/api/questions', questionData);
        return response; // Returns the created question data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to submit question.' };
    }
};

// Function to get questions by user ID
export const getUserQuestions = async (userId) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/questions`);
        return response; // Returns the list of questions
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch questions.' };
    }
};

// Function to get answers by user ID
export const getUserAnswers = async (userId) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/answers`);
        return response; // Returns the list of answers
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch answers.' };
    }
};

// Function to get an answer by ID
export const getAnswerById = async (answerId, token) => {
    try {
        const response = await apiClient.get(`/api/answer/${answerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Returns the answer data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch answer.' };
    }
};

// Function to update an answer by ID
export const updateAnswer = async (answerId, content, token) => {
    try {
        const response = await apiClient.patch(`/api/answer/${answerId}`, { content }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Returns the updated answer data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update answer.' };
    }
};

export const getQuestionById = async (questionId, token) => {
    try {
        const response = await apiClient.get(`/api/questions/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.question; // Returns the question data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch question.' };
    }
};

// Function to update a question by ID
export const updateQuestion = async (questionId, data, token) => {
    try {
        const response = await apiClient.patch(`/api/questions/${questionId}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Returns the updated question data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update question.' };
    }
};

// Function to submit an answer
export const submitAnswer = async (data, token) => {
    try {
        const response = await apiClient.post('/api/answer', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Returns the submitted answer data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to submit answer.' };
    }
};


// Function to fetch user profile data
export const fetchUserProfile = async (userId) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}`);
        return response.data; // Returns the profile data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch user profile.' };
    }
};

// Function to fetch recent questions of a user
export const fetchUserRecentQuestions = async (userId) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/questions`);
        return response.data; // Returns the recent questions
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch recent questions.' };
    }
};

// Function to fetch recent answers of a user
export const fetchUserRecentAnswers = async (userId) => {
    try {
        const response = await apiClient.get(`/api/user/${userId}/answers`);
        return response.data; // Returns the recent answers
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch recent answers.' };
    }
};

// Function to delete a user profile
export const deleteUserProfile = async (userId, deleteContent, token) => {
    try {
        await apiClient.delete(`/api/user/${userId}`, {
            data: { deleteContent },
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete profile.' };
    }
};

// Function to fetch a question by ID and its answers
export const fetchQuestionAndAnswers = async (questionId) => {
    try {
        const response = await apiClient.get(`/api/questions/${questionId}`);
        return response.data; // Return the data directly
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch question and answers.' };
    }
};