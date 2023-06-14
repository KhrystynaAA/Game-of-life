import React, {useEffect, useState}  from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Autication () {
    const [auth, setAuth] = useState(false);
        const navigate = useNavigate();
        
        axios.defaults.withCredentials = true;
		useEffect(()=>{
			axios.get('http://localhost:8081/autication')
			.then(res => {
				if(res.data.Status === "Success"){
					setAuth(true);
                    navigate('/modeling');
				}else{
					setAuth(false);
                    navigate('/');
				}
			})
			.then(err => console.log(err));
		})
    return(
        <div >
            {
                auth ?
                <div>
                
                </div>
                :
                <div>
                </div>

            }
        </div>
       
    )
}

export default Autication