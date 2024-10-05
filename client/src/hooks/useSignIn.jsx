import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import{ signIn} from "../api/apiService.js";


const useSignIn = () => {
    const { login } = useAuth(); // Access login function from AuthContext
    const [error, setError] = useState(null); // To track and display error messages
    const [loading, setLoading] = useState(false); // To indicate if a request is in progress

    const signInUser = async (values) => {
        try {
            setError(null); // Reset any previous errors
            setLoading(true); // Set loading to true before the API request

            // Send sign-in request
            const res = await signIn(values);

            if (res.status === 200) {
                // On success, log in the user using the login function from AuthContext
                const success = login(res.data.token, res.data.user);
                return { success, user: res.data.user }; // Return success status and user data
            } else {
                // Handle unexpected status codes
                setError(res.data.message || 'Sign-in failed.');
                return { success: false };
            }
        } catch (error) {
            // Handle errors (like network issues or 400/500 responses)
            console.error(error);
            setError(error.response?.data?.message || 'Sign-in failed.');
            return { success: false };
        } finally {
            // Always reset loading status once the request is done
            setLoading(false);
        }
    };

    // Return the sign-in function, loading, and error states for use in components
    return { loading, error, signInUser };
};

export default useSignIn;
