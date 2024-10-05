
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Loading...</p>; // or a spinner/loading component
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
