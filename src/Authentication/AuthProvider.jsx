import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


const AuthContext=createContext()
export const useAuth=()=>(
    useContext(AuthContext)
)

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [Client, setClient] = useState({});
    const [isAuthorized,setAuthorized]=useState(false)
    const [isClientAuthorized,setClientAuthorized]=useState(false)
    const navigate = useNavigate();
    const [foodCategoriesClient,setFoodCategoriesClient]=useState([])
    const [foodItemsClient, setFoodItemsClient] = useState([
   
    ]);

    const login = (refresh,access) => {
        Cookies.set('adminAccess',access,{
            expires: 7, // 7 days
            secure: true, // Cookie should only be sent over HTTPS
            sameSite: 'strict' // Cookie should only be sent over HTTP or HTTPS, not mixed modes
          })
        Cookies.set('adminRefresh',refresh,{
            expires: 7, // 7 days
            secure: true, // Cookie should only be sent over HTTPS
            sameSite: 'strict' // Cookie should only be sent over HTTP or HTTPS, not mixed modes
          })
        setAuthorized(true)
        navigate('/Admin'); 
    };
    const loginClient = (refresh,access) => {
        Cookies.set('access',access,{
            expires: 7, // 7 days
            secure: true, // Cookie should only be sent over HTTPS
            sameSite: 'strict' // Cookie should only be sent over HTTP or HTTPS, not mixed modes
          })
        Cookies.set('refresh',refresh,{
            expires: 7, // 7 days
            secure: true, // Cookie should only be sent over HTTPS
            sameSite: 'strict' // Cookie should only be sent over HTTP or HTTPS, not mixed modes
          })
        setClientAuthorized(true)
    };
    
    const logout = () => {
        Cookies.remove('adminAccess')
        Cookies.remove('adminRefresh')
        setUser(null); 
        setAuthorized(false)
        navigate('/AdminLogin'); 
    };
    const logoutClient = () => {
        Cookies.remove('access')
        Cookies.remove('refresh')
        setClientAuthorized(false)
        setUser(null); 
    };

    
    useEffect(()=>{
        const userAccesToken=Cookies.get('access')
        if (userAccesToken){
            setClientAuthorized(true)
        }

    })

    return (
        <AuthContext.Provider value={{ user,logoutClient,loginClient,Client,setClient,setClientAuthorized,isClientAuthorized,foodItemsClient,setFoodItemsClient,foodCategoriesClient,setFoodCategoriesClient,setUser, login,isAuthorized, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

