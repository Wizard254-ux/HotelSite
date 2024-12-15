import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const { isAuthorized } = useAuth();
   console.log(isAuthorized)
   const token = Cookies.get('adminAccess');
   if(!token){
       if (!isAuthorized) {
           return <Navigate to="/AdminLogin" replace />;
       }
   }
   

    return children;
};

export default ProtectedRoute;
