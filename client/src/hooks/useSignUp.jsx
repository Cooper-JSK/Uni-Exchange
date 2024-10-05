import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { signUp} from "@/api/apiService.js";


const useSignUp = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await signUp(values);

            if (res.status === 201) {
                console.log('Success');
                login(res.data.token, res.data.user);
                return true;
            } else {
                setError(res.data.message || 'Signup failed');
                return false;
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Signup failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useSignUp;
