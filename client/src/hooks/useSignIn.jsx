import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import axios from "axios";

const useSignIn = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signInUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await axios.post('http://localhost:5555/api/auth/signin', values);

            if (res.status === 200) {
                console.log('Success');
                const success = login(res.data.token, res.data.user);
                return success;
            } else {
                setError(res.data.message || 'Signup failed');
                return false;
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, signInUser };
};

export default useSignIn;
