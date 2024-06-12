import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import axios from "axios";

const useSignUp = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await axios.post('http://localhost:5555/api/auth/signup', values);

            if (res.status === 201) {
                console.log('Success');
                login(res.data.token, res.data.user);
            } else {
                setError(res.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useSignUp;
