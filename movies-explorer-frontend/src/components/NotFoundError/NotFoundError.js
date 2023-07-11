import './NotFoundError.css';
import { useNavigate } from 'react-router-dom';

function NotFoundError(props) {

  const navigate = useNavigate();

  const handleOnClickNavigateBack = () => navigate(-1);

  return(
    <div className="error-not-found">
      <h1 className="error-not-found__title">404</h1>
      <h2 className="error-not-found__subtitle">Страница не найдена</h2>
      <button className="error-not-found__link button-hovered" onClick={handleOnClickNavigateBack}>Назад</button>
    </div>
  );
}

export default NotFoundError;