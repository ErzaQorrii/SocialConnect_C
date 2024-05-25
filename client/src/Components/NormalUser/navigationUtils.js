 import { useNavigate} from 'react-router-dom';
  
 export const useNavigation= () =>
    {
        const navigate = useNavigate();
    

    const goToHomePage = () =>
        {
            navigate('/home_user');
        }

        return{
            goToHomePage,
        };
    };


