import { useLocation, useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <div>
            <h1>Pagina niet gevonden</h1>
            <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
            <button className='py-2 px-2.5 rounded-md text-blue-600 
      border border-blue-600 mt-4' onClick={handleGoHome}>Go home!</button>
        </div>
    );
};

export default NotFound;