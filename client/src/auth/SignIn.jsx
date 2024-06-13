import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpImage from '../assets/images/sign-up.svg';
import useSignIn from '../hooks/useSignIn';

const SignInPage = () => {
    const { error, loading, signInUser } = useSignIn();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signInUser(formData);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
                <div className="md:w-1/2 md:ml-4">
                    <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 pt-2">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 mb-4 md:mb-0 hidden md:block">
                    <img
                        src={signUpImage}
                        alt="Signup"
                        className="object-cover w-full h-full rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
