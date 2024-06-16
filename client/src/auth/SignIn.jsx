import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import signInImage from '../assets/images/signin.svg';
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
            toast.success('Successfully signed in!');
            navigate('/');
        } else {
            toast.error('Failed to sign in.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
                <div className="md:w-1/2 hidden md:flex items-center justify-center p-4">
                    <img
                        src={signInImage}
                        alt="Sign In"
                        className="object-cover w-full h-full rounded-lg"
                    />
                </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-3xl font-bold mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
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
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                        <div className='flex justify-between mt-4'>
                            <p className="text-gray-700">Don't have an account?</p>
                            <button
                                type="button"
                                onClick={() => navigate('/sign-up')}
                                className="text-blue-500 hover:underline"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
