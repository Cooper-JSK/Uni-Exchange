import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast';

const FeatureRequestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feature: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                feature: formData.feature,
                description: formData.description
            };

            await emailjs.send(
                'service_22r7xjj', // Replace with your EmailJS service ID
                'template_k61cnvf', // Replace with your EmailJS template ID
                templateParams,
                'haZaHpmtq5Jmebmif' // Replace with your EmailJS user ID
            );

            toast.success('Feature request submitted successfully!');
            setFormData({
                name: '',
                email: '',
                feature: '',
                description: ''
            });
        } catch (error) {
            toast.error('Failed to submit feature request.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6">Feature Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
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
                        <label htmlFor="feature" className="block text-gray-700 font-bold mb-2">Feature</label>
                        <input
                            type="text"
                            id="feature"
                            name="feature"
                            value={formData.feature}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeatureRequestForm;
