import { useEffect, useState } from 'react';
import api from "../../config/api";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmailGate } from '../../routes/APIGates';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const history = useNavigate();

  // Use location to get query parameters
  const location = useLocation();
  // Extract token from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Get the 'token' parameter
  
  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await api.get(`${verifyEmailGate}?token=${token}`);
          setMessage(response.data.message);
          setTimeout(() => history('/login'), 3000); // Redirect to login after 3 seconds
        } catch (error) {
          setMessage(error.response?.data?.message || "Something went wrong");
        }
      };
      
      verifyEmail();
    } else {
      setMessage("Token không hợp lệ.");
    }
  }, [token, history]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;