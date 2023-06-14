import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
  
    const logout = () => {
      axios
      .get('http://localhost:8081/logout')
      .then((res) => {
        navigate('/autication');
      })
      .catch((err) => console.log(err));
      
    };
  
    return (
        <div className="center"><button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
      </div>
      
    );
  }

  export default LogoutButton;
